import { defineStore } from 'pinia'

export const sectionStore = defineStore('sectionStore', () => {
    const section = ref({
        id: '',
        sectionName: '',
        adviserId: '',
        sectionPopulation: '',
        sectionStudents: [],
        sectionLevel: '',
        sectionSchoolYear: ''
    });
    




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
    }

    return { 
        section,
        resetAllData
    };
});