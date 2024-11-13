<!--This is under experiment and lacks the right header
:this'll automatically display an iframe of document when created
:this needs only a 'anecdotalDocID' as a parameter
this will open a new tab when imported and use, to nnot let this do that, 
just comment the line window something and remove comment to line below iframe-->

<template>
    <div id="anecdotal-display-container">
      <!-- The iframe will be appended here -->
    </div>
  </template>
  
  <script>
  import pdfMake from 'pdfmake/build/pdfmake';
  import pdfFonts from 'pdfmake/build/vfs_fonts';
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  import { headerImage } from '~/assets/images/sample-header';
  import { footer } from '~/assets/images/footer';
  import { anecdotalReport } from '~/data/anecdotal';
  import { section } from '~/data/section';
  import { student } from '~/data/student';
//   import { Admin } from '~/data/admin';
//   import { adviser } from '~/data/adviser';
  
  
  export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
      anecdotalReportID: {
            type: String,
            required: true,
      },

    },

    data() {
      return {
      anecReport:{},
      reportType: 'ANECDOTAL REPORT',
      gradeAndSection:'',
     
      };
    },
  
    async created(){

        await this.initAnecdotalByID(this.anecdotalReportID);
        await this.getGradeAndSection();
        this.displayPDF();


    },
  
    computed: {
  
      defineAnecdotalDoc(){
        return {
        pageMargins: [72,120,72,90],
        header:
        {
          image: headerImage,
          width: 500,
          height: 80,
          alignment: 'center',
          margin: [0,20,0,0],
        },
        content: [
          
          [
            { text: `${this.reportType}`, style: 'header', margin:[0,0,0,30]},
          ],
          {
            columns: 
            [
            {width:'35%', text: 'Name of People Involved:', style: 'label' },
          //  {width:'5%', text:''},
            {width: '65%', text: `${this.anecReport.peopleInvolved}`, style: 'content', alignment: 'center' },
            ],
          },
          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
          },
          {
            columns: 
            [
            {width:'35%', text: 'Grade and Section:', style: 'label' },
          //  {width:'5%', text:''},
            {width: '65%', text: `${this.gradeAndSection}`, style: 'content', alignment: 'center' },
            ],
          },
          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
          },
          {
            columns:
            [
            {width: '30%', text: 'Witness:', style: 'label' },
            {width:'5%', text:''},
            {width:'65%', text: `${this.anecReport.witness}`, style: 'content', alignment: 'center' },
            ],
          },

          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
          },
          {
            columns:
            [
            {width: '30%', text: 'Purpose:', style: 'label' },
            {width:'5%', text:''},
            {width:'65%', text: `${this.anecReport.purpose}`, style: 'content', alignment: 'center'  },
            ],
          }, 

          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
          },

          {
            columns:
            [
            {width: '30%', text: 'Date of Incident:', style: 'label' },
            {width:'5%', text:''},
            {width:'65%', text: `${this.anecReport.dateOfIncident}`, style: 'content', alignment: 'center'  },
            ],
          },

          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
          },

          {
            columns:
            [
            {width:'30%', text: 'Place of Incident:', style: 'label' },
            {width:'5%', text:''},
            {width:'65%', text: `${this.anecReport.placeOfIncident}`, style: 'content', alignment: 'center'  },
            ],
          },
          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
          },
          {
            columns:
            [
            {width:'30%', text: 'Thing/s Involved:', style: 'label' },
            {width:'5%', text:''},
            {width: '65%', text: `${this.anecReport.thingsInvolved}`, style: 'content', alignment: 'center'  },
            ],
          },
          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
          },

            { text: 'Details:', style: 'label' },

            {text: `${this.anecReport.details}`, style: 'content', alignment: 'left', margin: [5, 0, 0, 0] },
        
          
          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
          },

            { width:'30%', text: 'Remarks:', style: 'label' },
            { width:'65%', text: `${this.anecReport.remarks}`, style: 'content', alignment: 'left', margin: [5, 0, 0, 0] },

          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
          },
  
                  { text: 'Prepared by: ', style: 'content', margin: [0, 30, 0, 0] },
                  {
                    stack: [
                      {
                        text: `${this.anecReport.preparedBy}`,
                        style: 'label',
                        alignment: 'justify',
                        decoration: 'underline',
                        margin: [0, 0, 0, 0]
                      },
                      {
                        text: 'Guidance Facilitator, VSUIHS',
                        style: 'content',
                        alignment: 'justify',
                        margin: [0, 0, 0, 0]
                      }
                    ],
                    margin: [5, 15, 0, 0]
                  },
      
            { text: `Date:    ${this.anecReport.datePrepared}`, style: 'content', margin: [0, 30, 0, 0] },
        ],

        styles: {
          header: {
            fontSize: 15,
            bold: true,
            alignment: 'center',
     
  
          },
          content: {
            margin: [0,5,0,5],
            fontSize: 11,
            
          
          },
          label:{
            bold: true,
            fontsize: 11,
            margin:[0,5,0,5],
            width: 85,
         
          },
  
        },
  
        footer: (currentPage, pageCount,) => {
          return [
            {
              image: footer,
              width: 480,
              alignment: 'center',
              margin: [0,10,0,0]
            },
            {
              text:`FM-OOP-05                                    Rev.: 01                                    ${new Date().toLocaleDateString()}                                       Page ${currentPage} of ${pageCount}                                  Control Number:______`,
              alignment: 'justify',
              margin: [70, 0],
              fontSize: 7,
              
            },
          ];
        },
      };
     
      },
  
    },
  
  
    methods: {
  
      async initAnecdotalByID(id){
        const fetchedObject = anecdotalReport.find(item => item.anecdotalDocID === id);
        if (fetchedObject) {
          this.anecReport = { ...this.anecReport, ...fetchedObject };
        }
      },
      
     async getGradeAndSection(){
        const studentObj = student.find(item => item.studentId === this.anecReport.studentID);
     
        const sectionObj = section.find(item => item.id === studentObj.sectionID);
        if (sectionObj) {
          this.gradeAndSection = `Grade ${sectionObj.sectionLevel} - ${sectionObj.sectionName}`;
        }
      },
     /* generatePDF() {
        // Sample data should be from database
        pdfMake.createPdf(this.defineAnecdotalDoc()).download('AnecdotalReport.pdf');
      },*/
  
      displayPDF(){
        pdfMake.createPdf(this.defineAnecdotalDoc).getBlob((blob) => {
        const url = URL.createObjectURL(blob);
  
    // Display in an iframe
    const iframe = document.createElement('iframe');
    iframe.style.width = '70%';
    iframe.style.height = '80vh';
    iframe.style.display = 'block'; 
    iframe.style.margin = '0 auto'; 
    iframe.src = url;
    //document.getElementById('anecdotal-display-container').appendChild(iframe);
  
    // Alternatively, open in a new tab
     window.open(url);
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