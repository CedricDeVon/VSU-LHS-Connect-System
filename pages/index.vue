<script setup lang="ts">
import * as firestore from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { Chronos } from '~/library/utilities/chronos';
import { Logger } from '~/library/loggers/logger'

const database = firestore.getFirestore(getApp());
console.log(database)

async function test() {
  const results = await useFetch('/api/demo');
  console.log('CLIENT:');
  Logger.logDebug(results.data.value);
  Logger.logDebug(`${results.data.value?.a}`);
  Logger.logInfo(`${results.data.value?.b}`);
  Logger.logWarning(`${results.data.value?.c}`);
  Logger.logError(`${results.data.value?.d}`);

}
</script>

<template>
  <div>
    <button @click=test>Test Me</button>
  </div>
</template>
<template>
  <div>
    <button @click=test>Test Me</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            loginError: '',
        };
    },
    methods: {
        handleSubmit() {
            this.emailError = '';
            this.passwordError = '';
            this.loginError = '';

            if (!this.email) {
                this.emailError = 'Email is required';
            }
            if (!this.password) {
                this.passwordError = 'Password is required';
            }

            if (!this.emailError && !this.passwordError) {
                console.log('Email:', this.email);
                console.log('Password:', this.password);

                this.loginError = 'Invalid email or password';
            }
        },
    },
};
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #fffef1;
}

.flex {
    display: flex;
}
.items-center {
    align-items: center;
}
.justify-center {
    justify-content: center;
}
.min-h-screen {
    min-height: 100vh;
}
.bg-gray-100 {
    background-color: #fffef1;
}
.bg-white {
    background-color: #fff;
}
.shadow-md {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.rounded-lg {
    border-radius: 8px;
}
.p-8 {
    padding: 2rem;
}
.max-w-md {
    max-width: 28rem;
}
.w-full {
    width: 100%;
}

.hover\:bg-blue-600:hover {
    background-color: #2563eb;
}

.focus\:ring-2:focus {
    ring-width: 2px;
}
.focus\:ring-blue-500:focus {
    ring-color: #3b82f6;
}
</style>



