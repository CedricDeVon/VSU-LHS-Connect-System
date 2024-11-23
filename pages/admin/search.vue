<script setup lang="ts">
definePageMeta({
  middleware: ['authenticate-and-authorize-admin']
});

import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AddSectionForm from '~/components/Modals/AddSectionForm.vue';
import debounce from 'lodash/debounce';
import { useAdminViewStore } from '~/stores/views/adminViewStore';
import StudentDetailsModal from '~/components/Modals/StudentDetailsModal.vue';

const adminViewStore = useAdminViewStore();
await adminViewStore.updateSearch();

onBeforeMount(async () => {
})


const addNewSection = async (newSection: any) => {
  const result = await $fetch('/api/section/create', {
    method: 'POST',
    body: {
      id: newSection.secitionId,
      name: newSection.sectionName,
      level: newSection.sectionLevel
    }
  });
  await adminViewStore.updateSearch();
}

const getSectionByStudentId = (id: any) => {
  for (const section of adminViewStore.searchSections) {
    if (section.id === id) {
      return section;
    }
  }
  return null;
}

const getAdviserBySectionId = (id: any) => {
  for (const adviser of adminViewStore.accountsAdvisers) {
    if (adviser.id === id) {
      return adviser;
    }
  }
  return null;
}

const filteredSections = () => {
  let filtered = adminViewStore.searchSections.filter((section: any) => {
    if (!adminViewStore.searchDebouncedQuery) return true; // Show all if query is empty
    return (
      section.data.name.toLowerCase().includes(adminViewStore.searchDebouncedQuery.toLowerCase()) ||
      String(section.data.level).includes(adminViewStore.searchDebouncedQuery) ||
      (section.data.adviser && section.data.adviser.data.facultyId.toLowerCase().includes(adminViewStore.searchDebouncedQuery.toLowerCase()))
    );
  });
  if (adminViewStore.searchSelectedSearch === 'section') {
    if (adminViewStore.searchSortBy === 'sNameSort') {
      filtered.sort((a: any, b: any) => a.data.name.localeCompare(b.data.name));
    } else if (adminViewStore.searchSortBy === 'sGradeSort') {
      filtered.sort((a: any, b: any) => a.data.level - b.data.level);
    } else if (adminViewStore.searchSortBy === 'recentlyAddedSort') {
      filtered.sort((a: any, b: any) => b.data.id - a.data.id); // TODO: Change to date added if naa na nga attribute
    }
  }

  return filtered;
}

const filteredStudents = () => {
  let filtered = adminViewStore.searchStudents.filter((student: any) => {
    if (!adminViewStore.searchDebouncedQuery) return true;
    return (
      student.id.toLowerCase().includes(adminViewStore.searchDebouncedQuery.toLowerCase()) ||
      student.data.lastName.toLowerCase().includes(adminViewStore.searchDebouncedQuery.toLowerCase()) ||
      student.data.firstName.toLowerCase().includes(adminViewStore.searchDebouncedQuery.toLowerCase())
    );
  });

  if (adminViewStore.searchSelectedSearch === 'student') {
    if (adminViewStore.searchSortBy === 'surnameSort') {
      filtered.sort((a: any, b: any) => a.data.lastName.localeCompare(b.data.lastName));
    } else if (adminViewStore.searchSortBy === 'gradeLvlSort') {
      filtered.sort((a: any, b: any) => {
        const sectionA: any = getSectionByStudentId(a.id);
        const sectionB: any = getSectionByStudentId(b.id);
        return (sectionA ? sectionA.data.level : 0) - (sectionB ? sectionB.data.level : 0);
      });
    }
  }
  return filtered.map((student: any) => {
    const section: any = getSectionByStudentId(student.id);
    return {
      ...student,
      name: section ? section.data.name : '---',
      level: section ? section.data.level : '---'
    };
  });
}

const viewStudentProfile = (studentId: any) => {
  let student = adminViewStore.searchStudents.find((student: any) => {
    return student.id === studentId;
  });

  adminViewStore.searchSelectedStudent = student;
  adminViewStore.searchShowStudentDetailsModal = true;
  console.log(adminViewStore.searchSelectedStudent)
}

</script>

