import { footer } from '~/assets/images/footer';
import { finalHeader } from '~/assets/images/finalHeader';

export const defineIncidentDoc = ({ reportType, incidentData, reportedBy, receivedBy }: any) => ({
  pageMargins: [72, 120, 72, 70],
  header: {
    image: finalHeader,
    width: 590,  
    height: 115,  
    alignment: 'center'
  },
  content: [
    { text: `${reportType}`, style: 'header', margin: [0, 0, 0, 30] },
    {
      table: {
        widths: ['30%', '70%'],
        headerRows: 0,
        body: [
          [
            { text: 'Name of People Involved:', style: 'label', border: [false, false, false, false] },
            { text: `${incidentData.data.peopleInvolved?.join(', ') || 'N/A'}`, style: 'content', border: [false, false, false, false] }
          ],
          [
            { text: 'Witness:', style: 'label', border: [false, false, false, false] },
            { text: `${incidentData.data.witness.join(', ') || 'N/A'}`, style: 'content', border: [false, false, false, false] }
          ],
          [
            { text: 'Date of Incident:', style: 'label', border: [false, false, false, false] },
            { text: `${incidentData.data.dateOfIncident || 'N/A'}`, style: 'content', border: [false, false, false, false] }
          ],
          [
            { text: 'Place of Incident:', style: 'label', border: [false, false, false, false] },
            { text: `${incidentData.data.placeOfIncident || 'N/A'}`, style: 'content', border: [false, false, false, false] }
          ],
          [
            { text: 'Things Involved:', style: 'label', border: [false, false, false, false] },
            { text: `${incidentData.data.thingsInvolved || 'N/A'}`, style: 'content', border: [false, false, false, false] }
          ],
        ]
      },
      layout: {
        hLineWidth: function (i, node) {
          return 0.5;
        },
        vLineWidth: function (i, node) {
          return 0;
        },
        hLineColor: function (i, node) {
          return '#cccccc';
        },
      }
    },
    { text: 'Narrative Report:', style: 'label', margin: [0, 15, 0, 5] },
    {
      text: `${incidentData.data.narrativeReport || 'N/A'}`,
      style: 'content',
      margin: [30, 0, 30, 10],
      alignment: 'justify'
    },
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }] },
    { text: 'Action Taken:', style: 'label', margin: [0, 15, 0, 5] },
    {
      text: `${incidentData.data.actionTaken || 'Pending'}`,
      style: 'content',
      margin: [30, 0, 30, 10],
      alignment: 'justify'
    },
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }] },
    { text: 'Reason for Action:', style: 'label', margin: [0, 15, 0, 5] },
    {
      text: `${incidentData.data.reasonOfAction || 'Pending'}`,
      style: 'content',
      margin: [30, 0, 30, 10],
      alignment: 'justify'
    },
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }] },
    { text: 'Additional Notes:', style: 'label', margin: [0, 15, 0, 5] },
    {
      text: `${incidentData.data.others || 'N/A'}`,
      style: 'content',
      margin: [30, 0, 30, 10],
      alignment: 'justify'
    },
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }] },
    {
      table: {
        widths: ['30%', '70%'],
        headerRows: 0,
        body: [
          [
            { text: 'Date Reported:', style: 'label', border: [false, false, false, false] },
            { text: `${incidentData.data.dateReported || 'N/A'}`, style: 'content', border: [false, false, false, false] }
          ],
          [
            { text: 'Last Modified:', style: 'label', border: [false, false, false, false] },
            { text: `${incidentData.data.lastModified || 'Not modified'}`, style: 'content', border: [false, false, false, false] }
          ],
          [
            { text: 'Status:', style: 'label', border: [false, false, false, false] },
            { text: `${incidentData.data.status || 'N/A'}`, style: 'content', border: [false, false, false, false] }
          ],
        ]
      },
      layout: {
        hLineWidth: function (i, node) {
          return 0.5;
        },
        vLineWidth: function (i, node) {
          return 0;
        },
        hLineColor: function (i, node) {
          return '#cccccc';
        },
      }
    },
    // Updated signature section with page break prevention
    {
      stack: [
        { text: '', margin: [0, 20] }, // Spacer
        {
          table: {
            widths: ['100%'],
            body: [
              [
                {
                  stack: [
                    { text: 'Reported By:', style: 'label', margin: [0, 0, 0, 5] },
                    { text: reportedBy, style: 'signature' },
                    { text: 'Adviser', style: 'position' },
                  ],
                  border: [false, false, false, false]
                }
              ],
              [
                {
                  stack: [
                    { text: 'Report Received By:', style: 'label', margin: [0, 20, 0, 5] },
                    { text: 'NOEMI ELISA L. OQUIAS', style: 'signature' },
                    { text: 'Guidance Facilitator', style: 'position' },
                  ],
                  border: [false, false, false, false]
                }
              ]
            ]
          },
          layout: {
            defaultBorder: false,
            paddingTop: function(i) { return 10; },
            paddingBottom: function(i) { return 10; }
          },
          margin: [30, 0, 0, 0],
          pageBreakInside: 'avoid' // Prevents signature section from breaking across pages
        }
      ]
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
    },
    signature: {
      fontSize: 11,
      bold: true,
      alignment: 'left',  // Change from 'center' to 'left'
      margin: [0, 0, 0, 5]
    },
    position: {
      fontSize: 10,
      italics: true,
      alignment: 'left',  // Change from 'center' to 'left'
      color: '#666666',
      margin: [0, 0, 0, 10]
    }
  },
  footer: (currentPage: any, pageCount: any) => {
    return [
      {
        image: footer,
        width: 480,
        alignment: 'center',
        margin: [0, 0, 0, 0]
      },
      {
        text: `FM-OOP-05                                    Rev.: 01                                    ${new Date().toLocaleDateString()}                                       Page ${currentPage} of ${pageCount}                                  Control Number:______`,
        alignment: 'justify',
        margin: [70, 0],
        fontSize: 7,
      },
    ];
  },
});

