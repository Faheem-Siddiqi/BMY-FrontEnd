import React from 'react';
import jsPDF from 'jspdf';
export default function Test() {
  const createAndDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    // Define the page margins and initial vertical position
    const marginLeft = 10;
    const marginTop = 20;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let verticalPosition = marginTop;
    const lineHeight = 10;
    const textWidth = pageWidth - 2 * marginLeft;
    // Add a header (company name centered)
    doc.setFontSize(16);
    const companyName = 'Company Name';
    const companyNameWidth = doc.getTextWidth(companyName);
    const companyNameX = (pageWidth - companyNameWidth) / 2;
    doc.text(companyName, companyNameX, marginTop);
    verticalPosition += 10; // Adjust for header height
    // Main content
    doc.setFontSize(14);
    verticalPosition += 5;
    doc.setFontSize(12);
    const longText = `Dear [Name],
Department:    Ethics Review Committee
Date:    …..-24
Subject:   Approval Letter of Research Project “Assessing Health and Economic Ramifications of Smog” by Ethical Review Committee (ERC), BMY Health
Protocol number: BMY-ERC2-06-2024
Submitted by: Dr Sidra Ahmad
The project titled 'Assessing Health and Economic Ramifications of Smog' received clearance from BMY Health on date…, having met the ethical guidelines and standards established by the Ethical Review Committee (ERC) at BMY Health. This clearance ensures that the team demonstrated compliance with all necessary ethical protocols required by BMY Health Ethics Review Committee.
Approved version of manuscript: [link to submission]

 
`;
    const textLines = doc.splitTextToSize(longText, textWidth);
    textLines.forEach((line) => {
      if (verticalPosition + lineHeight > pageHeight - marginTop) {
        doc.addPage();
        verticalPosition = marginTop; // Reset vertical position for new page
        doc.setFontSize(12); // Reapply font size if necessary
      }
      // Handle bold "Department:" in text lines
      const parts = line.split('Department:');
      if (parts.length > 1) {
        doc.setFont('helvetica', 'normal');
        doc.text(parts[0], marginLeft, verticalPosition);
        doc.setFont('helvetica', 'bold');
        doc.text('Department:', marginLeft + doc.getTextWidth(parts[0]), verticalPosition);
        doc.setFont('helvetica', 'normal');
        doc.text(parts[1], marginLeft + doc.getTextWidth(parts[0]) + doc.getTextWidth('Department:'), verticalPosition);
      } else {
        doc.text(line, marginLeft, verticalPosition);
      }
      verticalPosition += lineHeight;
    });
    // Footer
    doc.setFontSize(10);
    if (verticalPosition + 20 > pageHeight - marginTop) {
      // Add a new page if footer doesn't fit
      doc.addPage();
      verticalPosition = marginTop; // Reset vertical position for new page
    }
    doc.text('Company Address, City, State, ZIP', marginLeft, pageHeight - 30);
    doc.text('Phone: (123) 456-7890', marginLeft, pageHeight - 25);
    doc.text('Email: contact@company.com', marginLeft, pageHeight - 20);
    // Save the document
    doc.save('appointment-letter.pdf');
  };
  return (
    <div>
      <h1>Download  Letter</h1>
    
      <button onClick={createAndDownloadPDF}>Download Appointment Letter</button>
    </div>
  );
}
