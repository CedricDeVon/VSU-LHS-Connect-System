<script setup lang="ts">
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AddSectionForm from '~/components/Modals/AddSectionForm.vue';
import debounce from 'lodash/debounce';

const store = adminStore();
await store.updateSearch();

const addNewSection = async (newSection: any) => {
  await $fetch('/api/section', {
    method: 'POST',
    body: {
      name: newSection.sectionName,
      level: newSection.sectionLevel
    }
  });
  await store.updateSearch();
}

const getSectionByStudentId = (id: any) => {
  for (const sec of store.searchSections) {
    if (sec.sectionStudents.includes(id)) {
      return sec;
    }
  }
  return null;
}

const getAdviserBySectionId = (id: any) => {
  for (const adviser of store.accountsAdvisers) {
    if (adviser.id === id) {
      return adviser;
    }
  }
  return null;
}

const filteredSections = () => {
  let filtered = store.searchSections.filter((section: any) => {
    if (!store.searchDebouncedQuery) return true; // Show all if query is empty
    return (
      section.data.name.toLowerCase().includes(store.searchDebouncedQuery.toLowerCase()) ||
      String(section.data.level).includes(store.searchDebouncedQuery) ||
      (section.data.adviser && section.data.adviser.data.facultyId.toLowerCase().includes(store.searchDebouncedQuery.toLowerCase()))
    );
  });
  if (store.searchSelectedSearch === 'section') {
    if (store.searchSortBy === 'sNameSort') {
      filtered.sort((a: any, b: any) => a.data.name.localeCompare(b.data.name));
    } else if (store.searchSortBy === 'sGradeSort') {
      filtered.sort((a: any, b: any) => a.data.level - b.data.level);
    } else if (store.searchSortBy === 'recentlyAddedSort') {
      filtered.sort((a: any, b: any) => b.data.id - a.data.id); // TODO: Change to date added if naa na nga attribute
    }
  }

  return filtered;
}

