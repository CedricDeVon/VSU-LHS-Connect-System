import { defineStore } from 'pinia'

export const studentAddedStore = defineStore('studentAddedStore', () => {
    const AdviserId = ref('');
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


    const getStudentData = () => {
        return{
            AdviserId : AdviserId.value,
            studentId : studentId.value,
            firstName : firstName.value,
            lastName : lastName.value,
            middleName : middleName.value,
            suffix : suffix.value,
            gender : gender.value,
            address : address.value,
            contactNum : contactNum.value,
            isEnrolled : isEnrolled.value,
            incidentDocIDs : incidentDocIDs.value,
            birthDate : birthDate.value,
            profilePic : profilePic.value
        };
    }

    function resetAllData() {
        AdviserId.value = '',
        studentId.value = '',
        firstName.value = '',
        lastName.value = '',
        middleName.value = '',
        suffix.value = '',
        gender.value ='',
        address.value = '',
        contactNum.value ='',
        isEnrolled.value = true,
        incidentDocIDs.value = [],
        birthDate.value = '',
        profilePic.value =''
    }

    return { 
        AdviserId,
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
        profilePic,
        getStudentData,
        resetAllData
    };
  });
  