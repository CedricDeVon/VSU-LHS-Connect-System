<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-century-gothic" >
        <div class="bg-[#FFFEF1] rounded-2xl w-[800px] max-h-[90vh] flex flex-col relative" >
            <!-- Sticky Header Section -->
            <div class="sticky top-0 z-10">

                <!-- Close button -->

              <button @click="handleClose" 
                        class="absolute top-4 right-4 text-white hover:text-gray-200 z-20">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Title Bar -->
                <div class="bg-[#265630] pt-3 pb-1 rounded-t-2xl">
                    <h1 class="text-white text-2xl font-bold text-center">Send Email to Adviser</h1>
                </div>
            </div>

            <!--Fill-up Form-->
            <div class="m-4 ">
              <form @submit.prevent="sendEmail" >
                <div class="p-2">
                  <label class=" font-bold mr-2">To: </label>
                  <input type="email" v-model="formData.to_email" :placeholder="props.initialEmail" required 
                  class="border-1 w-2/3" />
                </div>
                <div class=" p-2">
                  <textarea class="w-full border-1 " v-model="formData.message" placeholder="Your Message" required ref="messageTextarea"  @input="autoExpand" @keydown="handleTab" ></textarea>
                </div>
                <!--I'll make this a popup soon hehe-->
                <div class="flex justify-self-center"><p v-if="feedbackMessage">{{ feedbackMessage }}</p></div>
               
                <div class="flex justify-end">
                  <button @click="$emit('close')" 
                      class=" bg-[#FF6161] hover:bg-[#B52B2B] text-white px-10 py-2 m-4 mr-0 rounded-md transition-colors">
                      Cancel
                  </button>
                  <button type="submit" class=" bg-[#728B78] hover:bg-[#265630] text-white px-7 py-2 m-4 rounded-md transition-colors" >Send Email</button>
                  
                </div>
                
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import emailjs from '@emailjs/browser';


const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  initialEmail: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close']);


const formData = ref({
  from_name: 'Ma\'am Mimi',
  to_email: props.initialEmail,
  message: ''
});

const feedbackMessage = ref('');

const messageTextarea = ref(null);
const autoExpand = () => {
      const textarea = messageTextarea.value;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // 200px is the max height
      }
      
    };

  const handleTab = (event) => {
  const textarea = messageTextarea.value;
  if (event.key === 'Tab' && textarea) {
    event.preventDefault();
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Set textarea value to: text before caret + tab + text after caret
    textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end);

    // Put caret at right position again
    textarea.selectionStart = textarea.selectionEnd = start + 1;

    // Trigger input event to update v-model
    textarea.dispatchEvent(new Event('input'));
  }
};

const handleClose = () => {
  emit('close');
};

onMounted(() => {

      autoExpand(); // Adjust height based on initial content
    
});

watch(() => props.initialEmail, (newEmail) => {
  formData.value.to_email = newEmail;
});

const sendEmail = async () => {
  try {
    const response = await fetch('/api/send-email'); 
   
    if (!response.ok) {
      throw new Error('Failed to fetch configuration');
    }
    const config = await response.json(); 
    
    const templateParams = {
      from_name: formData.value.from_name,
      to_email: formData.value.to_email,
      message: formData.value.message
    };

    await emailjs.send(
      config.emailServiceId,
      config.emailTemplateId,
      templateParams,
      config.emailPublicKey
    );

    alert('Email sent successfully!');
    emit('close');
  } catch (error) {
    console.error('Error sending email:', error);
    feedbackMessage.value = 'Failed to send email. Please try again.';
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}

@font-face {
    font-family: 'Century Gothic';
    src: url('/fonts/CenturyGothic.woff2') format('woff2'),
         url('/fonts/CenturyGothic.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.font-century-gothic {
    font-family: 'Century Gothic', sans-serif;
}
textarea:focus, input[type="email"]:focus {
  border-color: #728B78; /* Change border color on focus */
  outline: none; /* Ensure the focus outline is removed */
}


</style>