<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-century-gothic" >
        <div>
            <div class="flex justify-center items-center h-screen">
                <div class="bg-white w-full h-fit rounded-lg shadow-lg">
                    <div class="flex justify-between items-center px-5 py-3 border-b-2 border-lime-950">
                        <h1 class="text-lg font-bold">RESET ACADEMIC YEAR</h1>
                        <button @click="cancelReset" class="text-lg font-bold">X</button>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-lg pt-8 p-5">Are you sure you want to set the <span class="font-bold">Academic Year</span> to <span class="font-bold">2025-2026</span> ?</p>
                        <p class="text-lg p-5"> Resetting would mean removing all students in their respective sections</p>
                        <div class="flex justify-center items-center my-7">
                            <button @click="proceedReset" class="bg-red-500 text-white px-10 py-2 rounded-lg">Yes</button>
                            <button @click="cancelReset" class="bg-green-500 text-white px-10 py-2 rounded-lg ml-5">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </template>
<script>

export default {
    emits: ['close', 'reset-academic-year'],

    methods: {
        cancelReset() {
            this.$emit('close');
        },
       async proceedReset() {
            console.log('Resetting Academic Year');
            alert('Academic Year has been reset');
            this.$emit('reset-academic-year');  
           
        }
    }
}
</script>

 