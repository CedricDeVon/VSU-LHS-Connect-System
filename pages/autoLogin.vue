<script setup lang="ts">
import { adminStore } from '@/stores/admin';
import { useFirebaseAuth } from "vuefire";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const aStore = adminStore();
const auth = useFirebaseAuth()!;

async function logInAsAdmin() {
    // await signInWithEmailAndPassword(auth, , );
    // await aStore.updateDashboard();
    return navigateTo("/AdminDashboard", { replace: true });
}

async function logInAsAdviser() {
    // await signInWithEmailAndPassword(auth, , );
    return navigateTo("/RegistrationSuccessful", { replace: true });
}

</script>
<template>
    <div>
        <button class="p-2" @click="logInAsAdmin">Admin</button>
        <button class="p-2" @click="logInAsAdviser">Adviser</button>
    </div>
</template>