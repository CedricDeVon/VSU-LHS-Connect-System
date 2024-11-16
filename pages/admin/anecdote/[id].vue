<template>
    <div class="flex h-screen">
        <AdminSidebar />
        <div class="general flex-grow">
            <AdminHeader />
            <div class="p-8 pt-0 general min-h-screen max-h-screen flex flex-col w-full">
                <div class="flex justify-center items-start w-full h-full pt-4">
                    <div id="incident-display-container" class="w-[90%]">
                        <!-- The PDF will be displayed here -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { headerImage } from '~/assets/images/sample-header';
import { footer } from '~/assets/images/footer';
import { anecdotalReport } from '~/data/anecdotal';
import { student } from '~/data/student';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
    components: {
        AdminSidebar,
        AdminHeader
    },

    data() {
        return {
            anecReport: null,
            studentData: null,
        };
    },

    async created() {
        const studentId = this.$route.params.id;
        await this.initData(studentId);
        this.displayPDF();
    },

    computed: {
        defineAnecdotalDoc() {
            if (!this.anecReport || !this.studentData) return null;

            return {
                pageMargins: [72, 120, 72, 90],
                header: {
                    image: headerImage,
                    width: 600,
                    height: 100,
                    alignment: 'center',
                    margin: [0, 10, 0, 0],
                },
                content: [
                    { text: 'ANECDOTAL REPORT', style: 'header', margin: [0, 0, 0, 30] },
                    {
                        table: {
                            widths: ['30%', '70%'],
                            headerRows: 0,
                            body: [
                                [
                                    { text: 'Student Name:', style: 'label', border: [false, false, false, false] },
                                    { text: `${this.studentData.firstName} ${this.studentData.middleName} ${this.studentData.lastName}`, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'People Involved:', style: 'label', border: [false, false, false, false] },
                                    { text: this.anecReport.peopleInvolved, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Witness:', style: 'label', border: [false, false, false, false] },
                                    { text: this.anecReport.witness, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Date of Incident:', style: 'label', border: [false, false, false, false] },
                                    { text: this.anecReport.dateOfIncident, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Purpose:', style: 'label', border: [false, false, false, false] },
                                    { text: this.anecReport.purpose, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Place of Incident:', style: 'label', border: [false, false, false, false] },
                                    { text: this.anecReport.placeOfIncident, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Things Involved:', style: 'label', border: [false, false, false, false] },
                                    { text: this.anecReport.thingsInvolved, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Details:', style: 'label', border: [false, false, false, false] },
                                    { text: this.anecReport.details, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Remarks:', style: 'label', border: [false, false, false, false] },
                                    { text: this.anecReport.remarks, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Date Prepared:', style: 'label', border: [false, false, false, false] },
                                    { text: this.anecReport.datePrepared, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Prepared By:', style: 'label', border: [false, false, false, false] },
                                    { text: this.anecReport.preparedBy, style: 'content', border: [false, false, false, false] }
                                ]
                            ]
                        }
                    }
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        alignment: 'center',
                    },
                    label: {
                        bold: true,
                        fontSize: 11,
                        margin: [0, 10, 0, 10],
                    },
                    content: {
                        fontSize: 11,
                        margin: [0, 10, 0, 10],
                    }
                },
                footer: {
                    image: footer,
                    width: 480,
                    alignment: 'center',
                    margin: [0, 10, 0, 0]
                }
            };
        }
    },

    methods: {
        async initData(studentId) {
            // Find student data
            this.studentData = student.find(s => s.studentId === studentId);
            if (!this.studentData) return;

            // Find anecdotal report
            this.anecReport = anecdotalReport.find(
                report => report.anecdotalDocID === this.studentData.anecdotalDocID
            );
        },

        displayPDF() {
            if (!this.defineAnecdotalDoc) return;

            pdfMake.createPdf(this.defineAnecdotalDoc).getBlob((blob) => {
                const url = URL.createObjectURL(blob);

                // Display in an iframe
                const iframe = document.createElement('iframe');
                iframe.style.width = '100%';
                iframe.style.height = '80vh';
                iframe.style.border = 'none';
                iframe.src = url;

                // Clear previous content and append new iframe
                const container = document.getElementById('incident-display-container');
                container.innerHTML = '';
                container.appendChild(iframe);
            });
        }
    }
};
</script>

<style scoped>
#incident-display-container {
    min-height: 80vh;
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

iframe {
    border-radius: 0.5rem;
}
</style>