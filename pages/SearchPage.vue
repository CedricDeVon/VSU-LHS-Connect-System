<template>
  <div class="flex h-screen">
    <AdminSidebar />
    <div class="general flex-grow">
      <AdminHeader />
      <div class="p-8 pt-0 general min-h-screen max-h-screen flex flex-col w-full">
        <div class="flex justify-start items-center mb-6 max-w-auto">
          <div class="flex ml-7 items-center w-[80%]">
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
            <button v-if="selectedSearch === 'section'" @click="showAddSectionForm = true"
              class="inline-flex items-center ml-3 h-[40px] px-4 bg-[#728B78] text-white text-sm font-medium rounded-md hover:bg-[#536757] border-none hover:text-white transition-colors duration-200 whitespace-nowrap"
              style="font-size: 0.875rem;">
              Add New Section
            </button>
          </div>
        </div>

        <div v-if="!selectedSearch" class="text-gray-500 text-center">
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
                        <button
                          :class="section.adviserId ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'"
                          class="px-4 py-2 rounded-md hover:opacity-80 transition-opacity duration-200 text-sm">
                          {{ section.adviserId ? 'View Details' : 'Add Adviser' }}
                        </button>
                      </td>
                    </tr>
                  </template>
                  <template v-else-if="selectedSearch === 'student'">
                    <tr v-for="student in filteredStudents" :key="student.id" class="border-b bg-transparent">
                      <td class="px-6 py-4">{{ student.studentId }}</td>
                      <td class="px-6 py-4">{{ student.lastName + ', ' + student.firstName }}</td>
                      <td class="px-6 py-4">{{ student.sectionGrade }}</td>
                      <td class="px-6 py-4">
                        <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
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

export default {
  components: {
    AdminSidebar, AdminHeader, AddSectionForm
  },
  data() {
    return {
      searchQuery: '',
      selectedSearch: '',
      showAddSectionForm: false,
      sections: section,
      students: student,
    };
  },
  methods: {
    addNewSection(newSection) {
      this.sections.push({
        id: this.sections.length + 1, // assuming id is sequential
        sectionName: newSection.sectionName,
        sectionLevel: newSection.sectionLevel,
        adviserId: newSection.adviserId
      });
    },
  },
  computed: {
    filteredSections() {
      if (this.selectedSearch === 'section' && !this.searchQuery) {
        return this.sections;
      }
      return this.sections.filter((section) =>
        Object.values(section).some((value) =>
          String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    },
    filteredStudents() {
      if (this.selectedSearch === 'student' && !this.searchQuery) {
        return this.students;
      }
      return this.students.filter((student) =>
        Object.values(student).some((value) =>
          String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
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