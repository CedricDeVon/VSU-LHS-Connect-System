<script setup lang="ts">
// import { adminStore } from '~/stores/views/adminViewStore';
import { useFirebaseAuth } from "vuefire";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// const aStore = adminStore();
async function logInAsAdmin() {
    
    // await signInWithEmailAndPassword(auth, , );
    // await aStore.updateDashboard();
    return navigateTo("/admin/dashboard", { replace: true });
}

async function logInAsAdviser() {
    // await signInWithEmailAndPassword(auth, , );
    return navigateTo("/adviser/advisory", { replace: true });
}

</script>
<template>
    <div>
        <button class="p-2" @click="logInAsAdmin">Admin</button>
        <button class="p-2" @click="logInAsAdviser">Adviser</button>
    </div>
</template>