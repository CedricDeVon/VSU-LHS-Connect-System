<template>
    <div class="w-full">
      <!-- <select
              class="  lg:mr-5 lg:pr-2 py-2 input border-b-1 ml-3 border-gray-400 bg-gray-10 text-black inline-flex whitespace-nowrap hover:bg-gray-15 focus:outline-none"
              v-model="selectedLevel">
              <option value="" disabled selected hidden>Prev Level</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
      </select> -->
      <input type="text" placeholder="Search Student"
            class=" w-2/5 px-4 py-2 m-4 mt-2  border border-gray-300 rounded-md focus:outline-none mr-3"
            v-model="searchQuery" />
      <button @click ="search" class=" button2 px-7 p-1 m-2 rounded-lg focus:outline-none" aria-label="search">
      Search
      </button>
  
    <div class="overflow-x-auto overflow-y-auto max-h-96">
      <table class="min-w-full  divide-gray-200">
        <thead class="bg-green-700 sticky top-0 z-10">
          <tr>
            <th scope="col"
              class="px-6 py-3 text-center text-sm font-medium text-white uppercase tracking-wider w-1/3">
              Student Name
            </th>
            <th scope="col"
              class="px-6 py-3 text-center text-sm font-medium text-white uppercase tracking-wider w-1/3">
              Student ID
            </th>
              <th scope="col"
              class="px-6 py-3 text-center text-sm font-medium text-white uppercase tracking-wider w-1/3">
              Action
            </th>
            
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 text-center">
          <tr v-for="student in filteredStudents()" :key="student.id">
            <td class="px-6 py-4 text-sm font-medium text-gray-900 break-words">
              {{ adviserViewStore.getFullName(student) }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 break-words">
              {{ student.id }}
            </td>
            <td class="px-6 py-4 break-words">
              <button @click="enrollStudent(student)"
                class="px-8 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white hover:bg-green-700 mr-2">
                  Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      <div class="flex justify-center mt-7 mb-7 ">
          <button @click ="$emit('close')" class=" button3 px-8 py-2 m-2 rounded-lg  focus:outline-none" aria-label="Done">
              Done
          </button>

      </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useAdviserViewStore } from '~/stores/views/adviserViewStore.js';

export default {
  name: 'UnEnrolledStudents',
  props: {
    academicYear: {
      type: String,
      default: '2023-2024'    // Change the default value to the current academic year
    }
  },

  async setup(props: any) {
      const searchQuery = ref<string>('');
      const debouncedQuery = ref<string>('');
      const selectedLevel = ref<string>('');
      const adviserViewStore = useAdviserViewStore();

      await adviserViewStore.updateUnEnrolledStudents();

      onBeforeMount(async () => {
        await adviserViewStore.updateUnEnrolledStudents();
      })

      const filteredStudents = () => {
          const results = adviserViewStore.unEnrolledStudents.filter((student: any) => {
            if (!searchQuery) return adviserViewStore.unEnrolledStudents;
            return (
              student.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
              student.data.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
              student.data.firstName.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
          });

          return results;

          // if (selectedLevel.value === '') {
          //   return results;
          // }
          // } else {
          //   return results.filter((student: any) => {
          //     return student.data.section.data.level === parseInt(selectedLevel.value);
          //   });
          // }
      };

      const enrollStudent = async (student: any) => {
        console.log(student)
        await adviserViewStore.enrollStudent(student);

        searchQuery.value = '';
        debouncedQuery.value = '';
        selectedLevel.value = '';

        await adviserViewStore.updateUnEnrolledStudents();
        await adviserViewStore.updateAdvisoryView();
      }

      return { adviserViewStore, searchQuery , debouncedQuery, filteredStudents, selectedLevel, enrollStudent };
  },
};
</script>

<style scoped>
       .button2{
        font-family: "Century Gothic", sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: white;
        background-color: #64886d;
        border: none;
        /* cursor: pointer; */
    }
    /* .button2:hover{
        background-color: #265630;
    } */

    .button3{
        font-family: "Century Gothic", sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: white;
        background-color: #969696;
        border: none;
        cursor: pointer;
    }
    .button3:hover{
        background-color:#7a7979;
    }
</style>