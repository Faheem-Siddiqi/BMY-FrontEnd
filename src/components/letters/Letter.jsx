import React from 'react';
import pdfmake from "pdfmake/build/pdfmake";
 import pdfFonts from "pdfmake/build/vfs_fonts";
pdfmake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfmake.vfs;


export default function AppointmentLetter() {
  
  const createAndDownloadPDF = () => {
    const docDefinition = {
      content: [
        { text: 'Company Name', style: 'header' },
        { text: 'Appointment Letter', style: 'subHeader' },
        { text: `Date: ${new Date().toLocaleDateString()}`, style: 'date' },
        { text: '\n' }, 
        { text: 'Dear [Employee Name],', style: 'greeting' },
        { text: 'We are pleased to offer you the position of [Position] in the [Department] department, starting from [Start Date].', style: 'bodyText' },
        { text: '\n' },
        { text: 'Please find below the terms and conditions of your appointment:', style: 'bodyText' },
        { text: '\n' },
        {
          ul: [
            'Position: [Position]',
            'Department: [Department]',
            'Start Date: [Start Date]',
         
          ],
          style: 'list'
        },
        { text: '\n' },
        { text: 'If you accept this offer, please sign and return the enclosed copy of this letter.', style: 'bodyText' },
        { text: '\n' },
        { text: 'Sincerely,', style: 'closing' },
        { text: 'Company Name', style: 'closing' },
        { text: 'HR Manager', style: 'closing' },
        { text: '\n' },
        {
          text: [
            'Company Address\n',
            'Phone: (123) 456-7890\n',
            'Email: contact@company.com'
          ],
          style: 'footer'
        }
      ],
      styles: {
        header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 20], color: '#003366' }, // Dark blue
        subHeader: { fontSize: 16, bold: true, alignment: 'center', margin: [0, 10], color: '#005699' }, // Medium blue
        date: { fontSize: 12, alignment: 'right', margin: [0, 0, 0, 20], color: '#666666' }, // Gray
        greeting: { fontSize: 14, margin: [0, 10], color: '#333333' }, // Dark gray
        bodyText: { fontSize: 12, margin: [0, 10], color: '#000000' }, // Black
        list: { fontSize: 12, margin: [0, 10], marginLeft: 20, color: '#000000' },
        closing: { fontSize: 12, margin: [0, 20], color: '#000000' },
        footer: { fontSize: 10, alignment: 'center', margin: [0, 20], color: '#666666' }
      },
      pageMargins: [30, 50, 30, 60], // Left, Top, Right, Bottom
      footer: (currentPage, pageCount) => ({
        text: [
          'Company Address\n',
          'Phone: (123) 456-7890\n',
          'Email: contact@company.com'
        ],
        style: 'footer'
      })
    };

    pdfMake.createPdf(docDefinition).download('appointment_letter.pdf');
  };

  return (
    <button
      className="
        relative rounded h-fit py-1 my-auto w-fit block 
        after:block after:content-[''] after:absolute 
        after:h-[1px] after:bg-epsilon after:w-full 
        after:scale-x-0 after:hover:scale-x-100 
        after:transition after:duration-300 
        after:origin-center
      "
      onClick={createAndDownloadPDF}
    >
      Download Appointment Letter
    </button>
  );
}
