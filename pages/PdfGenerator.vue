<template>
  <div>
    <h1>PDF Generator Example</h1>
    <button @click="displayPDF">Generate PDF</button>
    <h2>--</h2>
    <h1>--</h1>
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { headerImage } from '~/assets/images/sample-header';
import { incidentReport } from '~/data/incident';
import { Admin } from '~/data/admin';
import { toUpper } from 'lodash';
import { initialReport } from '~/data/initialReport';
import { adviser } from '~/data/adviser';


export default {

  data() {
    return {
    incdReport:{},
    reportType: 'INCIDENT REPORT',
    receivedBy: `${(Admin.firstName).toUpperCase()} ${(Admin.middleName).toUpperCase()} ${(Admin.lastName).toUpperCase()}`,
    reportedBY: '',
    

      /*incdReport : {
       // reportType: 'INCIDENT REPORT',
        peopleInvolved: 'John Doe',
        witness: [
          'Jowjow', 'Jawjaw'
        ],
        dateOfIncident: 'Friday, September 8 @1:00 PM',
        dateReported: 'Monday, September 11 @8:00 AM',
        placeOfIncident: 'DCST',
        thingsInvolved: 'lapis and sudlay',
        narrativeReport: 'Da uroy naag duwa rag sudlay ang laki nya gi duslak ug lapis sa babae kay ni gwapo daw ug samot si Jade'.repeat(15),
        actionTaken: 'We tell jade to be humble in his handsomeness sheesh sana all jade.',
        reasonOfAction: 'Minor-Offense',
        others: 'send a letter for kiss conference',
        //reportedBy: 'Ma\'am Hancock',
        //receivedBy: 'Ma\'am Mimi',
      }*/
      
    };
  },

  created(){
    //this.defineIncidentDoc(this.getIncidentByID('report01'));
    this.initIncidentByID('report01');
    this.getReporter('report01');

  },

  computed: {

    defineIncidentDoc(){
      
      return {

      pageMargins: [72,120,72,90],

      header:

      {
        image: headerImage,
        width: 500,
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
          {width:'30%', text: 'Name of People Involved:', style: 'label' },
          {width:'5%', text:''},
         // {width: '65%', text: `${this.incdReport.peopleInvolved.join(', ')}`, style: 'content' },
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
          //{width:'65%', text: `${this.incdReport.witness}`, style: 'content' },
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
         // {width:'65%', text: `${this.incdReport.dateOfIncident}`, style: 'content' },
          ],
        }, 
        {
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
        },
        {
          columns:
          [
          {width: '30%', text: 'Date Reported:', style: 'label' },
          {width:'5%', text:''},
         // {width: '65%', text: `${this.incdReport.dateReported}`, style: 'content' },
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
         // {width:'65%', text: `${this.incdReport.placeOfIncident}`, style: 'content' },
          ],
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
        },
        {
          columns:
          [
          {width:'30%', text: 'Things Involved:', style: 'label' },
          {width:'5%', text:''},
         // {width: '65%', text: `${this.incdReport.thingsInvolved}`, style: 'content' },
          ],
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
        },
        {
          columns:
          [
          {width:'30%', text: 'Narrative Report:', style: 'label' },
          {width:'5%', text:''},
         // {width:'65%', text: `${this.incdReport.narrativeReport}`, style: 'content' },
          ],
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
        },
        {
          columns:
          [
          { width:'30%', text: 'Action taken:', style: 'label' },
          {width:'5%', text:''},
         // { width:'65%', text: `${this.incdReport.actionTaken}`, style: 'content' },
          ],
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
        },
        {
          columns:
          [
          {width: '30%', text: 'Reason Why Action Was Taken:', style: 'label' },
          {width:'5%', text:''},
         // { width: '65%', text: `${this.incdReport.reasonOfAction}`, style: 'content' },
          ],
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
        },
        {
          columns:
          [
          { width: '30%', text: 'Others \n(filled by the Disciplinary Action Commitee):', style: 'label' },
          {width:'5%', text:''},
         // { width:'65%', text: `${this.incdReport.others}`, style: 'content' },
          ],
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
        },


        { text: `Reported by: ${this.reportedBy}`, style: 'content', margin:[0,70,0,0] },
        { text: `Report received by: ${this.receivedBy}`, style: 'content', margin:[0,40,0,0] },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',

        },
        content: {
          margin: [0,10,0,10],
          fontSize: 12,
        
        },
        label:{
          bold: true,
          fontsize: 11,
          margin:[0,10,0,10],
          width: 85,
        },

      },
      footer: (currentPage, pageCount) => {
        return [
          {
            text: `${new Date().toLocaleDateString()}            Page ${currentPage} of ${pageCount}`,
            alignment: 'center',
            margin: [0, 10],
          },
        ];
      },
    };

    },

  },


  methods: {
    fetchIncidentdetails(){
      const report = this.getIncidentByID()
    },

    initIncidentByID(id){
      const index = incidentReport.findIndex((incd) => incd.incidentDocID === id);
      this.incdReport = incidentReport[index];
    },

    getReporter(incidentReportID){
      let index = initialReport.findIndex((incd) => incd.reportIDRef === incidentReportID);
      const id = initialReport[index].reportedBY;
      index = adviser.findIndex((adv) => adv.id)
      this.reportedBy =  `${(adviser[index].firstName).toUpperCase()} ${(adviser[index].middleName).toUpperCase()} ${(adviser[index].lastName).toUpperCase()}`;
    },
    

    

   /* generatePDF() {
      // Sample data should be from database


      pdfMake.createPdf(this.defineIncidentDoc()).download('myDocument.pdf');
    },*/

    displayPDF(){
      pdfMake.createPdf(this.defineIncidentDoc).getBlob((blob) => {
  const url = URL.createObjectURL(blob);

  // Display in an iframe
  const iframe = document.createElement('iframe');
  iframe.style.width = '70%';
  iframe.style.height = '80vh';
  iframe.style.display = 'block'; 
  iframe.style.margin = '0 auto'; 
  iframe.src = url;
  document.body.appendChild(iframe);

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