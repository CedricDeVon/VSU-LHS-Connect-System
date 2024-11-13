import { defineStore } from 'pinia'

export const studentAddedStore = defineStore('studentAddedStore', () => {
   const studentId = ref('');
    const firstName = ref('');
    const lastName = ref('');
    const middleName = ref('');
    const suffix = ref('');
    const gender = ref('');
    const address = ref('');
    const contactNum = ref('');
    const isEnrolled = ref(true);
    const incidentDocIDs = ref([]);
    const birthDate = ref('');
    const profilePic = ref('');

    return { 
        studentId,
        firstName,
        lastName,
        middleName,
        suffix,
        gender,
        address,
        contactNum,
        isEnrolled,
        incidentDocIDs,
        birthDate,
        profilePic
    };
  });
  