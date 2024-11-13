<script setup lang="ts">
import { useAdminViewStore } from '~/stores/views/adminViewStore';
import { useFirebaseAuth } from "vuefire";
import { UserSecurity } from "~/library/security/userSecurity";
import { ConfigurationReaders } from '~/library/configurationReaders/configurationReaders';

const auth = useFirebaseAuth();
const adminViewStore = useAdminViewStore();

async function logInAsAdmin() {    
    await UserSecurity.logInUser({
        auth,
        email: ConfigurationReaders.nuxtConfigurationReader.DEBUG_ADMIN_EMAIL,
        password: ConfigurationReaders.nuxtConfigurationReader.DEBUG_ADMIN_PASSWORD,
        role: 'admin'
    });
    return navigateTo("/admin/dashboard", { replace: true });
}

async function logInAsAdviser() {
    await UserSecurity.logInUser({
        auth,
        email: ConfigurationReaders.nuxtConfigurationReader.DEBUG_ADVISER_EMAIL,
        password: ConfigurationReaders.nuxtConfigurationReader.DEBUG_ADVISER_PASSWORD,
        role: 'adviser'
    });
    return navigateTo("/adviser/advisory", { replace: true });
}

</script>
<template>
    <div>
        <button class="p-2" @click="logInAsAdmin">Admin</button>
        <button class="p-2" @click="logInAsAdviser">Adviser</button>
    </div>
</template>