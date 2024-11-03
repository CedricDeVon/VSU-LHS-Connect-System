<template>
  <div class="flex min-h-screen">
    <div class="w-1/2  flex items-center justify-center bg-left">
      <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden signup-outer-container">
        <div class="w-full p-8 bg-amber-50 signup-container">
          <h2 class="text-2xl font-semibold text-green-800 mb-6">Personal Details</h2>
          <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label class="block text-green-800 mb-1">First Name</label>
                <input type="text" v-model="firstName" placeholder="Enter first name"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div class="mb-4">
                <label class="block text-green-800 mb-1">Middle Name</label>
                <input type="text" v-model="middleName" placeholder="Enter middle name"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>

              <div class="mb-6">
                <div class="flex items-end space-x-4">
                  <div class="w-3/4">
                    <label class="block text-green-800 mb-1">Last Name</label>
                    <input type="text" v-model="lastName" placeholder="Enter last name"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div class="flex items-center space-x-2">
                    <input type="checkbox" v-model="hasSuffix"
                      class="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-500" />
                    <label class="text-green-800">Add Suffix</label>
                  </div>
                </div>

                <div class="flex space-x-4 mt-4">
                  <div v-if="hasSuffix" class="w-1/4">
                    <label class="block text-green-800 mb-1">Suffix</label>
                    <input type="text" v-model="suffix" placeholder="e.g., Jr., Sr."
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div :class="hasSuffix ? 'w-3/4' : 'w-full'">
                    <label class="block text-green-800 mb-1">Birthdate</label>
                    <DatePickerInput v-model="bdate"></DatePickerInput>
                  </div>
                </div>
                <div class="flex space-x-4 mt-4 mb-6">
                  <div class="w-1/2">
                    <label class="block text-green-800 mb-1">Grade Level</label>
                    <select v-model="gradeLevel"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="" disabled>Select Grade Level</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="10">Grade 11</option>
                      <option value="10">Grade 12</option>
                    </select>
                  </div>

                  <div class="w-1/2">
                    <label class="block text-green-800 mb-1">Section Name</label>
                    <input type="text" v-model="sectionName" placeholder="Enter section name"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>
              
                <div >
                  <label class="block text-green-800">Faculty Identification Number</label>
                  <input type="text" v-model="facultyID" placeholder="Enter faculty ID"
                    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
              <div v-if ="errorMessage" class="text-red-500 mb-4">{{  errorMessage }}</div>
            <button type="submit"
              class="w-full bg-green-800 text-white p-2 rounded-md hover:bg-green-900 transition duration-300 mb-2" >
              PROCEED
            </button>
            <div class="text-center text-gray-500 my-2">OR</div>
            <button type="button" @click="handleBackClick"
              class="w-full bg-green-400 text-white p-2 rounded-md hover:bg-green-500 transition duration-300">
              BACK

            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="w-1/2 bg-right">

    </div>
  </div>
</template>

<script setup lang="ts">

const signUpUsername = useState('signUpUsername');
console.log(signUpUsername.value)

//     const router = useRouter();
// import { useRouter } from 'vue-router';
// import { handleBackClick } from '~/composables/navigation';
// import { getUserCount, createUser } from '~/data/user';
// import { getAdvisers, addadviser } from '~/data/adviser';
// import { getSectionIDByName } from '~/data/section';
// import {ref, onMounted} from 'vue';

// import DatePickerInput from '@/components/used-components/DatePickerInput.vue';
// import { section } from '~/data/section';

// export default {
//   name: 'SignupPage2',
//   components: {
//     DatePickerInput
//   },
//   setup() {
//     const router = useRouter();
//     const goToRegistrationSuccessPage = () => {
//     router.push({ name: 'RegistrationSuccessful' });
//     };

//     const firstName = ref('');
//     const middleName = ref('');
//     const lastName = ref('');
//     const suffix = ref('');
//     const bdate = ref('');
//     const facultyID = ref('');
//     const errorMessage = ref('');
//     const gradeLevel = ref('');
//     const sectionName = ref('');
//     const user = ref(null);

//     onMounted(()=>{
//       if(typeof window !== 'undefined'){
//         const userData = sessionStorage.getItem('user');
//         if(userData){
//           user.value =  JSON.parse(userData);
//         }
//       }
//       return user;
//     });

//     const handleSubmit = () => {
//       if(!firstName.value){
//         errorMessage.value = 'First Name is Required.';
//         return;
//       }
//       if (!lastName.value){
//         errorMessage.value = 'Last Name is Required.';
//         return;
//       }
//       if(!bdate.value){
//         errorMessage.value = 'Please input your birthdate.';
//         return;
//       }
//       if(!facultyID.value){
//         errorMessage.value = 'faculty ID is Required.';
//         return;
//       }
//       if(!user.value){
//         console.log('user doesn\'t exist');
//         return;
//       }
//       if(!gradeLevel.value){
//         errorMessage.value = 'Please choose year level.';
//         return;
//       }
//       if(!sectionName.value){
//         errorMessage.value = 'Please input the section';
//         return;
//       }
//       //this may seem duplicating from the previous page but I think These values stored in sessionStorage 
//       //might be used in validation of inputs later on especially in confirming that their facultyID matches the @vsu.edu.ph acct.
//       //and also, to confirm everything before adding to db, that is why I put here the adding of user to dataset instead of adding it right after the 1st page since we have back option in this page2 
//       const newUser = {
//       userId: user.value.userId,
//       emailAdd: user.value.emailAdd,
//       username: user.value.username,
//       password: user.value.password,
//       canAccess: false,
//       }
//       createUser(newUser); 

//       const secID = getSectionIDByName(sectionName.value, '2024-2025');//This academicYear should be something like default global variable? naa bay ana dinhi? hahhah na machange lng siya when we reset the AY.
//       const id = (getAdvisers()).length + 1;

//       const newAdviser = {
//         id: `adviserid${id}`,
//         userId: user.value.userId,
//         sectionId: secID,
//         facultyId: facultyID.value,
//         firstName: firstName.value,
//         lastName: lastName.value,
//         middleName: middleName.value,
//         suffix: suffix.value,
//         bdate: bdate.value,
//         profilePic: null,
//         status: 'pending',
//       }
//         addadviser(newAdviser);
//         goToRegistrationSuccessPage();
//     };

//     return { errorMessage, gradeLevel, sectionName, user, firstName, middleName, lastName, suffix, bdate, facultyID, handleSubmit, goToRegistrationSuccessPage };
//   },
//   methods: {
//     goBack() {
//       this.$router.push('/');
//     }
//   }
// };
</script>

<style scoped>
.bg-left {
  background-color: #fffef1;
}

.bg-right {
  background-color: #f5f5f5;
}

.signup-outer-container {
  width: 90%;
}

.signup-container {
  padding: 50px;
  background-color: white;
}
</style>