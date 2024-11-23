<template>
    <div class="flex h-screen bg-gray-100">
        <!-- <AdminSidebar /> -->
        <div class="flex-1 overflow-hidden">
            <!-- <AdminHeader /> -->
            <div class="p-8 pt-0 overflow-y-auto h-[calc(100vh-64px)]">
                <!-- Breadcrumb navigation -->
                <div class="mb-4">
                    <nav class="flex" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-3">
                            <li>
                                <NuxtLink :to="`/admin/incident/${adminViewStore.caseConferenceCaseConferenceReport.data.incidentId}`" class="text-gray-500 hover:text-gray-700">
                                    Incident Document
                                </NuxtLink>
                            </li>
                            <li>/</li>
                            <li class="text-gray-900">
                                Case Conference Document
                            </li>
                        </ol>
                    </nav>
                </div>

                <!-- Loading state -->
                <div v-if="loading" class="flex justify-center items-center h-[60vh]">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>

                <!-- Error state -->
                <div v-else-if="error" class="text-center text-red-600 mt-8">
                    {{ error }}
                </div>

                <!-- Conference document content -->
                <div v-else class="bg-white rounded-lg shadow-md p-6">
                    <div v-if="adminViewStore.caseConferenceCaseConferenceReport" class="space-y-6">
                        <!-- Header Info -->
                        <div class="flex justify-between items-start border-b pb-4">
                            <div class="space-y-1">
                                <h2 class="text-xl font-semibold text-gray-900">Case Conference Document</h2>
                                <p class="text-sm text-gray-600">
                                    Conference ID: {{ adminViewStore.caseConferenceCaseConferenceReport.id }}
                                </p>
                            </div>
                            <div class="flex space-x-3">
                                <button @click="downloadPDF"
                                    class="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                    Download PDF
                                </button>
                                <button @click="printDocument"
                                    class="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                                    Print
                                </button>
                            </div>
                        </div>

                        <!-- Conference Details -->
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <h3 class="text-sm font-medium text-gray-500">Student Information</h3>
                                <p class="mt-1 text-sm text-gray-900">{{ adminViewStore.getFullName(adminViewStore.caseConferenceStudent) }}</p>
                                <p class="text-sm text-gray-600">{{ adminViewStore.sectionGetGradeAndSection(adminViewStore.caseConferenceSection) }}</p>
                            </div>
                            <div>
                                <h3 class="text-sm font-medium text-gray-500">Conference Schedule</h3>
                                <p class="mt-1 text-sm text-gray-900">
                                    {{ formatDate(adminViewStore.caseConferenceCaseConferenceReport.data.conferenceDate) }}
                                </p>
                            </div>
                        </div>

                        <!-- PDF Preview -->
                        <div id="pdf-container" class="mt-6 border rounded-lg min-h-[60vh]">
                            <iframe id="pdf-viewer" class="w-full h-[70vh] border-none"></iframe>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { caseConference } from '~/data/caseconference'
pdfMake.vfs = pdfFonts.pdfMake.vfs
import AdminHeader from '~/components/Blocks/AdminHeader.vue'
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue'
import {footer} from '~/assets/images/footer'
import {headerImage} from '~/assets/images/sample-header'
import { useAdminViewStore } from '~/stores/views/adminViewStore'

