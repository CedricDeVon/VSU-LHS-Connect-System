<script setup lang="ts">
import DatePickerInput from '@/components/used-components/DatePickerInput.vue';
import { userSignUpStore } from '~/stores/userSignUp'
import statueImage from '~/assets/images/vsu-main-the-search-for-truth-statue.png'

const store = userSignUpStore()

const submit = async () => {  
  return navigateTo("/RegistrationSuccessful", { replace: true });
};

const goBack = () => {
  return navigateTo("/SignupPage1", { replace: true });
};

onMounted(() => {
  store.resetAdviserData();
});
</script>

<template>
  <div class="fixed inset-0 flex overflow-hidden">
    <!-- Statue Background -->
    <div class="fixed right-[5%] top-[20%] h-screen w-1/2 bg-cover bg-left opacity-75 z-10 scale-[1.03]
             animate-statue-entrance mix-blend-multiply" :style="{
              backgroundImage: `url(${statueImage})`,
              backgroundColor: 'transparent'
            }"></div>

    <!-- Left side with form -->
    <div class="w-1/2 flex items-center justify-center bg-left h-screen">
      <div class="w-[480px] animate-slide-in">
        <form @submit.prevent="submit" 
              class="bg-white p-8 rounded-xl shadow-md space-y-5 max-h-[90vh] overflow-y-auto mb-8">
          <h2 class="text-[#2B5741] text-2xl font-semibold mb-8 animate-fade-in-delayed">Personal Details</h2>
          
          <!-- First Name -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="block text-[#2B5741] text-sm mb-1">First Name</label>
            <input 
              type="text" 
              v-model="store.firstName" 
              placeholder="Enter first name"
              class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
              required 
            />
          </div>

          <!-- Middle Name -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="block text-[#2B5741] text-sm mb-1">Middle Name</label>
            <input 
              type="text" 
              v-model="store.middleName" 
              placeholder="Enter middle name"
              class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
            />
          </div>

          <!-- Last Name -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="block text-[#2B5741] text-sm mb-1">Last Name</label>
            <input 
              type="text" 
              v-model="store.lastName" 
              placeholder="Enter last name"
              class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
              required 
            />
          </div>

          <!-- Combined Suffix Checkbox and Input -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <input 
                type="checkbox" 
                v-model="store.hasSuffix"
                class="h-4 w-4 text-[#2B5741] border-gray-200 rounded 
                       focus:ring-[#2B5741] transition-all duration-300"
              />
              <label class="text-[#2B5741] text-sm">Add Suffix</label>
            </div>

            <!-- Suffix Input (Conditional) - Now inline -->
            <div v-if="store.hasSuffix" 
                 class="flex-1 transform transition-all duration-300 hover:scale-[1.02] animate-fade-in">
              <input 
                type="text" 
                v-model="store.suffix" 
                placeholder="e.g., Jr., Sr."
                class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                       transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
              />
            </div>
          </div>

          <!-- Birthdate -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="block text-[#2B5741] text-sm mb-1">Birthdate</label>
            <DatePickerInput 
              v-model="store.birthdate"
              class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
            />
          </div>

           <!-- <div class="flex space-x-4 mt-4 mb-6">
                 <div class="w-1/2">
                    <label class="block text-green-800 mb-1">Grade Level</label>
                    <select v-model="store.gradeLevel"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="" disabled>Select Grade Level</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                  <div class="w-1/2">
                    <label class="block text-green-800 mb-1">Section Name</label>
                    <input type="text" v-model="store.sectionName" placeholder="Enter section name"
                      class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div> 
                </div>-->


          <!-- Faculty ID -->
          <div class="relative transform transition-all duration-300 hover:scale-[1.02]">
            <label class="block text-[#2B5741] text-sm mb-1">Faculty Identification Number</label>
            <input 
              type="text" 
              v-model="store.facultyId" 
              placeholder="Enter faculty ID"
              class="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-[#2B5741]/20"
              required 
            />
          </div>

          <!-- Error Message -->
          <div v-if="store.errorMessage" 
               class="text-red-500 text-sm animate-shake bg-red-50 p-3 rounded-lg">
            {{ store.errorMessage }}
          </div>
        </form>

          <!-- Proceed Button -->
          <button
            type="submit"
            class="w-full py-3 bg-[#2B5741] text-white rounded-lg text-sm uppercase tracking-wider
                   transform transition-all duration-300
                   hover:bg-[#1e3d2d] hover:scale-[1.02] hover:shadow-lg
                   active:scale-95"
          >
            PROCEED
          </button>

          <!-- Divider -->
          <div class="text-center text-gray-500 my-2">OR</div>

          <!-- Back Button -->
          <button
            type="button"
            @click="goBack"
            class="w-full py-3 bg-[#6B8E76] text-white rounded-lg text-sm uppercase tracking-wider
                   transform transition-all duration-300
                   hover:bg-[#5a7862] hover:scale-[1.02] hover:shadow-lg
                   active:scale-95"
          >
            BACK
          </button>
       
      </div>
    </div>

    <!-- Right section with logo -->
    <div class="w-1/2 bg-right h-screen animate-fade-in">
      <div class="relative h-full flex flex-col items-center justify-start animate-slide-in-right">
        <!-- Logo Container -->
        <div class="bg-[#F5F5F5]/80 backdrop-blur-sm rounded-lg w-[80%] max-w-[600px] 
                    transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                    animate-fade-in-delayed">
          <img 
            src="@/assets/images/final-logo-1.png" 
            alt="Connect System Logo" 
            class="w-full max-w-[70%] h-auto mx-auto transform transition-all duration-500 
                   hover:scale-[1.05] animate-float"
          >
        </div>
      </div>
    </div>
  </div>
</template>

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

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  75% {
    transform: translateX(5px);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-slide-in {
  animation: slideIn 0.8s ease-out;
}

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

/* Add this to prevent body scrolling */
:root {
  overflow: hidden;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.02);
  }
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delayed {
  animation: fadeIn 1s ease-out 0.3s both;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>

// onMounted(()=>{
  //   if(typeof window !== 'undefined'){
  //     const userData = sessionStorage.getItem('user');
  //     if(userData){
  //       user.value =  JSON.parse(userData);
  //     }
  //   }
  //   return user;
  // });
  
  // const handleSubmit = () => {
  //   if(!firstName.value){
  //     errorMessage.value = 'First Name is Required.';
  //     return;
  //   }
  //   if (!lastName.value){
  //     errorMessage.value = 'Last Name is Required.';
  //     return;
  //   }
  //   if(!bdate.value){
  //     errorMessage.value = 'Please input your birthdate.';
  //     return;
  //   }
  //   if(!facultyID.value){
  //     errorMessage.value = 'faculty ID is Required.';
  //     return;
  //   }
  //   if(!user.value){
  //     console.log('user doesn\'t exist');
  //     return;
  //   }
  //   if(!gradeLevel.value){
  //     errorMessage.value = 'Please choose year level.';
  //     return;
  //   }
  //   if(!sectionName.value){
  //     errorMessage.value = 'Please input the section';
  //     return;
  //   }
  //   //this may seem duplicating from the previous page but I think These values stored in sessionStorage 
  //   //might be used in validation of inputs later on especially in confirming that their facultyID matches the @vsu.edu.ph acct.
  //   //and also, to confirm everything before adding to db, that is why I put here the adding of user to dataset instead of adding it right after the 1st page since we have back option in this page2 
  //   const newUser = {
  //   userId: user.value.userId,
  //   emailAdd: user.value.emailAdd,
  //   username: user.value.username,
  //   password: user.value.password,
  //   canAccess: false,
  //   }
  //   createUser(newUser); 
  
  //   const secID = getSectionIDByName(sectionName.value, '2024-2025');//This academicYear should be something like default global variable? naa bay ana dinhi? hahhah na machange lng siya when we reset the AY.
  //   const id = (getAdvisers()).length + 1;
  
  //   const newAdviser = {
  //     id: `adviserid${id}`,
  //     userId: user.value.userId,
  //     sectionId: secID,
  //     facultyId: facultyID.value,
  //     firstName: firstName.value,
  //     lastName: lastName.value,
  //     middleName: middleName.value,
  //     suffix: suffix.value,
  //     bdate: bdate.value,
  //     profilePic: null,
  //     status: 'pending',
  //   }
  //     addadviser(newAdviser);
  //     goToRegistrationSuccessPage();
  // };



  
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