export const defineAnecdotalDoc = ({ studentData, anecdotalData, associatedReports }: any) => ({
  pageMargins: [72, 120, 72, 90],
  header: {
    image: finalHeader,
    width: 590,  
    height: 115,  
    alignment: 'center' 
  },
  content: [
    { text: 'ANECDOTAL REPORT', style: 'header', margin: [0, 0, 0, 0] },
    {
      table: {
        widths: ['30%', '70%'],
        headerRows: 0,
        body: [
          ['Student Name:', `${studentData.data.firstName || ''} ${studentData.data.middleName || ''} ${studentData.data.lastName || 'N/A'}`],
          ['Student ID:', studentData.id || 'N/A'],
          ['Academic Year:', anecdotalData.data.academicYear || 'N/A']
        ].map(row => [
          { text: row[0], style: 'label', border: [false, false, false, false] },
          { text: row[1], style: 'content', border: [false, false, false, false] }
        ])
      }
    },
    ...associatedReports.map((rep: any) => [
      {
        text: new Date(rep.data.datePrepared).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        style: 'subheader',
        margin: [0, 20, 0, 10],
        color: '#1f2937'
      },
      {
        table: {
          widths: ['30%', '70%'],
          headerRows: 0,
          body: [
            ['Date of Incident:', new Date(rep.data.dateOfIncident).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })],
            ['Purpose:', rep.data.purpose || 'N/A'],
            ['Witnesses:', rep.data.witnesses.join(', ') || 'N/A'],
            ['Place of Incident:', rep.data.placeOfIncident || 'N/A'],
            ['Things Involved:', rep.data.thingsInvolved || 'N/A'],
          ].map(row => [
            { text: row[0], style: 'label', border: [false, false, false, false] },
            { text: row[1], style: 'content', border: [false, false, false, false] }
          ])
        }
      },
      { text: 'Details:', style: 'label', margin: [0, 15, 0, 5] },
      { text: rep.data.details || 'N/A', style: 'content', margin: [30, 0, 30, 15] },
      { text: rep.data.isReportedByGuidance ? 'Remarks from the Guidance Office:' : 'Adviser\'s Remarks:', 
        style: 'label', margin: [0, 15, 0, 5] },
      { text: rep.data.remarks || 'N/A', style: 'content', margin: [30, 0, 30, 15] }
    ]).flat(),
    // Add signature section at the end of content array
    {
      stack: [
        { text: '', margin: [0, 20] }, // Spacer
        {
          table: {
            widths: ['100%'],
            body: [
              [
                {
                  stack: [
                    { text: 'Report Prepared By:', style: 'label', margin: [0, 0, 0, 5] },
                    { text: anecdotalData.data.preparedBy || 'N/A', style: 'signature' },
                    { text: 'Adviser', style: 'position' },
                  ],
                  border: [false, false, false, false]
                }
              ],
              [
                {
                  stack: [
                    { text: 'Report Received By:', style: 'label', margin: [0, 20, 0, 5] },
                    { text: 'NOEMI ELISA L. OQUIAS', style: 'signature' },
                    { text: 'Guidance Facilitator', style: 'position' },
                  ],
                  border: [false, false, false, false]
                }
              ]
            ]
          },
          layout: {
            defaultBorder: false,
            paddingTop: function(i) { return 10; },
            paddingBottom: function(i) { return 10; }
          },
          margin: [30, 0, 0, 0],
          pageBreakInside: 'avoid'
        }
      ]
    }
  ],
  styles: {
    header: { fontSize: 20, bold: true, alignment: 'center' },
    subheader: { fontSize: 15, bold: true },
    label: { bold: true, fontSize: 11, margin: [0, 10, 0, 10] },
    content: { fontSize: 11, margin: [0, 10, 0, 10] },
    signature: {
      fontSize: 11,
      bold: true,
      alignment: 'left',
      margin: [0, 0, 0, 5]
    },
    position: {
      fontSize: 10,
      italics: true,
      alignment: 'left',
      color: '#666666',
      margin: [0, 0, 0, 10]
    }
  },
  footer: {
    image: footer,
    width: 480,
    alignment: 'center',
    margin: [0, 10, 0, 0]
  }
});

