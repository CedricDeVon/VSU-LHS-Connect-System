import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

export default defineNuxtPlugin(() => {
  // Initialize pdfMake with fonts
  if (typeof window !== 'undefined') {
    pdfMake.vfs = pdfFonts?.vfs || {};
    pdfMake.fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      }
    };
  }

  return {
    provide: {
      pdfMake
    }
  };
});