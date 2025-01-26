<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import debounce from 'lodash/debounce';
import AdminHeader from '@/components/Blocks/AdminHeader.vue';
import AdminSidebar from '@/components/Blocks/AdminSidebar.vue';
import AddSectionForm from '@/components/Modals/AddSectionForm.vue';
import StudentDetails from '@/components/Modals/StudentDetails.vue';
import { section } from '~/data/section.js';
import { student } from '~/data/student.js';
import { TooltipProvider } from "radix-vue";

const router = useRouter();
const route = useRoute();

const searchQuery = ref('');
const debouncedQuery = ref('');
const selectedSearch = ref('');
const showAddSectionForm = ref(false);
const sections = ref(section);
const students = ref(student);
const sortBy = ref('');
const selectedStudent = ref(null);

const academicYear = ref('2024-2025');

watch(searchQuery, debounce((newQuery) => {
  debouncedQuery.value = newQuery;
}, 300));

const addNewSection = (newSection: any) => {
  sections.value.push({
    id: sections.value.length + 1, // assuming id is sequential
    sectionName: newSection.sectionName,
    sectionLevel: newSection.sectionLevel,
    adviserId: newSection.adviserId
  });
};

const getSectionByStudentId = (studentId: string) => {
  for (const sec of sections.value) {
    if (sec.sectionStudents.includes(studentId)) {
      return sec;
    }
  }
  return null;
};

const navigateToPage = (section: any) => {
  if (section.adviserId) {
    router.push({
      path: `/admin/section/${section.id}`
    });
  } else {
    router.push({ name: 'admin-accounts', query: { accountType: 'inactive', sectionId: section.id } });
  }
};

const viewStudentProfile = (studentId: string) => {
  const studentData = students.value.find(s => s.studentId === studentId);
  if (studentData) {
    selectedStudent.value = studentData;
  }
};

const filteredSections = computed(() => {
  let filtered = sections.value.filter((section) => {
    if (!debouncedQuery.value) return section.sectionSchoolYear === academicYear.value; // Show all if query is empty
    return (
      section.sectionName.toLowerCase().includes(debouncedQuery.value.toLowerCase()) ||
      String(section.sectionLevel).includes(debouncedQuery.value) ||
      (section.adviserId && section.adviserId.toLowerCase().includes(debouncedQuery.value.toLowerCase()))
    );
  });
  if (selectedSearch.value === 'section') {
    if (sortBy.value === 'sNameSort') {
      filtered.sort((a, b) => a.sectionName.localeCompare(b.sectionName));
    } else if (sortBy.value === 'sGradeSort') {
      filtered.sort((a, b) => a.sectionLevel - b.sectionLevel);
    } else if (sortBy.value === 'recentlyAddedSort') {
      filtered.sort((a, b) => b.id - a.id); // TODO: Change to date added if naa na nga attribute
    }
  }

  return filtered;
});

const filteredStudents = computed(() => {
  let filtered = students.value.filter((student) => {
    if (!debouncedQuery.value) return student.isEnrolled === true; // Show all if query is empty
    return (
      student.studentId.toLowerCase().includes(debouncedQuery.value.toLowerCase()) ||
      student.lastName.toLowerCase().includes(debouncedQuery.value.toLowerCase()) ||
      student.firstName.toLowerCase().includes(debouncedQuery.value.toLowerCase())
    );
  });

  if (selectedSearch.value === 'student') {
    if (sortBy.value === 'surnameSort') {
      filtered.sort((a, b) => a.lastName.localeCompare(b.lastName));
    } else if (sortBy.value === 'gradeLvlSort') {
      filtered.sort((a, b) => {
        const sectionA = getSectionByStudentId(a.studentId);
        const sectionB = getSectionByStudentId(b.studentId);
        return (sectionA ? sectionA.sectionLevel : 0) - (sectionB ? sectionB.sectionLevel : 0);
      });
    }
  }

  return filtered.map(student => {
    const section = getSectionByStudentId(student.studentId);
    return {
      ...student,
      sectionName: section ? section.sectionName : '---',
      sectionLevel: section ? section.sectionLevel : '---'
    };
  });
});

onMounted(() => {
  const searchType = route.query.searchType as string;
  if (searchType) {
    selectedSearch.value = searchType;
  }
});
</script>

