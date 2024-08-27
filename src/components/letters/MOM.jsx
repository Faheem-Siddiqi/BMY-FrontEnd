import { FaCloudDownloadAlt } from "react-icons/fa";
import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
(pdfMake).fonts = {
  Roboto: {
    normal: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};
const MOM = ({ BMYid, title, GroupLead, PropossalID, approvalErcMember, ercMembers, acceptedAt }) => {
  const parts = BMYid.split('-');
  const meetingNumber = parts[0];
  const Approval = {
    signature: approvalErcMember?.signature || '', // URL to the signature image
    fullname: approvalErcMember?.fullname || 'fullname',
    designation: approvalErcMember?.experience?.designation || 'N/A',
    institution: approvalErcMember?.experience?.company || 'N/A',
  };
  const ProjectTitle = typeof title === 'string' ? title : 'Default Title';
  const groupLeadName = typeof GroupLead === 'string' ? GroupLead : 'Default Name';
  const protocolNumber = typeof PropossalID === 'string' ? PropossalID : '0000';
  const generatePDF = async () => {
    const docDefinition = {
      pageMargins: [30, 30, 30, 50], // Left, Top, Right, Bottom
      content: [
        { text: 'BMY Health Pakistan', style: 'header' },
        { text: 'Minutes of Meeting \n\n', style: 'title', margin: [0, 0, 0, 10] },
        {
          text: [
            { text: '1. Subject: ', fontSize: 11, bold: true },
            { text: ' Meeting for research protocol review was held on ', fontSize: 11 },
            { text: `${acceptedAt}`, fontSize: 11 },
          ],
          margin: [0, 0, 0, 10] // Add margin after this block
        },
        {
          text: [
            { text: '2. Discussion Points and Decisions: ', fontSize: 11, bold: true },
            { text: `Continuous review of research proposals.`, fontSize: 11 },
          ],
          margin: [0, 0, 0, 10]
        },
        {
          text: [
            { text: `3. ERC Panel in meeting: `, fontSize: 11, bold: true },
          ], margin: [0, 0, 0, 10]
        },
        ...ercMembers.map((member, index) => ({
          text: [
            { text: `${index + 1}.  ${member.fullname}`, fontSize: 11, bold: false }
          ],
          margin: [20, 0, 0, 10]
        })),
        {
          text: [
            { text: '4. Decisions: ', fontSize: 11, bold: true },
            { text: `The discussion was held on synopsis and following were the decisions taken by the ERB: .`, fontSize: 11 },
          ],
          margin: [0, 0, 0, 10]
        },
        {
          table: {
            headerRows: 1,
            widths: [100, 80, 120, 100],
            body: [
              // Header Row
              [
                { text: 'Synopsis Title', fontSize: 11, bold: true },
                { text: 'IRB number', fontSize: 11, bold: true },
                { text: 'Researchers:', fontSize: 11, bold: true },
                { text: 'Decisions', fontSize: 11, bold: true }
              ],
              // Data Row
              [
                { text: `${title}`, fontSize: 11 },
                { text: `${BMYid}`, fontSize: 11 },
                { text: `${groupLeadName}`, fontSize: 11 },
                { text: 'Approved', fontSize: 11 }
              ]
            ]
          },
          layout: {
            hLineColor: function (i, node) {
              return i === 0 || i === node.table.body.length ? 'black' : 'black';
            },
            vLineColor: function (i, node) {
              return i === 0 || i === node.table.widths.length ? 'black' : 'black';
            },
            hLineWidth: function (i, node) {
              return i === 0 || i === node.table.body.length ? 1 : 1;
            },
            vLineWidth: function (i, node) {
              return i === 0 || i === node.table.widths.length ? 1 : 1;
            },
            paddingLeft: function (i, node) { return 4; },
            paddingRight: function (i, node) { return 4; },
            paddingTop: function (i, node) { return 2; },
            paddingBottom: function (i, node) { return 2; }
          },
          margin: [20, 10, 20, 10]
          , alignment: 'center'
        },
        {
          text: 'For Chair',
          fontSize: 11,
          alignment: 'right',
          margin: [0, 10, 10, 30]
        },
        {
          image: Approval.signature, // Add the signature image
          width: 100, // Adjust the width as needed
          alignment: 'right',
          margin: [0, 0, 0, 5]
        },
        {
          text: Approval.fullname,
          fontSize: 11,
          style: 'signature',
          alignment: 'right',
          margin: [0, 20, 0, 5] // Margin to add space below the image
        },
        {
          text: Approval.designation,
          fontSize: 11,
          style: 'position',
          alignment: 'right'
        },
        {
          text: Approval.institution,
          fontSize: 11,
          style: 'position',
          alignment: 'right'
        },
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
        },
        footer: {
          fontSize: 9,
          alignment: 'center'
        }
      },
      footer: (currentPage, pageCount) => ({
        text: 'BMY Health Pakistan',
        style: 'footer',
        alignment: 'center'
      })
    };
    pdfMake.createPdf(docDefinition).download('Minutes of Meeting.pdf');
  };
  return (
    <div>
      <button onClick={generatePDF}>
        <FaCloudDownloadAlt className="text-2xl mt-2 duration-300 text-epsilon" />
      </button>
    </div>
  );
};
export default MOM;
