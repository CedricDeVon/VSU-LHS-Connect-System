<template>

  <!--This modal is open for designing
  since I only test this if it can really accept 
  the necessary data for emailing the approved advisers purposes-->

    <div class=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-7 pb-2">
            <h1 class="text-2xl font-bold text-center text-black">Account was approved!</h1>
            <h3>{{ approvedEmail }}</h3>
            <h3>{{ adviserName }}</h3>
            <h3>{{ adviserID }}</h3>
            <h3>{{ adviserSection }}</h3>
            <div class="p-2 pt-0 flex justify-center">
                    <button @click="$emit('close')" 
                            class="bg-[#728B78] hover:bg-[#265630] text-white px-8 py-2 rounded-md transition-colors">
                        Okay Fine
                    </button>
              </div>
        </div>
    </div>
</template>
<script setup>
  import emailjs from '@emailjs/browser';
  //import { defineProps, onMounted, ref, defineEmits } from 'vue';
   const props = defineProps({
     show: {
       type: Boolean,
       default: false
     },
     approvedEmail: {
       type: String,
       default: ''
     },
     adviserName: {
       type: String,
       default: ''
     },
     adviserID: {
       type: String,
       default: ''
     },
     adviserSection: {
       type: String,
       default: ''
     }
   });

   //Removing this comment will make the function work
   //careful with this as this will send automatically when mounted or specifically when approving an adviser
   //careful because we have a LIMITED EMAIL SENDING W/ 200 PER MONTH I GUESS HAHAHAHAHA 
   
   /*onMounted(() => {
      sendEmail();  
    });*/

   const sendEmail = async () => {
    try {
      const response = await fetch('/api/approval-email'); 
    
      if (!response.ok) {
        throw new Error('Failed to fetch configuration');
      }
      const config = await response.json(); 
      
      const templateParams = {
        to_email: props.approvedEmail,
        adviserName: props.adviserName,
        adviserID: props.adviserID,
        adviserSection: props.adviserSection
      };

      await emailjs.send(
        config.emailServiceId,
        config.emailTemplateId,
        templateParams,
        config.emailPublicKey
      );

      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
};

</script>