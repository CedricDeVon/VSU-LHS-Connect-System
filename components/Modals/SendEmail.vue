<template>
  <div class="fixed inset-0 z-50">
    <form @submit.prevent="sendEmail">
      <input type="email" v-model="formData.to_email" placeholder="Recipient Email" required 
      class="border-2" />
      <textarea class="border-2" v-model="formData.message" placeholder="Your Message" required></textarea>
      <button type="submit">Send Email</button>
    </form>
    <p v-if="feedbackMessage">{{ feedbackMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import emailjs from '@emailjs/browser';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();

const formData = ref({
  to_email: '',
  message: ''
});

const feedbackMessage = ref('');

const sendEmail = async () => {
  try {
    console.log(formData.value)
    const response = await $fetch('/api/send-email', {
      method: 'POST',
      body: {
        from_name: 'Ma\'am Mimi',
        to_email: formData.value.to_email,
        message: formData.value.message
      }
    });

    await emailjs.send(
      config.email_Service_Id,
      config.email_Template_Id,
      {
        from_name: formData.value.from_name,
        to_email: formData.value.to_email,
        message: formData.value.message
      },
      config.email_Public_Key
    );

    // console.log(response)

    feedbackMessage.value = 'Email sent successfully!';
    formData.value = { from_name: '', to_email: '', message: '' };
  } catch (error) {
    console.error('Error sending email:', error);
    feedbackMessage.value = 'Failed to send email. Please try again.';
  }
};
</script>

<style scoped>
/* Optional styling */
h1 {
  margin-bottom: 20px;
}
</style>