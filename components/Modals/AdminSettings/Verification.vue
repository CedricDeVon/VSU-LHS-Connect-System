<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-century-gothic" >
        <div>
            <div class="flex justify-center items-center h-screen">
                <div class="bg-white w-full h-fit rounded-lg shadow-lg">
                    <div class="flex justify-between items-center px-5 py-3 border-b-2 border-lime-950">
                        <h1 class="text-lg font-bold">Verify with Password</h1>
                        <button @click="cancelRequest" class="text-lg font-bold">X</button>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-lg pt-8 p-5">Please input your password to verify your actions</p>
                        <div class="m-3">Password: <input type="password" class="ml-10 border-2 border-gray-200 rounded-md p-2 w-3/5" v-model="password"/> 
                        </div>
                        <div class="flex justify-center items-center my-7">
                            <button @click="proceedRequest" class="bg-red-500 text-white px-10 py-2 rounded-lg">Proceed</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getCurrentUser } from 'vuefire';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { UserSecurity } from "~/library/security/userSecurity";

export default {
    data() {
        return {
            password: ''
        }
    },

    emits: ['close', 'update'],

    methods: {
        cancelRequest() {
            this.password = '';
            this.$emit('close');
        },
       async proceedRequest() {
        try {
            await UserSecurity.logInViaToken();
            const currentUser = await getCurrentUser();
            await signInWithEmailAndPassword(getAuth(), currentUser.email, this.password);

            this.$emit('update');  
            this.password = '';
            alert('Validation Successful')

        } catch (error) {
            this.password = '';
            alert('Validation Failed')
        }
    }
    }
}
</script>

 