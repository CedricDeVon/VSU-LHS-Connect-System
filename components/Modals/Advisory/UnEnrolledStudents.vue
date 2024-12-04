<template>
  <div>
    <div class="w-full absolute  inset-0">
        <select
                class="  lg:mr-5 lg:pr-2 py-2 input border-b-1 ml-3 border-gray-400 bg-gray-10 text-black inline-flex whitespace-nowrap hover:bg-gray-15 focus:outline-none"
                v-model="selectedLevel">
                <option value="" disabled selected hidden>Prev Level</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
        </select>
        <input type="text" placeholder="Search Student"
              class=" w-2/5 px-4 py-2 m-4 mt-2  border border-gray-300 rounded-md focus:outline-none mr-3"
              v-model="searchQuery" />
        <button class=" button2 px-7 p-1 m-2 rounded-lg focus:outline-none" aria-label="search">
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
            <tr v-for="student in filteredStudents" :key="student.studentId">
              <td class="px-6 py-4 text-sm font-medium text-gray-900 break-words">
                {{ student.firstName + ' ' + student.lastName }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 break-words">
                {{ student.studentId }}
              </td>
              <td class="px-6 py-4 break-words">
                <button v-if="student.isEnrolled"
                  class="px-8 inline-flex text-xs leading-5 font-semibold rounded-full  bg-[#969696] text-white mr-2">
                    Added
                </button>
                <button v-else @click="addToSection(student)"
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
    <ConfirmAddToSection v-if="showConfirmAddToSection" :sectionId="sectionId" :studentObj="studentObj" @close="handleClose" @add="confirmAdd" />
  </div>
  </template>
  
  <script lang="ts">
    import { computed } from 'vue';
    import {watch, ref} from 'vue';
    import { student } from '../../../data/student.js'; 
    import debounce from 'lodash/debounce';
    import { section } from '~/data/section.js';
    import { useSectionStore } from '~/stores/section';
    import ConfirmAddToSection from '../AdviserConfirmations/ConfirmAddToSection.vue';

  
  export default {
  components: { ConfirmAddToSection },
    name: 'UnEnrolledStudents',
    props: {
      academicYear: {
        type: String,
        default: '2024-2025'    // Change the default value to the current academic year or remove this and use Store
      }
    },


    setup(props , { emit }) {

        const searchQuery = ref<string>('');
        const debouncedQuery = ref<string>('');
        const selectedLevel = ref<string>('');
        const secStore = useSectionStore();
        const showConfirmAddToSection = ref(false);
        const studentObj = ref({});
        const sectionId = ref('');
        

        watch(searchQuery, debounce((newQuery: string) => {
        debouncedQuery.value = newQuery;
        }, 300));

        const unenrolledStudents = computed(() => {
            return student.filter((stdnt) => stdnt.isEnrolled === false );
        });

     const getStudentIDPerLevel = (level: string, AY: string) => {
        var sections = section.filter((sec) => sec.sectionLevel === level);
        sections = sections.filter((sec) => sec.sectionSchoolYear === AY);
        const studentIDs: string[] = [];
        sections.forEach((sec) => {
            sec.sectionStudents.forEach((student) => {
                studentIDs.push(student);
            });
        });
        console.log(studentIDs)
        return studentIDs;
    };

    const getPreviousAcademicYear = (current: string): string => {
        const years = current.split('-');
        const startYear = parseInt(years[0], 10);
        const endYear = parseInt(years[1], 10);
        const previousStartYear = startYear - 1;
        const previousEndYear = endYear - 1;
        return `${previousStartYear}-${previousEndYear}`;
    };

    const filteredStudents = computed(() => {
        let filtered: student[] = unenrolledStudents.value.filter((stdnt: student) => {
          if (selectedLevel.value === '' && debouncedQuery.value === '') return true;
          
          const studentIds = getStudentIDPerLevel(selectedLevel.value, getPreviousAcademicYear(props.academicYear)); 
          const query = debouncedQuery.value.toLowerCase();
          
          if (selectedLevel.value) {
            const levelIds = studentIds.includes(stdnt.studentId);
            if (debouncedQuery) {
              return (
                (levelIds &&
                  (stdnt.firstName.toLowerCase().includes(query) ||
                    stdnt.lastName.toLowerCase().includes(query) ||
                    stdnt.studentId.includes(query)))
              );
            }
            return levelIds;
          }
          return (
            stdnt.firstName.toLowerCase().includes(query) ||
            stdnt.lastName.toLowerCase().includes(query) ||
            stdnt.studentId.includes(query)
          );
        });

        
        return filtered;
    
    });

    const addToSection = (studentParam) =>{
      studentObj.value = studentParam;
      sectionId.value = secStore.section.id;
      showConfirmAddToSection.value = true;
           
    };
    
    function confirmAdd(){
      showConfirmAddToSection.value = false;
      filteredStudents.value;
    };

    function handleClose ()  {
      showConfirmAddToSection.value = false;
    };

    return {studentObj, sectionId, confirmAdd, handleClose, showConfirmAddToSection, addToSection, getPreviousAcademicYear, unenrolledStudents, searchQuery , debouncedQuery, filteredStudents, getStudentIDPerLevel, selectedLevel};
    
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