<template>
  <TooltipProvider>
    <div class="flex h-screen bg-[#FFFEF1]">
      <AdminSidebar />
      <div class="general flex-grow">
        <AdminHeader />
        <div class="p-8 pt-0 general min-h-screen max-h-screen flex flex-col w-full">
          <div class="flex justify-start items-center mb-6 max-w-auto">
            <div class="flex ml-7 items-center w-[90%]">
              <input type="text" placeholder="Search student or section by name, ID, or adviser"
                class="w-full px-4 py-2 h-[40px] border border-gray-300 rounded-l-md focus:outline-none mr-3"
                v-model="searchQuery" />
              <select
                class="px-4 py-2 border border-gray-300 rounded-md bg-gray-10 text-gray-700 inline-flex whitespace-nowrap font-medium hover:bg-gray-15 focus:outline-none"
                v-model="selectedSearch">
                <option value="" disabled>Select search category</option>
                <option value="student">Student</option>
                <option value="section">Section</option>
              </select>
              <select v-if="selectedSearch === 'section'"
                class="px-4 py-2 border border-gray-300 rounded-md bg-gray-10 text-gray-700 inline-flex whitespace-nowrap font-medium hover:bg-gray-15 focus:outline-none ml-3"
                v-model="sortBy">
                <option value="" disabled>Sort by</option>
                <option value="sNameSort">Section Name</option>
                <option value="sGradeSort">Grade Level</option>
                <option value="recentlyAddedSort">Recently Added</option>
              </select>
              <select v-if="selectedSearch === 'student'"
                class="px-4 py-2 border border-gray-300 rounded-md bg-gray-10 text-gray-700 inline-flex whitespace-nowrap font-medium hover:bg-gray-15 focus:outline-none ml-3"
                v-model="sortBy">
                <option value="" disabled>Sort by</option>
                <option value="surnameSort">Surname</option>
                <option value="gradeLvlSort">Grade Level</option>
              </select>
              <button v-if="selectedSearch === 'section'" @click="showAddSectionForm = true"
                class="inline-flex items-center ml-3 h-[40px] px-4 bg-[#728B78] text-white text-sm font-medium rounded-md hover:bg-[#536757] border-none hover:text-white transition-colors duration-200 whitespace-nowrap"
                style="font-size: 0.875rem;">
                Add New Section
              </button>
            </div>
          </div>
  
          <div v-if="!selectedSearch" class="text-gray-500 text-center text-xl font-regular">
            Please select a search category to view results.
          </div>
  
          <div v-else class="flex justify-center w-full">
            <div class="rounded-lg w-full max-w-5xl">
              <div class="overflow-y-auto max-h-[80vh]">
                <table class="min-w-full text-left">
                  <thead class="bg-head text-white sticky top-0">
                    <tr v-if="selectedSearch === 'section'">
                      <th class="px-6 py-3 text-left text-sm font-medium uppercase">Section-ID</th>
                      <th class="px-6 py-3 text-left text-sm font-medium uppercase">Section Name</th>
                      <th class="px-6 py-3 text-left text-sm font-medium uppercase">Grade Level</th>
                      <th class="px-6 py-3 text-left text-sm font-medium uppercase">Adviser</th>
                      <th class="px-6 py-3 text-left text-sm font-medium uppercase">Action</th>
                    </tr>
                    <tr v-else-if="selectedSearch === 'student'">
                      <th class="px-6 py-3 text-left text-sm font-medium uppercase">Student-ID</th>
                      <th class="px-6 py-3 text-left text-sm font-medium uppercase">Student Name</th>
                      <th class="px-6 py-3 text-left text-sm font-medium uppercase">Section and Grade Level</th>
                      <th class="px-6 py-3 text-left text-sm font-medium uppercase">Action</th>
                    </tr>
                  </thead>
  
                  <tbody class="text-gray-700">
                    <template v-if="selectedSearch === 'section'">
                      <tr v-for="section in filteredSections" :key="section.id" class="border-b bg-transparent">
                        <td class="px-6 py-4">{{ section.id }}</td>
                        <td class="px-6 py-4">{{ section.sectionName }}</td>
                        <td class="px-6 py-4">Grade {{ section.sectionLevel }}</td>
                        <td class="px-6 py-4">
                          <span v-if="section.adviserId">{{ section.adviserId }}</span>
                          <span v-else class="text-gray-500">----</span>
                        </td>
                        <td class="px-6 py-4">
                          <button @click="navigateToPage(section)"
                            :class="section.adviserId ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'"
                            class="px-4 py-2 rounded-md hover:opacity-80 transition-opacity duration-200 text-sm">
                            {{ section.adviserId ? 'View Details' : 'Add Adviser' }}
                          </button>
                        </td>
                      </tr>
                    </template>
                    <template v-else-if="selectedSearch === 'student'">
                      <tr v-for="student in filteredStudents" :key="student.studentId" class="border-b bg-transparent">
                        <td class="px-6 py-4">{{ student.studentId }}</td>
                        <td class="px-6 py-4">{{ student.lastName + ', ' + student.firstName }}</td>
                        <td class="px-6 py-4">{{ 'Grade ' + student.sectionLevel + ' - ' + student.sectionName }}</td>
                        <td class="px-6 py-4">
                          <button
                            @click="viewStudentProfile(student.studentId)"
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
      <AddSectionForm v-if="showAddSectionForm" @close="showAddSectionForm = false" @add-section="addNewSection" />
      <StudentDetails 
          v-if="selectedStudent"
          :show="!!selectedStudent"
          :studentData="selectedStudent"
          @close="selectedStudent = null"
      />
    </div>
  </TooltipProvider>
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