<script setup lang="ts">

const { handleFileInput, files } = useFileStorage()

const imageSubmit = async () => {
    // const response = await $fetch('/api/files', {
    //     method: 'POST',
    //     body: {
    //         files: files.value
    //     }
    // })
    // console.log(response);
}

</script>

<template>
  <div>
    <!-- <button @click=test>Test Me</button> -->
    <!-- <input type="file" @input="handleFileInput" />
    <button @click="imageSubmit">imageSubmit</button>
    <img id="target" src="" alt="demo" /> -->
  </div>
</template>