const route = useRoute()
const loading = ref(true)
const error = ref(null)
const conferenceId = ref(route.params.id)
// console.log('E ', route.params)
const adminViewStore = useAdminViewStore();
await adminViewStore.updateCaseConference(conferenceId.value);

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const defineConferenceDoc = (data) => ({
    pageSize: 'A4',
    pageMargins: [72, 110, 72, 72],
    header: {
          image: headerImage,
          width: 600,
          height: 100,
          alignment: 'center',
          margin: [0, 10, 0, 0],
        },
    content: [
        { text: 'CASE CONFERENCE FORM', style: 'header' },

        // Student Info
        {
            columns: [
                {
                    text: 'Student\'s Name: ',
                    style: 'label',
                    width: 100
                },
                {
                    text: adminViewStore.getFullName(adminViewStore.caseConferenceStudent),
                    style: 'content'
                },
                {
                    text: [
                        { text: 'Grade & Section: ', style: 'label' },
                        { text: adminViewStore.sectionGetGradeAndSection(adminViewStore.caseConferenceSection), style: 'content' }
                    ],
                    alignment: 'right'
                }
            ]
        },

        // Main Content
        { text: '\nCircumstance:', style: 'label' },
        { text: adminViewStore.caseConferenceCaseConferenceReport.data.circumstance, style: 'content', margin: [10, 0, 0, 20] },

        { text: 'Discussions:', style: 'label' },
        { text: adminViewStore.caseConferenceCaseConferenceReport.data.discussions, style: 'content', margin: [10, 0, 0, 20] },

        { text: 'Agreement:', style: 'label' },
        { text: adminViewStore.caseConferenceCaseConferenceReport.data.agreement, style: 'content', margin: [10, 0, 0, 20] },

        { text: 'Remarks:', style: 'label' },
        { text: adminViewStore.caseConferenceCaseConferenceReport.data.remarks, style: 'content', margin: [10, 0, 0, 20] },

        // Signatures
        {
            components: {
                AdminHeader,
                AdminSidebar
            },
            columns: [
                {
                    stack: [
                        { text: '\n\n_______________________', style: 'signature' },
                        { text: 'Student\'s Signature', style: 'signatureLabel' }
                    ],
                    width: '*'
                },
                {
                    stack: [
                        { text: '\n\n_______________________', style: 'signature' },
                        { text: 'Parent\'s Signature', style: 'signatureLabel' }
                    ],
                    width: '*'
                }
            ],
            columnGap: 20
        }
    ],
    styles: {
        header1: {
            fontSize: 14,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 5]
        },
        header2: {
            fontSize: 12,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 5]
        },
        header3: {
            fontSize: 11,
            alignment: 'center',
            margin: [0, 0, 0, 20]
        },
        header: {
            fontSize: 14,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 30]
        },
        label: {
            fontSize: 11,
            bold: true
        },
        content: {
            fontSize: 11
        },
        signature: {
            alignment: 'center'
        },
        signatureLabel: {
            fontSize: 10,
            alignment: 'center'
        }
    }, 
    footer: (currentPage, pageCount) => {
          return [
            {
              image: footer,
              width: 480,
              alignment: 'center',
              margin: [0, 10, 0, 0]
            },
            {
              text: `FM-OOP-05                                    Rev.: 01                                    ${new Date().toLocaleDateString()}                                       Page ${currentPage} of ${pageCount}                                  Control Number:______`,
              alignment: 'justify',
              margin: [70, 0],
              fontSize: 7,
            },
          ];
        },
})

const displayPDF = () => {
    if (!adminViewStore.caseConferenceIncidentReport) return
    const docDefinition = defineConferenceDoc(adminViewStore.caseConferenceIncidentReport)
    pdfMake.createPdf(docDefinition).getBlob((blob) => {
        const url = URL.createObjectURL(blob)
        const viewer = document.getElementById('pdf-viewer')
        if (viewer) {
            viewer.src = url
        }
    })
}

const downloadPDF = () => {
    if (!adminViewStore.caseConferenceIncidentReport) return
    const docDefinition = defineConferenceDoc(adminViewStore.caseConferenceIncidentReport)
    pdfMake.createPdf(docDefinition).download(`${adminViewStore.caseConferenceCaseConferenceReport.id}_${adminViewStore.caseConferenceIncidentReport.id}.pdf`)
}

const printDocument = () => {
    if (!adminViewStore.caseConferenceIncidentReport) return
    const docDefinition = defineConferenceDoc(adminViewStore.caseConferenceIncidentReport)
    pdfMake.createPdf(docDefinition).print()
}

onMounted(async () => {
    try {
        loading.value = true
        // console.log('F ', conferenceId.value)
        // console.log('C',
        //     adminViewStore.caseConferenceIncidentReport,
        //     adminViewStore.caseConferenceCaseConferenceReport,
        //     adminViewStore.caseConferenceStudent,
        //     adminViewStore.caseConferenceSection);
        displayPDF()
        loading.value = false

        // const data = caseConference.find(conf => conf.caseConDocID === conferenceId.value)

        // if (!data) {
        //     throw new Error('Conference not found')
        // }

        // // Update the incidentId if needed
        // incidentId.value = data.incidentID || route.params.id
        // adminViewStore.caseConferenceIncidentReport = data

    } catch (err) {
        error.value = err.message || 'Failed to load conference data'
        loading.value = false
    }
})
</script>

<style scoped>
/* Add your styles here */
</style>