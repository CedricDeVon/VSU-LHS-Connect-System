<!--<template>
    <div>
        <h1>Send Email</h1>
        <form @submit.prevent="sendEmail">
            <input v-model="to" type="email" placeholder="Recipient's email" required />
            <input v-model="subject" type="text" placeholder="Subject" required />
            <textarea v-model="text" placeholder="Message" required></textarea>
            <button type="submit">Send Email</button>
        </form>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const to = ref('');
const subject = ref('');
const text = ref('');
const message = ref('');

const sendEmail = async () => {
    const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: to.value, subject: subject.value, text: text.value }),
    });

    const result = await response.json();
    message.value = result.message;
};
</script>
-->

<!--
<template>
    <form ref="form" @submit.prevent="sendEmail">
      <label>Name</label>
      <input type="text" name="user_name">
      <label>Email</label>
      <input type="email" name="user_email">
      <label>Message</label>
      <textarea name="message"></textarea>
      <button type="submit">Send</button>
    </form>
  </template>
  
  <script>
  import emailjs from '@emailjs/browser';
 
  
  export default {
    methods: {
      sendEmail() {
        emailjs
          .sendForm(process.env.NUXT_SERVICE_ID, process.env.NUXT_TEMPLATE_ID, this.$refs.form, {
            publicKey: process.env.NUXT_PUBLIC_KEY,
          })
          .then(
            () => {
              console.log('SUCCESS!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
      },
    },
  };
  </script>


<template>
    <div>
        <h1>Send Email</h1>
        <form @submit.prevent="sendEmail">
            <input v-model="to" type="email" placeholder="Recipient's email" required />
            <input v-model="subject" type="text" placeholder="Subject" required />
            <textarea v-model="message" placeholder="Message" required></textarea>
            <button type="submit">Send Email</button>
        </form>
        <p v-if="feedbackMessage">{{ feedbackMessage }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import emailjs from 'emailjs-com';

const to = ref('');
const subject = ref('');
const message = ref('');
const feedbackMessage = ref('');

const sendEmail = async () => {
    const templateParams = {
        to_email: to.value,
        subject: subject.value,
        message: message.value,
    };

    try {
        const response = await emailjs.send(process.env.MY_SERVICE_ID, process.env.MY_TEMPLATE_ID, templateParams, process.env.MY_PUBLIC_KEY);
        feedbackMessage.value = 'Email sent successfully!';
    } catch (error) {
        console.error('Error sending email:', error);
        feedbackMessage.value = 'Error sending email. Please try again.';
    }
};
</script>

-->



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


  import { ref } from 'vue';
  import emailjs from '@emailjs/browser';
  

  const formData = ref({
    user_name: '',
    user_email: '',
    message: '',
  });
  const feedbackMessage = ref('');
  
  const sendEmail = () => {
    const templateParams = {
      user_name: formData.value.user_name,
      user_email: formData.value.user_email,
      message: formData.value.message,
    };

  
    emailjs
      .send(
        process.env.NUXT_PUBLIC_SERVICE_ID,
        process.env.NUXT_PUBLIC_TEMPLATE_ID,
        templateParams,
        process.env.NUXT_PUBLIC_PUBLIC_KEY
       

      )
      .then(() => {
        feedbackMessage.value = 'Email sent successfully!';
        formData.value = { user_name: '', user_email: '', message: '' };
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
  