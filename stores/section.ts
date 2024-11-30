import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSectionStore = defineStore('sectionStore', () => {
    const section = ref({
        id: '',
        sectionName: '',
        adviserId: '',
        sectionStudents: [],
        sectionPopulation: '',
        sectionLevel: '',
        sectionSchoolYear: ''
    });

    const setSectionData = (data) => {
        section.value = { ...section.value, ...data };
        section.value.sectionPopulation = data.sectionStudents.length;
    };

    const resetAllData = () => {
        section.value = {
            id: '',
            sectionName: '',
            adviserId: '',
            sectionPopulation: '',
            sectionStudents: [],
            sectionLevel: '',
            sectionSchoolYear: ''
        };
    };

    return { 
        section,
        setSectionData,
        resetAllData
    };
    
}
);