const filteredStudents = () => {
  let filtered = store.searchStudents.filter((student: any) => {
    if (!store.searchDebouncedQuery) return true;
    return (
      student.id.toLowerCase().includes(store.searchDebouncedQuery.toLowerCase()) ||
      student.data.lastName.toLowerCase().includes(store.searchDebouncedQuery.toLowerCase()) ||
      student.data.firstName.toLowerCase().includes(store.searchDebouncedQuery.toLowerCase())
    );
  });

  if (store.searchSelectedSearch === 'student') {
    if (store.searchSortBy === 'surnameSort') {
      filtered.sort((a: any, b: any) => a.data.lastName.localeCompare(b.data.lastName));
    } else if (store.searchSortBy === 'gradeLvlSort') {
      filtered.sort((a: any, b: any) => {
        const sectionA: any = getSectionByStudentId(a.data.studentId);
        const sectionB: any = getSectionByStudentId(b.data.studentId);
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
              v-model="store.searchQuery" />
            <select
              class="px-4 py-2 border border-gray-300 rounded-md bg-gray-10 text-gray-700 inline-flex whitespace-nowrap font-medium hover:bg-gray-15 focus:outline-none"
              v-model="store.searchSelectedSearch">
              <option value="" disabled>Select search category</option>
              <option value="student">Student</option>
              <option value="section">Section</option>
            </select>
            <select v-if="store.searchSelectedSearch === 'section'"
              class="px-4 py-2 border border-gray-300 rounded-md bg-gray-10 text-gray-700 inline-flex whitespace-nowrap font-medium hover:bg-gray-15 focus:outline-none ml-3"
              v-model="store.searchSortBy">
              <option value="" disabled>Sort by</option>
              <option value="sNameSort">Section Name</option>
              <option value="sGradeSort">Grade Level</option>
              <option value="recentlyAddedSort">Recently Added</option>
            </select>
            <select v-if="store.searchSelectedSearch === 'student'"
              class="px-4 py-2 border border-gray-300 rounded-md bg-gray-10 text-gray-700 inline-flex whitespace-nowrap font-medium hover:bg-gray-15 focus:outline-none ml-3"
              v-model="store.searchSortBy">
              <option value="" disabled>Sort by</option>
              <option value="surnameSort">Surname</option>
              <option value="gradeLvlSort">Grade Level</option>
            </select>
            <button v-if="store.searchSelectedSearch === 'section'" @click="store.searchShowAddSectionForm = true"
              class="inline-flex items-center ml-3 h-[40px] px-4 bg-[#728B78] text-white text-sm font-medium rounded-md hover:bg-[#536757] border-none hover:text-white transition-colors duration-200 whitespace-nowrap"
              style="font-size: 0.875rem;">
              Add New Section
            </button>
          </div>
        </div>

        <div v-if="!store.searchSelectedSearch" class="text-gray-500 text-center text-xl font-regular">
          Please select a search category to view results.
        </div>

        <div v-else class="flex justify-center w-full">
          <div class="rounded-lg w-full max-w-5xl">
            <div class="overflow-y-auto max-h-[80vh]">
              <table class="min-w-full text-left">
                <thead class="bg-head text-white sticky top-0">
                  <tr v-if="store.searchSelectedSearch === 'section'">
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Section-ID</th>
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Section Name</th>
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Grade Level</th>
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Adviser</th>
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Action</th>
                  </tr>
                  <tr v-else-if="store.searchSelectedSearch === 'student'">
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Student-ID</th>
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Student Name</th>
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Section and Grade Level</th>
                    <th class="px-6 py-3 text-left text-sm font-medium uppercase">Action</th>
                  </tr>
                </thead>

                <tbody class="text-gray-700">
                  <template v-if="store.searchSelectedSearch === 'section'">
                    <tr v-for="section in filteredSections()" :key="section.id" class="border-b bg-transparent">
                      <td class="px-6 py-4">{{ section.id }}</td>
                      <td class="px-6 py-4">{{ section.data.name }}</td>
                      <td class="px-6 py-4">Grade {{ section.data.level }}</td>
                      <td class="px-6 py-4">
                        <span v-if="section.data.adviser">{{ section.data.adviser.data.facultyId }}</span>
                        <span v-else class="text-gray-500">----</span>
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
                  <template v-else-if="store.searchSelectedSearch === 'student'">
                    <tr v-for="student in filteredStudents()" :key="student.id" class="border-b bg-transparent">
                      <td class="px-6 py-4">{{ student.id }}</td>
                      <td class="px-6 py-4">{{ student.data.lastName + ', ' + student.data.firstName }}</td>
                      <td class="px-6 py-4">{{ 'Grade ' + student.data.level + ' - ' + student.data.name }}</td>
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
    <AddSectionForm v-if="store.searchShowAddSectionForm" @close="store.searchShowAddSectionForm = false" @add-section="addNewSection" />
    <AddSectionForm v-if="showAddSectionForm" @close="showAddSectionForm = false" @add-section="addNewSection" />
    <StudentDetailsModal 
        v-if="selectedStudent"
        :show="!!selectedStudent"
        :studentData="selectedStudent"
        @close="selectedStudent = null"
    />
  </div>
</template>

<script>
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AddSectionForm from '~/components/Modals/AddSectionForm.vue';
import StudentDetailsModal from '~/components/Modals/StudentDetailsModal.vue';
import { section } from '~/data/section.js';
import { student } from '~/data/student.js';
import debounce from 'lodash/debounce';

export default {
  components: {
    AdminSidebar, AdminHeader, AddSectionForm, StudentDetailsModal
  },
  watch: {
    searchQuery: debounce(function (newQuery) {
      this.debouncedQuery = newQuery;
    }, 300) // Debounce with a 300ms delay
  },
  data() {
    return {
      searchQuery: '',
      debouncedQuery: '',
      selectedSearch: '',
      showAddSectionForm: false,
      sections: section,
      students: student,
      sortBy: '',
      selectedStudent: null,
    };
  },
  methods: {
    addNewSection(newSection) {
      this.sections.push({
        id: this.sections.length + 1, // assuming id is sequential hehe
        sectionName: newSection.sectionName,
        sectionLevel: newSection.sectionLevel,
        adviserId: newSection.adviserId
      });
    },
    getSectionByStudentId(studentId) {
      for (const sec of this.sections) {
        if (sec.sectionStudents.includes(studentId)) {
          return sec;
        }
      }
      return null;
    },
    navigateToPage(section) {
      if (section.adviserId) {
        this.$router.push({
          path: `/admin/section/${section.id}`
        });
      } else {
        this.$router.push({ name: 'admin-accounts' });
      }
    },
    viewStudentProfile(studentId) {
      const studentData = this.students.find(s => s.studentId === studentId);
      if (studentData) {
        this.selectedStudent = studentData;
      }
    }
  },
  computed: {
    filteredSections() {
      let filtered = this.sections.filter((section) => {
        if (!this.debouncedQuery) return true; // Show all if query is empty
        return (
          section.sectionName.toLowerCase().includes(this.debouncedQuery.toLowerCase()) ||
          String(section.sectionLevel).includes(this.debouncedQuery) ||
          (section.adviserId && section.adviserId.toLowerCase().includes(this.debouncedQuery.toLowerCase()))
        );
      });
      if (this.selectedSearch === 'section') {
        if (this.sortBy === 'sNameSort') {
          filtered.sort((a, b) => a.sectionName.localeCompare(b.sectionName));
        } else if (this.sortBy === 'sGradeSort') {
          filtered.sort((a, b) => a.sectionLevel - b.sectionLevel);
        } else if (this.sortBy === 'recentlyAddedSort') {
          filtered.sort((a, b) => b.id - a.id); // TODO: Change to date added if naa na nga attribute
        }
      }

      return filtered;
    },
    filteredStudents() {
      let filtered = this.students.filter((student) => {
        if (!this.debouncedQuery) return true;
        return (
          student.studentId.toLowerCase().includes(this.debouncedQuery.toLowerCase()) ||
          student.lastName.toLowerCase().includes(this.debouncedQuery.toLowerCase()) ||
          student.firstName.toLowerCase().includes(this.debouncedQuery.toLowerCase())
        );
      });

      if (this.selectedSearch === 'student') {
        if (this.sortBy === 'surnameSort') {
          filtered.sort((a, b) => a.lastName.localeCompare(b.lastName));
        } else if (this.sortBy === 'gradeLvlSort') {
          filtered.sort((a, b) => {
            const sectionA = this.getSectionByStudentId(a.studentId);
            const sectionB = this.getSectionByStudentId(b.studentId);
            return (sectionA ? sectionA.sectionLevel : 0) - (sectionB ? sectionB.sectionLevel : 0);
          });
        }
      }

      return filtered.map(student => {
        const section = this.getSectionByStudentId(student.studentId);
        return {
          ...student,
          sectionName: section ? section.sectionName : '---',
          sectionLevel: section ? section.sectionLevel : '---'
        };
      });
    },
  },
};
</script>

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
