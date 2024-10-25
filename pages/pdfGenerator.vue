<template>
  <div>
    <h1>PDF Generator Example</h1>
    <button @click="generatePDF">Generate PDF</button>
    <h2>--</h2>
    <h1>--</h1>
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { headerImage } from '~/assets/images/sample-header';

export default {
  methods: {
    generatePDF() {
      // Sample data should be from database
      const sampleData = {
        reportType: 'INCIDENT REPORT',
        involved: 'John Doe',
        witness: 'Jowjow',
        incDate: 'Friday, September 8 @1:00 PM',
        reportedDate: 'Monday, September 11 @8:00 AM',
        place: 'DCST',
        thingsInvolved: 'lapis and sudlay',
        narrative: 'Da uroy naag duwa rag sudlay ang laki nya gi duslak ug lapis sa babae kay ni gwapo daw ug samot si Jade'.repeat(15),
        actionTaken: 'We tell jade to be humble in his handsomeness sheesh sana all jade.',
        reasonOfAction: 'Minor-Offense',
        others: 'send a letter for kiss conference',
        reportedBy: 'Ma\'am Hancock',
        receivedBy: 'Ma\'am Mimi',
      };

      const docDefinition = {

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
            { text: `${sampleData.reportType}`, style: 'header', margin:[0,0,0,30]},
          ],
          {
            columns: 
            [
            {width:'30%', text: 'Name of People Involved:', style: 'label' },
            {width:'5%', text:''},
            {width: '65%', text: `${sampleData.involved}`, style: 'content' },
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
            {width:'65%', text: `${sampleData.witness}`, style: 'content' },
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
            {width:'65%', text: `${sampleData.incDate}`, style: 'content' },
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
            {width: '65%', text: `${sampleData.reportedDate}`, style: 'content' },
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
            {width:'65%', text: `${sampleData.place}`, style: 'content' },
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
            {width: '65%', text: `${sampleData.thingsInvolved}`, style: 'content' },
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
            {width:'65%', text: `${sampleData.narrative}`, style: 'content' },
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
            { width:'65%', text: `${sampleData.actionTaken}`, style: 'content' },
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
            { width: '65%', text: `${sampleData.reasonOfAction}`, style: 'content' },
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
            { width:'65%', text: `${sampleData.others}`, style: 'content' },
            ],
          },
          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 460, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }]
          },
      

          { text: `Reported by: ${sampleData.reportedBy}`, style: 'content', margin:[0,70,0,0] },
          { text: `Reported received by: ${sampleData.receivedBy}`, style: 'content', margin:[0,40,0,0] },
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
              text: `Page ${currentPage} of ${pageCount}`,
              alignment: 'center',
              margin: [0, 10],
            },
          ];
        },
      };

      pdfMake.createPdf(docDefinition).download('myDocument.pdf');
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