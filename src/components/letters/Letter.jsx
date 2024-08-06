import React from 'react';
import jsPDF from 'jspdf';

export default function Letter() {
  const createAndDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Define margins and initial vertical position
    const marginLeft = 20;
    const marginTop = 30;
    const lineHeight = 10;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let verticalPosition = marginTop;

    // Add a header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const headerTitle = 'Ethical Review Committee';
    const headerTitleWidth = doc.getTextWidth(headerTitle);
    const headerTitleX = (pageWidth - headerTitleWidth) / 2;
    doc.text(headerTitle, headerTitleX, verticalPosition);
    verticalPosition += 15;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const subject = 'Subject: Approval Letter of Research Project “Navigating Antimicrobial Resistance Insights: An In-Depth Analysis Of Healthcare Professionals\' Knowledge, Attitudes, And Practices, With An Emphasis On Precision Medicine In Pakistan” by Ethical Review Committee (ERC), BMY Health';
    doc.text(subject, marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
    
    


    
    const protocolNumber = 'Protocol number: BMY-ERC2-07-2024';
  
    const submittedBy = 'Submitted by: Dr Shafaq Mahmood';
   

    verticalPosition += 25;
    doc.text(protocolNumber, marginLeft, verticalPosition);
    verticalPosition += 15;
    doc.text(submittedBy, marginLeft, verticalPosition);
 

    // Main Content
    const content = `The project titled “Navigating Antimicrobial Resistance Insights: An In-Depth Analysis of Healthcare Professionals' Knowledge, Attitudes, And Practices, With An Emphasis On Precision Medicine In Pakistan” was approved in the eleventh meeting of ERC held on 15-01-24 at BMY Health after expedited review. The project was approved with consensus on compliance with research ethics. This approval is valid for two months. In case the project is extended beyond 15-03-24, review will be required again. This initial approval is the first step of research ethics screening. In case of violation of ethics, ERC can terminate the project at any stage. The project will have to remain under continuous monitoring of ERC for two months and project leaders will have to maintain liaison with ERC to report at following steps.

1. After data collection, project leaders will submit proofs of genuine data collection to ERC, including videos/ pictures of data collection, links to data collection forms, and data sheets.
2. After manuscript completion, they will report ERC regarding plagiarism checks, authors contributions and credits, to ensure publication ethics.
3. Before the project closure, they will provide a report on research records retention/ disposal for confidentiality of data as decided with ERC.

Journal should note that researcher will submit 2 letters at the time of manuscript submission:
1. ERC Approval letter after initial project review
2. ERC Audit letter after project completion`;

    doc.text(content, marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
    verticalPosition += 50; // Adjust based on content length

    // Signature and Date
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('For Chair ERC-2', marginLeft, verticalPosition);
    verticalPosition += lineHeight;
    doc.text('Dated: 15-01-24', marginLeft, verticalPosition);
    verticalPosition += 20;

    doc.text('for', marginLeft, verticalPosition);
    verticalPosition += lineHeight;
    doc.text('Dr. Sana Shaukat Siddiqui', marginLeft, verticalPosition);
    verticalPosition += lineHeight;
    doc.text('FCPS Community Medicine', marginLeft, verticalPosition);
    verticalPosition += lineHeight;
    doc.text('Research Consultant', marginLeft, verticalPosition);
    verticalPosition += lineHeight;
    doc.text('BMY Health, Pakistan', marginLeft, verticalPosition);

    // Footer
    doc.setFontSize(8);
    const footerText = [
      'BMY Health Pakistan',
      'Phone: (123) 456-7890',
      'Email: contact@company.com',
      'Website: www.companywebsite.com'
    ];
    footerText.forEach((text, index) => {
      if (verticalPosition + lineHeight > pageHeight - marginTop) {
        doc.addPage();
        verticalPosition = 15;
      }
      doc.text(text, marginLeft, pageHeight - 20 + index * 5);
    });

    // Save the document
    doc.save('job_appointment_letter.pdf');
  };

  return (
    <div>
      <h1>Download Job Appointment Letter</h1>
      <button onClick={createAndDownloadPDF}>Download PDF</button>
    </div>
  );
}
