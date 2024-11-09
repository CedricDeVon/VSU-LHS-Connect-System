<script setup lang="ts">
import { adminStore } from '@/stores/admin';
import { useFirebaseAuth } from "vuefire";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const aStore = adminStore();
const auth = useFirebaseAuth()!;

async function logInAsAdmin() {
    await signInWithEmailAndPassword(auth, 'admin.cs@vsuihs.com', '326_TheWorldIsFlat');
    await aStore.updateDashboard();
    return navigateTo("/AdminDashboard", { replace: true });
}

async function logInAsAdviser() {
    await signInWithEmailAndPassword(auth, '22-1-00001@vsu.edu.ph', '326_TheWorldIsFlat');
    return navigateTo("/RegistrationSuccessful", { replace: true });
}

</script>
<template>
    <div>
        <button class="p-2" @click="logInAsAdmin">Admin</button>
        <button class="p-2" @click="logInAsAdviser">Adviser</button>
    </div>
</template>