<script setup lang="ts">
import { useRouter } from 'vue-router';
import { handleBackClick } from '~/composables/navigation';
import { ref, onMounted } from 'vue';
import { Generators } from '~/library/generators/generators';
import { userSignUpStore } from '~/stores/userSignUp'

const store = userSignUpStore()

const submit = async () => {  
  const result: any = await $fetch('/api/user/signUpBase', {
    method: 'POST',
    body: {
      userName: store.userName,
      email: store.email,
      password: store.password,
      confirmPassword: store.confirmPassword
    }
  });

  if (result.isSuccessful) {
    return navigateTo("/SignupPage2", { replace: true });

  } else {
    store.errorMessage = result.message;
  }
};

const goBack = () => {
  handleBackClick();
};

</script>

<template>
  <div class="flex min-h-screen">
    <div class="w-1/2  flex items-center justify-center bg-left">
      <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden signup-outer-container">
        <div class="w-full p-8 bg-amber-50 signup-container">
          <h2 class="text-2xl font-semibold text-green-800 mb-6">Login Details</h2>
          <form @submit.prevent="submit">
            <div class="mb-4">
              <input
                type="text"
                v-model="store.userName"
                placeholder="Enter username"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4">
              <label class="block text-green-800 mb-1">VSUIHS-Issued Email</label>
              <input
                type="email"
                v-model="store.email"
                placeholder="Enter email"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-4">
              <label class="block text-green-800 mb-1">Password</label>
              <input
                type="password"
                v-model="store.password"
                placeholder="Password"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="mb-6">
              <label class="block text-green-800 mb-1">Confirm Password</label>
              <input
                type="password"
                v-model="store.confirmPassword"
                placeholder="Confirm Password"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div v-if ="store.errorMessage" class="text-red-500 mb-4">{{ store.errorMessage }}</div>
            <button
              type="submit"
              class="w-full bg-green-800 text-white p-2 rounded-md hover:bg-green-900 transition duration-300 mb-2"
            
            >
              PROCEED
            </button>
            
            <div class="text-center text-gray-500 my-2">OR</div>
            <button
              type="button"
              @click="handleBackClick"
              class="w-full bg-green-400 text-white p-2 rounded-md hover:bg-green-500 transition duration-300"
            >
            BACK
            
            </button>
          </form>
        </div>
      </div>
    </div>
    <!-- Right section -->
    <div class="w-1/2 bg-right">

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
</style>

// onMounted(()=>{
  //   if(typeof window !== 'undefined'){
  //     signUpUsername.value = sessionStorage.getItem('signUpUsername') || '';
  //     signUpEmail.value = sessionStorage.getItem('signUpEmail') || '';
  //     signUpPassword.value = sessionStorage.getItem('signUpPassword') || '';
  //   }
  // });
  

// sessionStorage.setItem('signUpUsername', signUpUsername.value);
  // sessionStorage.setItem('signUpEmail', signUpEmail.value);
  // sessionStorage.setItem('signUpPassword', signUpPassword.value);
  // sessionStorage.setItem('signUpConfirmPassword', signUpConfirmPassword.value);
  // console.log(signUpUsername.value)
  <!-- router.push({ name: 'SignupPage2' }); -->


  // errorMessage.value = '';

  // if(!username.value){
  //   errorMessage.value = 'Username is required.';
  //   return;
  // }
  // if(!email.value){
  //   errorMessage.value = 'Email Address is required.';
  //   return;
  // }
  // if(!password.value){
  //   errorMessage.value = 'Password is required.';
  //   return;
  // }
  // if(password.value !== confirmPassword.value){
  //   errorMessage.value = 'Password do not match.';
  //   return;
  // }

  // if(!usernameAvailable(username.value)){
  //   errorMessage.value = 'Username already taken.';
  //   return;
  // }
  // if(existingEmail(email.value)){
  //   errorMessage.value = 'Email is already registered.';
  //   return;
  // }

  // sessionStorage.setItem('username', username.value);
  // sessionStorage.setItem('username', username.value);
  // sessionStorage.setItem('email', email.value);
  // sessionStorage.setItem('password', password.value);
  // sessionStorage.setItem('confirmPassword', confirmPassword.value);
  
  // const user = {
  // id: Generators.uuidGenerator.generate(),
  // email: signUpEmail.value,
  // username: signUpUsername.value,
  // password: signUpPassword.value,
  // status: false,
  // }
  // // sessionStorage.setItem('user', JSON.stringify(user));  