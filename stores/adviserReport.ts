import { defineStore } from 'pinia'
import { TimeConverters } from '~/library/timeConverters/timeConverters';

export const adviserReportStore  = defineStore('adviserReportStore', () => {
    const initialDocID = ref('');
    const reportIDRef = ref('');
    const studentId = ref('');
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
    const others = ref('');
    const reasonOfAction = ref('');
    const actionTaken = ref('');

    const getAllData = () => {
        return {
            reportIDRef : reportIDRef.value,
            reportedBY : reportedBY.value,
            studentId : studentId.value,
            peopleInvolved : `${peopleInvolved.value}`.split(','),
            witness : witness.value,
            dateOfIncident : TimeConverters.dateConverter.convert(dateOfIncident.value).data,
            placeOfIncident : placeOfIncident.value,
            thingsInvolved : thingsInvolved.value,
            narrativeReport :narrativeReport.value,
            dateReported : TimeConverters.dateConverter.convert(dateReported.value).data,
            status : status.value,
            isDraft :isDraft.value,
            academicYear : academicYear.value,
            others : others.value,
            reasonOfAction : reasonOfAction.value,
            actionTaken: actionTaken.value
        };
    }

    function resetAllData() {
         reportIDRef.value = '',
         reportedBY.value = '',
         peopleInvolved.value = [],
         witness.value = [],
         studentId.value = '';
         dateOfIncident.value = '',
         placeOfIncident.value = '',
         thingsInvolved.value = '',
         narrativeReport.value = '',
         dateReported.value = (new Date()).toISOString(),
         status.value = 'Unread',
         isDraft.value = true,
         academicYear.value = ''
         others.value = ''
         reasonOfAction.value = ''
         actionTaken.value = ''
    }


    return{
        actionTaken,
        reasonOfAction,
        initialDocID,
        reportIDRef,
        reportedBY,
        studentId,
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
        resetAllData,
        others
    }
})

