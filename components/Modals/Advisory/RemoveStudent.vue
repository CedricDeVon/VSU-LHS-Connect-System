<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-century-gothic" >
        <div>
            <div class="flex justify-center items-center h-screen">
                <div class="bg-white w-full h-1/3 rounded-lg shadow-lg">
                    <div class="flex justify-between items-center px-5 py-3 border-b-2 border-lime-950">
                        <h1 class="text-lg font-bold">Remove Student</h1>
                        <button @click="closeModal" class="text-lg font-bold">X</button>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-lg pt-8 p-5">Are you sure you want to<span class="font-bold"> remove student {{ student.studentId }}</span> from your advisory?</p>
                        <div class="flex justify-center items-center mt-10">
                            <button @click="removeStudent" class="bg-red-500 text-white px-10 py-2 rounded-lg">Yes</button>
                            <button @click="closeModal" class="bg-green-500 text-white px-10 py-2 rounded-lg ml-5">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { useAdviserViewStore } from "~/stores/views/adviserViewStore";

export default {
    emits: ['close', 'remove-student'],
    props: {
        student: {
            type: Object,
            required: true
        },
        section: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            adviserViewStore: useAdviserViewStore()
        }
    },

    methods: {
        closeModal() {
            this.$emit('close');
        },

       async removeStudent() {
            await this.adviserViewStore.removeStudent(this.student);
            await this.adviserViewStore.updateAdvisoryView();

            this.closeModal();
        }
    }
}
</script>

 