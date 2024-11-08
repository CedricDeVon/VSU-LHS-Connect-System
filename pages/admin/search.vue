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
  </div>
</template>

<script>
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AddSectionForm from '~/components/Modals/AddSectionForm.vue';
import { section } from '~/data/section.js';
import { student } from '~/data/student.js';
import debounce from 'lodash/debounce';

export default {
  components: {
    AdminSidebar, AdminHeader, AddSectionForm
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
      this.$router.push(`/admin/student/${studentId}`);
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