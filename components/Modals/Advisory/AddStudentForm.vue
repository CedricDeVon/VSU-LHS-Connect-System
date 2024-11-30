<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div class="w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden transform transition-all">
            <!-- Header -->
            <div class="bg-green-700 px-6 py-4">
                <h2 class="text-2xl font-bold text-white">Add Student to Advisory</h2>
            </div>

            <!-- Initial Selection -->
            <div v-if="initPreparation" class="p-6 space-y-6">
                <!-- Student Type Selection -->
                <div class="space-y-4">
                    <label class="text-lg font-semibold text-gray-700">Type of Student/s:</label>
                    <div class="grid grid-cols-2 gap-4">
                        <button 
                            @click="selectStudentType('newStudent')"
                            :class="[
                                'p-4 rounded-lg border-2 transition-all duration-200',
                                selectedStudentType === 'newStudent'
                                    ? 'border-green-600 bg-green-50 text-green-700'
                                    : 'border-gray-200 hover:border-green-400 hover:bg-green-50'
                            ]"
                        >
                            <div class="font-semibold">New Student</div>
                            <div class="text-sm text-gray-500">Add a first-time student</div>
                        </button>
                        <button 
                            @click="selectStudentType('continuingStudent')"
                            :class="[
                                'p-4 rounded-lg border-2 transition-all duration-200',
                                selectedStudentType === 'continuingStudent'
                                    ? 'border-green-600 bg-green-50 text-green-700'
                                    : 'border-gray-200 hover:border-green-400 hover:bg-green-50'
                            ]"
                        >
                            <div class="font-semibold">Continuing Student</div>
                            <div class="text-sm text-gray-500">Add an existing student</div>
                        </button>
                    </div>
                </div>

                <!-- Adding Type Selection (shown only for new students) -->
                <div v-if="selectedStudentType === 'newStudent'" class="space-y-4">
                    <label class="text-lg font-semibold text-gray-700">Method of Adding:</label>
                    <div class="grid grid-cols-2 gap-4">
                        <button 
                            @click="selectAddingType('singleAdding')"
                            :class="[
                                'p-4 rounded-lg border-2 transition-all duration-200',
                                selectedAddingType === 'singleAdding'
                                    ? 'border-green-600 bg-green-50 text-green-700'
                                    : 'border-gray-200 hover:border-green-400 hover:bg-green-50'
                            ]"
                        >
                            <div class="font-semibold">Individual Adding</div>
                            <div class="text-sm text-gray-500">Add one student at a time</div>
                        </button>
                        <button 
                            @click="selectAddingType('bulkAdding')"
                            :class="[
                                'p-4 rounded-lg border-2 transition-all duration-200',
                                selectedAddingType === 'bulkAdding'
                                    ? 'border-green-600 bg-green-50 text-green-700'
                                    : 'border-gray-200 hover:border-green-400 hover:bg-green-50'
                            ]"
                        >
                            <div class="font-semibold">Bulk Adding</div>
                            <div class="text-sm text-gray-500">Upload multiple students via CSV</div>
                        </button>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end space-x-3 pt-4">
                    <button @click="$emit('close')" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button 
                        @click="nextClick"
                        class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>

            <!-- Single New Student Form -->
            <div v-if="showSingleNewStudentForm" class="p-6">
                <div class="max-w-2xl mx-auto space-y-6">
                    <!-- Profile Image -->
                    <div class="flex justify-center">
                        <img src="~/assets/icons/default-user.png" alt="user profile" class="h-32 w-32 rounded-full border-4 border-gray-200">
                    </div>

                    <!-- Form Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700">Student ID</label>
                            <input v-model="store.studentId" type="text" class="form-input w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200">
                        </div>

                        <!-- Name Fields -->
                        <div class="space-y-2 md:col-span-2">
                            <label class="text-sm font-medium text-gray-700">Student's Full Name</label>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <input v-model="store.firstName" type="text" placeholder="First Name" class="form-input rounded-lg border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200">
                                <input v-model="store.lastName" type="text" placeholder="Last Name" class="form-input rounded-lg border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200">
                                <input v-model="store.suffix" type="text" placeholder="Suffix" class="form-input rounded-lg border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200">
                            </div>
                        </div>

                        <!-- Other Fields -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700">Birthdate</label>
                            <UiVeeDatepicker v-model="store.birthDate" placeholder="MM/DD/YYYY" class="form-input w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"/>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700">Sex at Birth</label>
                            <select v-model="store.gender" class="form-select w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200">
                                <option value="" disabled selected hidden>Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div class="space-y-2 md:col-span-2">
                            <label class="text-sm font-medium text-gray-700">Address</label>
                            <input v-model="store.address" type="text" class="form-input w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200" placeholder="Enter Student Address">
                        </div>
                        <div class="space-y-2 md:col-span-2">
                            <label class="text-sm font-medium text-gray-700">Contact Number</label>
                            <input v-model="store.contactNum" type="text" class="form-input w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200" placeholder="Enter Contact Number">
                        </div>

                        <!-- Action Buttons -->
                        <div class="md:col-span-2 flex justify-end space-x-3 pt-4">
                            <button @click="handleBack" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                Back
                            </button>
                            <button @click="addStudentClick" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                Add Student
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Other Forms -->
            <div v-if="showSingleContStudentForm || showBulkNewStudentForm" class="relative h-[600px] overflow-visible">
                <div v-if="showSingleContStudentForm">
                    <UnEnrolledStudents @close="$emit('close')"/>
                </div>
                <div v-if="showBulkNewStudentForm">
                    <StudentCSVUploadModal @close="$emit('close')"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch, defineEmits } from 'vue';
