<script>
definePageMeta({
  middleware: ['authenticate-and-authorize-admin']
});

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { headerImage } from '~/assets/images/sample-header';
import { footer } from '~/assets/images/footer';
import AdminSidebar from '~/components/Blocks/AdminSidebar.vue';
import AdminHeader from '~/components/Blocks/AdminHeader.vue';
import { useAdminViewStore } from '~/stores/views/adminViewStore';


export default {
    components: {
        AdminSidebar,
        AdminHeader
    },

    data() {
        return {
            adminViewStore: useAdminViewStore()
        };
    },

    async mounted() {
        await this.adminViewStore.updateAnecdote(this.$route.params.id);
        this.displayPDF();
    },

    computed: {
        defineAnecdotalDoc() {
            // Get associated reports
            const associatedReports = this.adminViewStore.anecdoteAnecdotalReport.data.reportIds;

            // Create content array for the document
            const content = [
                { text: 'ANECDOTAL REPORT', style: 'header', margin: [0, 0, 0, 30] },
                {
                    table: {
                        widths: ['30%', '70%'],
                        headerRows: 0,
                        body: [
                            [
                                { text: 'Student Name:', style: 'label', border: [false, false, false, false] },
                                { text: `${this.adminViewStore.anecdoteStudent.data.firstName || ''} ${this.adminViewStore.anecdoteStudent.data.middleName || ''} ${this.adminViewStore.anecdoteStudent.data.lastName || ''}`, style: 'content', border: [false, false, false, false] }
                            ],
                            [
                                { text: 'Student ID:', style: 'label', border: [false, false, false, false] },
                                { text: this.adminViewStore.anecdoteStudent.id, style: 'content', border: [false, false, false, false] }
                            ],
                            [
                                { text: 'Academic Year:', style: 'label', border: [false, false, false, false] },
                                { text: this.adminViewStore.anecdoteAnecdotalReport.data.schoolYear, style: 'content', border: [false, false, false, false] }
                            ],
                            [
                                { text: 'Prepared By:', style: 'label', border: [false, false, false, false] },
                                { text: this.adminViewStore.anecdoteAnecdotalReport.data.preparedBy, style: 'content', border: [false, false, false, false] }
                            ]
                        ]
                    }
                }
            ];

            // Add each report as a section
            associatedReports.forEach((rep, index) => {
                content.push(
                    { text: `Report ${index + 1}`, style: 'subheader', margin: [0, 20, 0, 10] },
                    {
                        table: {
                            widths: ['30%', '70%'],
                            headerRows: 0,
                            body: [
                                [
                                    { text: 'Report ID:', style: 'label', border: [false, false, false, false] },
                                    { text: rep.id, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Date of Incident:', style: 'label', border: [false, false, false, false] },
                                    { text: rep.data.dateOfIncident, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Date Prepared:', style: 'label', border: [false, false, false, false] },
                                    { text: rep.data.datePrepared, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Purpose:', style: 'label', border: [false, false, false, false] },
                                    { text: rep.data.purpose, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Witnesses:', style: 'label', border: [false, false, false, false] },
                                    { text: rep.data.witnesses.join(', '), style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Place of Incident:', style: 'label', border: [false, false, false, false] },
                                    { text: rep.data.placeOfIncident, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Things Involved:', style: 'label', border: [false, false, false, false] },
                                    { text: rep.data.thingsInvolved, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Details:', style: 'label', border: [false, false, false, false] },
                                    { text: rep.data.details, style: 'content', border: [false, false, false, false] }
                                ],
                                [
                                    { text: 'Adviser Remarks:', style: 'label', border: [false, false, false, false] },
                                    { text: rep.data.adviserRemarks, style: 'content', border: [false, false, false, false] }
                                ]
                            ]
                        }
                    }
                );
            });

            return {
                pageMargins: [72, 120, 72, 90],
                header: {
                    image: headerImage,
                    width: 600,
                    height: 100,
                    alignment: 'center',
                    margin: [0, 10, 0, 0],
                },
                content: content,
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        alignment: 'center',
                    },
                    subheader: {
                        fontSize: 14,
                        bold: true,
                        decoration: 'underline'
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
        displayPDF() {
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