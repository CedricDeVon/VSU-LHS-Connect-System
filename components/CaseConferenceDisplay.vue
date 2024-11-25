<!--:this'll automatically display an iframe of document when created
:this needs only a 'caseConDocID' as a parameter or props 
didn't define emit here yet-->

<template>
    <div id="case-display-container">
      <!-- The iframe will be appended here -->
    </div>
  </template>
  
  <script>
  import pdfMake from 'pdfmake/build/pdfmake';
  import * as pdfFonts from 'pdfmake/build/vfs_fonts';
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
 // import { headerImage } from '~/assets/images/sample-header';
 // import { footer } from '~/assets/images/footer';
  import { incidentReport } from '~/data/incident';
  import { caseConference } from '~/data/caseconference';
  import { Admin } from '~/data/admin';
  import { initialReport } from '~/data/initialReport';
  import { adviser } from '~/data/adviser';
import { _fontFamily } from '#tailwind-config/theme';
  
  
  export default {
  
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      caseConDocID: {
        type: String,
        required: true,
      },
    },

    data() {
      return {
      caseConference:{},
      Type: 'Case Conference Form',
   
      };
    },
  
    async created(){
      await this.initCaseConference(this.caseConDocID);
      this.displayPDF();
  
    },
  
    computed: {
  
      defineCaseConferenceDoc(){
        return {
        pageSize: 'A4',
        pageMargins: [72,110,72,72],

        content: [
  
          { text: 'VISAYAS STATE UNIVERSITY', style: 'header1', absolutePosition: {x: 85, y: 50} },
          { text: 'UNIVERSITY STUDENT SERVICES OFFICE', style: 'header2', absolutePosition: {x: 73, y: 65} },   
          { text: 'Guidance and Counseling Unit', style: 'header3', absolutePosition:{x:82, y:82} },
          { text: `${this.Type}`, style: 'header'},
           
          {
          columns:
          [
            {
              text: 'Student\'s Name: ', style: 'header4', width: 100
            },
            {
               text: `${this.caseConference.studentName}`, style: 'content', width: 100
            },
            {
              text: [
                  { text: 'Grade & Section:   ', style: 'header4' },
                  { text: `${this.caseConference.gradeAndSection}`, style: 'content' }
              ],
              alignment: 'right',
            },
          ],
          },
            
          {
            columns:
            [
              {
                text: [
                    { text: 'Circumstance:     ', style: 'header4' },
                    { text: `${this.caseConference.circumstance}`, style: 'content' }
                ],
                margin: [0,10,0,0],
              },
            ], 
          },
           
          {text: '\nDiscussions:  ', style: 'header4'  },
          {
            text:[
              // {text: '________', style: 'white'},
              {text: `${this.caseConference.discussions}`, style: 'content' /*absolutePosition: {x: 108, y: 165} */}
            ], 
            margin: [10,0,0,0],
            
          },

          {text: '\nAgreement: ', style: 'header4', /*absolutePosition: {x: 72, y: 300}*/ },
          {
            text:[
            // {text: '________', style: 'white'},
            {text: `${this.caseConference.agreement}`, style: 'content',/*absolutePosition: {x: 108, y: 325}*/ }
            ],
            margin: [10,0,0,0],
            
          },



          {text: '\nRemarks: ', style: 'header4', /*absolutePosition: {x: 72, y: 485}*/ },
          {
            text:[
            // {text: '________', style: 'white'},
            {text: `${this.caseConference.remarks}`, style: 'content',/*absolutePosition: {x: 108, y: 510}*/}
            ],
            margin: [10,0,0,50],
            
          },
            
          
          {
          columns:
              [
                {
                  text:[
                    {text: '\n\n____________________________________________\n', style: 'signature'},
                    { text: 'Student\'s Signature over Printed Name', style: 'signature' }
                  ],
                  // absolutePosition: {x: -150, y: 600}
                 
                },
                {
                  text:[
                    {text: '\n\n____________________________________________\n', style: 'signature'},
                    {text: 'Counselor\'s Signature over Printed Name', style: 'signature' }
                  ]
                  // ,absolutePosition: {x: 300, y: 600}

                }
                
              ],

          },
            
          {
              columns:
              [
                {
                  text:[
                    {text: '\n\n____________________________________________\n', style: 'signature'},
                    {text: 'Parent\'s/Guardian\'s Signature over Printed Name', style: 'signature'} 
                  ],
                  // absolutePosition: {x: -150, y: 650}
                  
                },
                {
                  text:[
                    {text: '\n\n___________________________________________\n', style: 'signature'},
                    {text: 'DBGF\'s Signature over Printed Name', style: 'signature'} 
                  ],
                  // absolutePosition: {x: 300, y: 650}
                },
              ],
          },
          
          {
              columns:
              [
                {
                  text:[
                    {text: '\n\n____________________________________________\n', style: 'signature'},
                    {text: 'Section Adviser\'s Signature over Printed Name', style: 'signature' }
                  ],
                  // absolutePosition: {x: -150, y: 700}
                },
                {
                  text:[
                    {text: '\n\n_________________________\n', style: 'signature'},
                    {text: 'Date', style: 'signature' }
                  ]
                  // ,absolutePosition: {x: 300, y: 700}
                },
              
              ],
          },
            
          
        ],
        styles: {
          header1: {
            fontSize: 11,
            bold: false,
            alignment: 'center',
            _fontFamily: 'sans-serif',
  
          },
            header2: {
                fontSize: 14,
                bold: true,
                alignment: 'center',
                _fontFamily: 'sans-serif',
            },
            header3: {
                fontSize: 9,
                bold: true,
                alignment: 'center',
                _fontFamily: 'elegant',
            },
            header: {
                fontSize: 12,
                bold: false,
                underline: true,
                alignment: 'center',
                margin: [0,0,0,15],
                _fontFamily: 'elegant',
            },


            header4: {
                fontSize: 12,
                bold: true,
                _fontFamily: 'elegant',
                //margin: [0,10,0,0],
            },
          content: {
            margin: [0,0,0,0],
            fontSize: 11,
            
          },

          content2:{
            bold: true,
            fontsize: 9,
         
          },
          signature: {
            margin: [0, 0, 0, 0],
            fontSize: 10,
            alignment: 'center',
          },

          white: {
            color: 'white',
          },
  
        },
      };
     
      },
  
    },
  
  
    methods: {
  
      async initCaseConference(id){
        const fetchedObject = caseConference.find(item => item.caseConDocID === id);
        if (fetchedObject) {
          this.caseConference = { ...this.caseConference, ...fetchedObject };
        }
      },  
  
     /* generatePDF() {
  
        pdfMake.createPdf(this.defineCaseConferenceDoc()).download('caseConference.pdf');
      },*/
  
      displayPDF(){
        pdfMake.createPdf(this.defineCaseConferenceDoc).getBlob((blob) => {
        const url = URL.createObjectURL(blob);
  
    // Display in an iframe
    const iframe = document.createElement('iframe');
    iframe.style.width = '70%';
    iframe.style.height = '80vh';
    iframe.style.display = 'block'; 
    iframe.style.margin = '0 auto'; 
    iframe.src = url;
    document.getElementById('case-display-container').appendChild(iframe);
  
    // Alternatively, open in a new tab
    // window.open(url);
  });
    },
  
    },
  };
  </script>
  
  <style>
  h1 {
    font-family: Arial, sans-serif;
  }
  button {
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
  }
  
  </style>