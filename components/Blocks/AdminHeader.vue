<template>
    <header class="flex justify-end items-center p-4">
        <div class="flex items-center gap-5">
          <img loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/28ac4a43bf80933a5cd7ae9089be6c5d7b9dae50c8259bbef6892eb66f590acf?placeholderIfAbsent=true&apiKey=a61ecd0d5bec4c4f94bc2ce5eda3f7bc"
            alt="User profile" class="w-8 object-contain aspect-square hover:scale-110 cursor-pointer" />
            <button @click="goToLogin"
          class="logout-button px-7 py-3 rounded-lg bg-728B78 text-white hover:bg-neutral-600"
          aria-label="Log out">
          Log out
        </button>
        </div>
      </header>
</template>

<style scoped>

.bg-728B78 {
  background-color: #728B78;
}

.bg-728B78:hover {
  background-color: #556859;
}
.logout-button {
  font-size: 0.875rem;
  font-family: 'Century Gothic', sans-serif;
}
</style>