export const defineCaseConferenceDoc = (data) => ({
  pageSize: 'A4',
  pageMargins: [72, 120, 72, 90],
  header: {
    image: finalHeader,
    width: 590,  
    height: 115,  
    alignment: 'center' 
  },
  content: [
    { text: 'CASE CONFERENCE FORM', style: 'header' },
    { text: '\n' }, // Add spacing

    // Student Info Table
    {
      style: 'infoTable',
      table: {
        widths: ['50%', '50%'],
        body: [
          [
            { text: 'Name of Student/s:', style: 'label' },
            { text: 'Grade & Section:', style: 'label' }
          ],
          [
            { text: data.data.studentName || 'N/A', style: 'content' },
            { text: data.data.gradeAndSection || 'N/A', style: 'content' }
          ],
          [
            { text: 'Date of Conference:', style: 'label' },
            { text: 'Circumstance:', style: 'label' }
          ],
          [
            { text: `${data.data.conferenceDate} - ${data.data.time}` || 'N/A', style: 'content' },
            { text: data.data.circumstance || 'N/A', style: 'content' }
          ]
        ]
      },
      layout: {
        hLineWidth: function(i) { return 0.5; },
        vLineWidth: function(i) { return 0.5; },
        hLineColor: function(i) { return '#aaaaaa'; },
        vLineColor: function(i) { return '#aaaaaa'; },
        paddingTop: function(i) { return 8; },
        paddingBottom: function(i) { return 8; }
      }
    },
    { text: '\n' }, // Add spacing

    // Main Content Sections
    {
      stack: [
        { text: 'DISCUSSION POINTS:', style: 'sectionHeader' },
        {
          text: data.data.discussions || 'N/A',
          style: 'contentBlock',
          margin: [20, 5, 20, 15]
        },

        { text: 'AGREEMENTS/ACTION PLAN:', style: 'sectionHeader' },
        {
          text: data.data.agreement || 'N/A',
          style: 'contentBlock',
          margin: [20, 5, 20, 15]
        },

        { text: 'REMARKS:', style: 'sectionHeader' },
        {
          text: data.data.remarks || 'N/A',
          style: 'contentBlock',
          margin: [20, 5, 20, 15]
        }
      ]
    },
    { text: '\n' }, // Add spacing

    // Signatures Section
    {
      columnGap: 10,
      columns: [
        {
          width: '*',
          stack: [
            { text: '_______________________', style: 'signature', alignment: 'center' },
            { text: 'Student\'s Signature over printed name', style: 'signatureSubLabel', alignment: 'center', bold: true },
          ]
        },
        {
          width: '*',
          stack: [
            { text: '_______________________', style: 'signature', alignment: 'center' },
            { text: 'Parent/Guardian\'s Signature over printed name', style: 'signatureSubLabel', alignment: 'center', bold: true },
          ]
        }
      ]
    },
    { text: '\n' },
    {
      columnGap: 10,
      columns: [
        {
          width: '*',
          stack: [
            { text: '_______________________', style: 'signature', alignment: 'center' },
            { text: 'DBGF\'s Signature over printed name', style: 'signatureSubLabel', alignment: 'center', bold: true },
          ]
        },
        {
          width: '*',
          stack: [
            { text: 'NOEMI ELISA L. OQUIAS', style: 'signature', alignment: 'center' },
            { text: 'Guidance Facilitator', style: 'signatureSubLabel', alignment: 'center' },
          ]
        }
      ]
    }
  ],
  styles: {
    header: {
      fontSize: 16,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 20]
    },
    infoTable: {
      margin: [0, 5, 0, 15]
    },
    sectionHeader: {
      fontSize: 12,
      bold: true,
      margin: [0, 10, 0, 5]
    },
    label: {
      fontSize: 11,
      bold: true,
      margin: [5, 0, 0, 0]
    },
    content: {
      fontSize: 11,
      margin: [5, 0, 0, 0]
    },
    contentBlock: {
      fontSize: 11,
      alignment: 'justify',
      lineHeight: 1.4
    },
    signature: {
      margin: [0, 30, 0, 5]
    },
    signatureLabel: {
      fontSize: 11,
      margin: [0, 0, 0, 2]
    },
    signatureSubLabel: {
      fontSize: 9,
      italics: true,
      color: '#666666'
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
});

