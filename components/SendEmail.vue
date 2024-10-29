
<template>
    <div>
      <h1>Contact Us</h1>
      <form @submit.prevent="sendEmail">
        <input type="text" v-model="formData.user_name" placeholder="Your Name" required />
        <input type="email" v-model="formData.user_email" placeholder="Your Email" required />
        <textarea v-model="formData.message" placeholder="Your Message" required></textarea>
        <button type="submit">Send Email</button>
      </form>
      <p v-if="feedbackMessage">{{ feedbackMessage }}</p>
    </div>
  </template>

  <script setup>

 
  import { ref, onMounted } from 'vue';
  import emailjs from '@emailjs/browser';


  const formData = ref({
    user_name: '',
    user_email: '',
    message: '',
  });
  const feedbackMessage = ref('');

  
  const sendEmail = () => {
   const templateParams = {
      from_name: formData.value.user_name,
      to_email: formData.value.user_email,
      message: formData.value.message,
    };

  
    emailjs
      .send(
        useRuntimeConfig().public.serviceId,
        useRuntimeConfig().public.templateId,
        templateParams,
        useRuntimeConfig().public.publicKey
      )
      .then(() => {
        feedbackMessage.value = 'Email sent successfully!';
        formData.value = { from_name: '', to_email: '', message: '' };
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        feedbackMessage.value = 'Failed to send email. Please try again.';
      });
  };
  </script>
  
  <style scoped>
  /* Optional styling */
  input, textarea {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    padding: 8px;
  }
  button {
    padding: 10px 15px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  