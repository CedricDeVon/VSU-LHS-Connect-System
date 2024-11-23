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
    const contactNumber = ref('');
    const isEnrolled = ref(true);
    const incidentDocIDs = ref([]);
    const birthDate = ref('');
    const profilePicture = ref('default.png');


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
            contactNumber : contactNumber.value,
            isEnrolled : isEnrolled.value,
            incidentDocIDs : incidentDocIDs.value,
            birthDate : birthDate.value,
            profilePicture : profilePicture.value
        };
    }

    function getAllData() {
        return {
            studentId: studentId.value,
            adviserId: '',
            sectionId: '',
            firstName: firstName.value,
            lastName: lastName.value,
            middleName: middleName.value,
            suffix: suffix.value,
            gender: gender.value,
            address: address.value,
            contactNumber: contactNumber.value,
            isEnrolled: isEnrolled.value,
            birthDate: convertDate(birthDate.value),
            profilePicture: profilePicture.value
        }
    }

    function convertDate(value: any) {
        const date = new Date(value);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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
        contactNumber.value ='',
        isEnrolled.value = true,
        incidentDocIDs.value = [],
        birthDate.value = '',
        profilePicture.value =''
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
        contactNumber,
        isEnrolled,
        incidentDocIDs,
        birthDate,
        profilePicture,
        getStudentData,
        resetAllData,
        getAllData,
        convertDate
    };
  });
  