import { defineStore } from 'pinia'

export const adviserReportStore  = defineStore('adviserReportStore', () => {
    const initialDocID = ref('');
    const reportIDRef = ref('');
    const reportedBY = ref('');
    const peopleInvolved = ref([]);
    const witness = ref([]);
    const dateOfIncident = ref('');
    const placeOfIncident = ref('');
    const thingsInvolved = ref('');
    const narrativeReport = ref('');
    const dateReported = ref((new Date()).toISOString());
    const status = ref('Unread');
    const isDraft = ref(true);
    const academicYear = ref('');

    const getAllData = ()=> {
        return{
            initialDocID : initialDocID.value,
            reportIDRef : reportIDRef.value,
            reportedBY : reportedBY.value,
            peopleInvolved : peopleInvolved.value,
            witness : witness.value,
            dateOfIncident : dateOfIncident.value,
            placeOfIncident : placeOfIncident.value,
            thingsInvolved : thingsInvolved.value,
            narrativeReport :narrativeReport.value,
            dateReported : dateReported.value,
            status : status.value,
            isDraft :isDraft.value,
            academicYear : academicYear.value
        };
    }

    function resetAllData() {
         reportIDRef.value = '',
         reportedBY.value = '',
         peopleInvolved.value = [],
         witness.value = [],
         dateOfIncident.value = '',
         placeOfIncident.value = '',
         thingsInvolved.value = '',
         narrativeReport.value = '',
         dateReported.value = (new Date()).toISOString(),
         status.value = 'Unread',
         isDraft.value = true,
         academicYear.value = ''
    }


    return{
        initialDocID,
        reportIDRef,
        reportedBY,
        peopleInvolved,
        witness,
        dateOfIncident,
        placeOfIncident,
        thingsInvolved,
        narrativeReport,
        dateReported,
        status,
        isDraft,
        academicYear,
        getAllData,
        resetAllData
    }

})