import { studentAddedStore } from '~/stores/studentAdded';
import UnEnrolledStudents from './UnEnrolledStudents.vue';
import StudentCSVUploadModal from './StudentCSVUploadModal.vue';
import { section } from '~/data/section';
import { sectionStore } from '~/stores/section';

export default {
    name: 'AddStudentForm',
    components: { UnEnrolledStudents, StudentCSVUploadModal },
    props: {
        AdviserID: {
            type: String,
            required: true,
        },
    },
    setup(props, { emit }) {
        const secStore = sectionStore();
        const store = studentAddedStore();
        const initPreparation = ref(true);
        const showSingleNewStudentForm = ref(false);
        const showSingleContStudentForm = ref(false);
        const showBulkNewStudentForm = ref(false);
        const showBulkContStudentForm = ref(false);
        const selectedStudentType = ref('');
        const hoveredStudentType = ref('');
        const selectedAddingType = ref('');
        const hoveredAddingType = ref('');

        const nextClick = () => {
            if (selectedStudentType.value === '') {
                alert('Please select a student type and adding type');
                return;
            }
            if (selectedAddingType.value === 'singleAdding' && selectedStudentType.value === 'newStudent') {
                showSingleNewStudentForm.value = true;
                initPreparation.value = false;
                return;
            }
            if (selectedStudentType.value === 'continuingStudent') {
                showSingleContStudentForm.value = true;
                initPreparation.value = false;
                return;
            }
            if (selectedAddingType.value === 'bulkAdding' && selectedStudentType.value === 'newStudent') {
                showBulkNewStudentForm.value = true;
                initPreparation.value = false;
                return;
            } else {
                alert('Please select a student adding type');
            }
        };

        const handleBack = () => {
            showSingleNewStudentForm.value = false;
            showSingleContStudentForm.value = false;
            showBulkNewStudentForm.value = false;
            showBulkContStudentForm.value = false;
            initPreparation.value = true;
        };

        const selectStudentType = (box) => {
            selectedStudentType.value = box;
        };

        const hoverStudentType = (box) => {
            hoveredStudentType.value = box;
        };

        const selectAddingType = (box) => {
            selectedAddingType.value = box;
        };

        const hoverAddingType = (box) => {
            hoveredAddingType.value = box;
        };

        const addStudentClick = () => {
            try {
                store.AdviserId = props.AdviserID;
                const studentData = store.getStudentData();
                const newStudent = {
                    studentId: studentData.studentId,
                    firstName: studentData.firstName,
                    lastName: studentData.lastName,
                    suffix: studentData.suffix,
                    birthDate: studentData.birthDate,
                    gender: studentData.gender,
                    address: studentData.address,
                    contactNum: studentData.contactNum
                };

                const sec = secStore.section;
                console.log(sec);
                console.log(newStudent);
                store.resetAllData();
                alert('Student added successfully');
                emit('close');
            } catch (error) {
                alert('Something went wrong. Please try refreshing the page.');
                return;
            }
        };

        return {
            addStudentClick,
            emit,
            store,
            initPreparation,
            showSingleNewStudentForm,
            showSingleContStudentForm,
            showBulkNewStudentForm,
            showBulkContStudentForm,
            selectedStudentType,
            hoveredStudentType,
            selectedAddingType,
            hoveredAddingType,
            nextClick,
            handleBack,
            selectStudentType,
            hoverStudentType,
            selectAddingType,
            hoverAddingType,
        };
    },
};
</script>

<style scoped>
.form-input {
    @apply w-full px-4 py-2 text-gray-700 transition duration-200 ease-in-out;
}

.form-select {
    @apply w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500;
}

/* Remove old styles and keep only transitions if needed */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>