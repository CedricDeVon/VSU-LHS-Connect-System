<!--
<template>
    <form @submit.prevent = "openEmailClient">
        <input v-model = "emailTo" type="email" placeholder="sendanan" required/>
        <input v-model="email.subject" type="text" placeholder="subject" required />
        <textarea v-model = "email.body" placeholder="Menshae neymo" required ></textarea>
        <button type = "submit">Send Email</button>
    </form>
</template>

<script setup>
    import {ref} from 'vue';

    const email = ref({
        to: '',
        subject:'',
        body:'',
    });

    const openEmailClient = () => {
        const mailtoLink = `mailto:${email.value.to}?subject=${encodeURIComponent(email.value.subject)}&body=${encodeURIComponent(email.value.body)}`;
        window.location.href = mailtoLink;
    };
</script>
-->