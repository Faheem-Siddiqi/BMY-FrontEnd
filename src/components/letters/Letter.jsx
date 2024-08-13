import { SlEnvolopeLetter } from "react-icons/sl";
import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';

pdfMake.fonts = {
  Roboto: {
    normal: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};

const EthicsApprovalLetter = () => {
  const generatePDF = () => {
    const docDefinition = {
      pageMargins: [30, 30, 30, 50], // Left, Top, Right, Bottom
      content: [
        { text: 'BMY Health Pakistan ', style: 'header' },
        { text: 'Clearance Letter', style: 'title' ,   margin: [0, 0, 0, 10]},

        {
          text: [
            { text: 'faheem: ', fontSize: 11, bold: true },
            { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi recusandae laudantium eaque dolore expedita, et voluptates rem hic. Blanditiis esse nihil eius ex saepe obcaecati dolores quidem, architecto minus?', fontSize: 11, margin: [0, 0, 0, 5] },
          ],
          margin: [0, 0, 0, 10] // Add margin after this block
        },

        {
          text: [
            { text: 'Subject: ', fontSize: 11, bold: true },
            { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi recusandae laudantium eaque dolore expedita, et voluptates rem hic. Blanditiis esse nihil eius ex saepe obcaecati dolores quidem, architecto minus?', fontSize: 11 },
          ],
          margin: [0, 0, 0, 10] // Add margin after this block
        },

        {
          text: [
            { text: 'Subject: ', fontSize: 11, bold: true },
            { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi recusandae laudantium eaque dolore expedita, et voluptates rem hic. Blanditiis esse nihil eius ex saepe obcaecati dolores quidem, architecto minus?', fontSize: 11 },
          ],
          margin: [0, 0, 0, 10] // Add margin after this block
        },

        {
          text: [
            { text: 'Subject: ', fontSize: 11, bold: true },
            { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi recusandae laudantium eaque dolore expedita, et voluptates rem hic. Blanditiis esse nihil eius ex saepe obcaecati dolores quidem, architecto minus?', fontSize: 11 },
          ],
          margin: [0, 0, 0, 10] // Add margin after this block
        },

        { text: 'Date: …..-24', style: 'date' },
        { text: 'Subject: Approval Letter of Research Project “Assessing Health and Economic Ramifications of Smog” by Ethical Review Committee (ERC), BMY Health', style: 'subject', margin: [0, 20, 0, 20] },

        { text: 'Protocol number: BMY-ERC2-06-2024', margin: [0, 0, 0, 10] },
        { text: 'Submitted by: Dr Sidra Ahmad', margin: [0, 0, 0, 20] },

        { text: "The project titled 'Assessing Health and Economic Ramifications of Smog' received clearance from BMY Health on date…, having met the ethical guidelines and standards established by the Ethical Review Committee (ERC) at BMY Health. This clearance ensures that the team demonstrated compliance with all necessary ethical protocols required by BMY Health Ethics Review Committee.", margin: [0, 0, 0, 20] },

        { text: 'For Chair', alignment: 'right', margin: [0, 0, 0, 70] },

        { text: 'for Dr. Sana Shaukat Siddiqui', style: 'signature', margin: [0, 20, 0, 5] },
        { text: 'FCPS Community Medicine', style: 'position' },
        { text: 'Research Consultant', style: 'position' },
        { text: 'BMY Health, Pakistan', style: 'position' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },

        title: {
          fontSize: 14,
          bold: true,
          alignment: 'center'
        },
        date: {
          fontSize: 12,
          alignment: 'right',
          margin: [0, 20, 0, 0]
        },
        subject: {
          fontSize: 14,
          bold: true
        },
        signature: {
          fontSize: 12,
          alignment: 'right',
          bold: true
        },
        position: {
          fontSize: 12,
          alignment: 'right'
        }
      },
      footer: (currentPage, pageCount) => ({
        text: 'BMY Health Pakistan',
        style: 'footer',
        alignment: 'center'
      })
    };

    pdfMake.createPdf(docDefinition).download('ethics_approval_letter.pdf');
  };

  return (
    <div>
      <button onClick={generatePDF}>
        <SlEnvolopeLetter className="text-2xl duration-300 hover:text-epsilon" />
      </button>
    </div>
  );
};

export default EthicsApprovalLetter;
