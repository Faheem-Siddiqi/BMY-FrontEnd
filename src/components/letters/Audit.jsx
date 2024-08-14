import { SlEnvolopeLetter } from "react-icons/sl";
import React from 'react';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';


pdfMake.vfs = pdfFonts.pdfMake.vfs; // Set the built-in fonts
pdfMake.fonts = {
    Roboto: {
        normal: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
        bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
        italics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
        bolditalics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
    },
};

const Audit = ({ title, GroupLead, PropossalID, approvalErcMember }) => {
    console.log(approvalErcMember);

    const Approval = {
        signature: approvalErcMember?.signature || '', // URL to the signature image
        fullname: approvalErcMember?.fullname || 'fullname',
        designation: approvalErcMember?.experience?.designation || 'N/A',
        institution: approvalErcMember?.experience?.company || 'N/A',
    };

    const ProjectTitle = typeof title === 'string' ? title : 'Default Title';
    const groupLeadName = typeof GroupLead === 'string' ? GroupLead : 'Default Name';
    const protocolNumber = typeof PropossalID === 'string' ? PropossalID : '0000';

    // Get today's date
    const todayDate = new Date().toLocaleDateString();

    const generatePDF = async () => {
        const docDefinition = {
            pageMargins: [30, 30, 30, 50], // Left, Top, Right, Bottom
            content: [
                { text: 'BMY Health Pakistan', style: 'header' },
                { text: 'Clearance Letter \n\n', style: 'title', margin: [0, 0, 0, 10] },
                {
                    text: [
                        { text: 'Department: ', fontSize: 11, bold: true },
                        { text: 'Ethical Review Committee', fontSize: 11, margin: [0, 0, 0, 5] },
                    ],
                    margin: [0, 0, 0, 10] // Add margin after this block
                },
                {
                    text: [
                        { text: 'Date: ', fontSize: 11, bold: true },
                        { text: todayDate, fontSize: 11 },
                    ],
                    margin: [0, 0, 0, 10] // Add margin after this block
                },
                {
                    text: [
                        { text: 'Protocol Number: ', fontSize: 11, bold: true },
                        { text: `BMY-${protocolNumber.slice(-4)}`, fontSize: 11 },
                    ],
                    margin: [0, 0, 0, 10] // Add margin after this block
                },
                {
                    text: [
                        { text: 'Subject: ', fontSize: 11, bold: true },
                        { text: ProjectTitle, fontSize: 11 },
                    ],
                    margin: [0, 0, 0, 10] // Add margin after this block
                },
                {
                    text: [
                        { text: 'Submitted By: ', fontSize: 11, bold: true },
                        { text: groupLeadName, fontSize: 11 },
                    ],
                    margin: [0, 0, 0, 10] // Add margin after this block
                },
                {
                    text: [
                        { text: `The project titled `, fontSize: 11 },
                        { text: ProjectTitle, fontSize: 11, bold: true },
                        { text: ` received clearance from BMY Health on ${todayDate}, having met the ethical guidelines and standards established by the Ethical Review Committee (ERC) at BMY Health. This clearance ensures that the team demonstrated compliance with all necessary ethical protocols required by BMY Health Ethics Review Committee.`, fontSize: 11 }
                    ],
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

        pdfMake.createPdf(docDefinition).download('audit_letter.pdf');
    };

    return (
        <div>
            <button onClick={generatePDF}>
                <SlEnvolopeLetter className="text-xl duration-300 hover:text-epsilon" />
            </button>
        </div>
    );
};

export default Audit;