<template>
  <div class="flex h-screen">
    <AdminSidebar />
    <div class="general flex-grow">
      <AdminHeader />
      <div class="p-8 pt-0 general min-h-screen max-h-screen flex flex-col w-full">
        <div class="flex justify-start items-center mb-6 max-w-auto">
          <div class="flex ml-7 items-center w-[90%]">
            <input type="text" placeholder="Search student or section by name, ID, or adviser"
              class="w-full px-4 py-2 h-[40px] border border-gray-300 rounded-l-md focus:outline-none mr-3"
              v-model="adminViewStore.searchQuery" />
            <select
              class="px-4 py-2 border border-gray-300 rounded-md bg-gray-10 text-gray-700 inline-flex whitespace-nowrap font-medium hover:bg-gray-15 focus:outline-none"
              v-model="adminViewStore.searchSelectedSearch">
              <option value="" disabled>Select search category</option>
              <option value="student">Student</option>
              <option value="section">Section</option>
            </select>
            <select v-if="adminViewStore.searchSelectedSearch === 'section'"
              class="px-4 py-2 border border-gray-300 rounded-md bg-gray-10 text-gray-700 inline-flex whitespace-nowrap font-medium hover:bg-gray-15 focus:outline-none ml-3"
              v-model="adminViewStore.searchSortBy">
              <option value="" disabled>Sort by</option>
              <option value="sNameSort">Section Name</option>
              <option value="sGradeSort">Grade Level</option>
              <option value="recentlyAddedSort">Recently Added</option>
            </select>
            <select v-if="adminViewStore.searchSelectedSearch === 'student'"
              class="px-4 py-2 border border-gray-300 rounded-md bg-gray-10 text-gray-700 inline-flex whitespace-nowrap font-medium hover:bg-gray-15 focus:outline-none ml-3"
              v-model="adminViewStore.searchSortBy">
              <option value="" disabled>Sort by</option>
              <option value="surnameSort">Surname</option>
              <option value="gradeLvlSort">Grade Level</option>
            </select>
            <button v-if="adminViewStore.searchSelectedSearch === 'section'" @click="adminViewStore.searchShowAddSectionForm = true"
              class="inline-flex items-center ml-3 h-[40px] px-4 bg-[#728B78] text-white text-sm font-medium rounded-md hover:bg-[#536757] border-none hover:text-white transition-colors duration-200 whitespace-nowrap"
              style="font-size: 0.875rem;">
              Add New Section
            </button>
          </div>
        </div>

        <div v-if="!adminViewStore.searchSelectedSearch" class="text-gray-500 text-center text-xl font-regular">
          Please select a search category to view results.
        </div>

        <div v-else class="flex justify-center w-full">
          <div class="rounded-lg w-full max-w-5xl">
            <div class="overflow-y-auto max-h-[80vh]">
              <table class="min-w-full text-left">
                <thead class="bg-head text-white sticky top-0">
                  <tr v-if="adminViewStore.searchSelectedSearch === 'section'">
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Section-ID</th>
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Section Name</th>
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Grade Level</th>
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Adviser</th>
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Action</th>
                  </tr>
                  <tr v-else-if="adminViewStore.searchSelectedSearch === 'student'">
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Student-ID</th>
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Student Name</th>
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Section and Grade Level</th>
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Action</th>
                  </tr>
                </thead>

                <tbody class="text-gray-700">
                  <template v-if="adminViewStore.searchSelectedSearch === 'section'">
                    <tr v-for="section in filteredSections()" :key="section.id" class="border-b bg-transparent">
                      <td class="px-6 py-4">{{ section.id }}</td>
                      <td class="px-6 py-4">{{ section.data.name }}</td>
                      <td class="px-6 py-4">Grade {{ section.data.level }}</td>
                      <td class="px-6 py-4">
                        <span v-if="section.data.adviser">{{ section.data.adviser.data.facultyId }}</span>
                        <span v-else class="text-gray-500">N/A</span>
                      </td>
                      <td class="px-6 py-4">
                        <button
                          :class="section.data.adviser ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'"
                          class="px-4 py-2 rounded-md hover:opacity-80 transition-opacity duration-200 text-sm">
                          {{ section.data.adviser ? 'View Details' : 'Add Adviser' }}
                        </button>
                      </td>
                    </tr>
                  </template>
                  <template v-else-if="adminViewStore.searchSelectedSearch === 'student'">
                    <tr v-for="student in filteredStudents()" :key="student.id" class="border-b bg-transparent">
                      <td class="px-6 py-4">{{ student.id }}</td>
                      <td class="px-6 py-4">{{ adminViewStore.getFullName(student) }}</td>
                      <td class="px-6 py-4">{{ adminViewStore.studentGetGradeAndSection(student) }}</td>
                      <td class="px-6 py-4">
                        <button
                          @click="viewStudentProfile(student.id)"
                          class="bg-green-200 text-green-800 px-4 py-2 rounded-md hover:opacity-80 transition-opacity duration-200 text-sm">
                          View Profile
                        </button>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddSectionForm v-if="adminViewStore.searchShowAddSectionForm" @close="adminViewStore.searchShowAddSectionForm = false" @add-section="addNewSection" />
    <StudentDetailsModal 
        v-if="adminViewStore.searchShowStudentDetailsModal"
        :studentData="adminViewStore.searchSelectedStudent"
        @close="adminViewStore.searchSelectedStudent = null"
    />
  </div>
</template>

<style scoped>
thead th {
  position: sticky;
  top: 0;
  background-color: #728B78;
  z-index: 1;
  white-space: nowrap;
}

tbody td {
  white-space: nowrap;
}
</style>
