import puppeteer from 'puppeteer';
// import { headerImage } from './public/sample-header';
//import { headerImage } from './assets/images/sample-header';
import { createReadStream } from 'fs';
import { resolve } from 'path';


export default defineEventHandler(async (event) => {
try{

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
const imagePath = resolve('./assets/images/sampleHeader.png');
const imageStream = createReadStream(imagePath);
let imageBase64 = '';

imageStream.on('data', (chunk) => {
    imageBase64 += chunk.toString('base64');
});

await new Promise((resolve, reject) => {
    imageStream.on('end', resolve);
    imageStream.on('error', reject);
});
// console.log(imageBase64);




  // Example HTML content
  const htmlContent = `
    <!DOCTYPE html>
<html>
<head>
  <style>
    @page {
      size: A4;
      margin: 20mm;
        margin-top: 35mm;

         @top-center {
            content: url('data:image/png;base64,${imageBase64}');
            margin-top: 30px;
            width: 700mm;
            height: auto; /* Maintains aspect ratio */

          }
        @bottom-center {
        content: "Page " counter(page) " of " counter(pages);
        font-size: 10px;
         }

    }
     body {
        font-family: Arial, sans-serif;
        color: #265630;
        margin: 0;

    }
        content {
        text-align: right;
}

    }
    .content {
        text-align: right;
        color: #265630;

    }
    .body {
    text-align: center;
        padding: 0px;
    }

  </style>
</head>
 <body>

        <div>
          <div class="body">
            <h1>Sample Incident Report</h1>
            <p>Oops! Looks like the page you are looking for does not exist..</p>
            <!-- Add more content to test the page break -->
            </div>
            <div :style = "text-align: center,">
            <p class="content" >Additional content here...1</p>
            <p>Additional content here...2</p>
            <p>Additional content here...3</p>
            <p>Additional content here...4</p>
            <p>Additional content here...5</p>
            <p>Additional content here...6</p>
            <p>Additional content here...7</p>
            <p>Additional content here...8</p>
            <p>Additional content here...9</p>
            <p>Additional content here...1</p>
            <p>Additional content here...2</p>
            <p>Additional content here...3</p>
            <p>Additional content here...4</p>
            <p>Additional content here...5</p>
            <p>Additional content here...6</p>
            <p>Additional content here...7</p>
            <p>Additional content here...8</p>
            <p>Additional content here...9</p>
            <p>Additional content here...1</p>
            <p>Additional content here...2</p>
            <p>Additional content here...3</p>
            <p>Additional content here...4</p>
            <p>Additional content here...5</p>
            <p>Additional content here...6</p>
            <p>Additional content here...7</p>
            <p>Additional content here...8</p>
            <p>Additional content here...9</p>
            <p>Additional content here...1</p>
            <p>Additional content here...2</p>
            <p>Additional content here...3</p>
            <p>Additional content here...4</p>
            <p>Additional content here...5</p>
            <p>Additional content here...6</p>
            <p>Additional content here...7</p>
            <p>Additional content here...8</p>
            <p>Additional content here...9</p>
            <p>Additional content here...1</p>
            <p>Additional content here...2</p>
            <p>Additional content here...3</p>
            <p>Additional content here...4</p>
            <p>Additional content here...5</p>
            <p>Additional content here...6</p>
            <p>Additional content here...7</p>
            <p>Additional content here...8</p>
            <p>Additional content here...9</p>
            </div>
            
          
        </div>
      </body>
</html>

  `;
  await page.setContent(htmlContent);

  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  // Set response headers
  setHeader(event, 'Content-Type', 'application/pdf');
  setHeader(event, 'Content-Disposition', 'inline; filename=generated.pdf');

  return pdfBuffer;


}catch(err){
    console.log(err);
    return err;
}

});
