import React from 'react';
import jsPDF from 'jspdf';

export default function Proposal({ sections, title }) {
  // Helper function to map raw questions to data format
  const mapData = (rawData) => {
    if (!rawData) return [];
    return Object.keys(rawData).map(question => ({
      question,
      answer: rawData[question] || "N/A"
    }));
  };

  const informationData = mapData(sections.information?.questions);
  const ConsentData = mapData(sections.consent?.questions);
  const scientificData = mapData(sections.scientificReview?.questions);
  const ethicalData = mapData(sections.ethicalReview?.questions);

  const createAndDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const marginLeft = 10;
    const marginTop = 20;
    const lineHeight = 10;
    const footerMarginBottom = 15; // Space for footer
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let verticalPosition = marginTop;

    // Function to add a section
    const addSection = (title, data) => {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const sectionTitleWidth = doc.getTextWidth(title);
      const sectionTitleX = (pageWidth - sectionTitleWidth) / 2;
      doc.text(title, sectionTitleX, verticalPosition);
      verticalPosition += 15;

      doc.setFontSize(12);
      data.forEach(item => {
        if (verticalPosition + lineHeight * 2 > pageHeight - footerMarginBottom) {
          doc.addPage();
          verticalPosition = marginTop;
        }
        doc.setFont('helvetica', 'bold');
        doc.text(item.question, marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
        verticalPosition += lineHeight;
        doc.setFont('helvetica', 'normal');
        doc.text(String(item.answer), marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
        verticalPosition += lineHeight;
      });
    };

    // Add the document header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const companyName = 'BMY Health Pakistan';
    const companyNameWidth = doc.getTextWidth(companyName);
    const companyNameX = (pageWidth - companyNameWidth) / 2;
    doc.text(companyName, companyNameX, verticalPosition);
    verticalPosition += 10;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const TitleName = 'Proposal Report';
    const TitleNameWidth = doc.getTextWidth(TitleName);
    const TitleNameX = (pageWidth - TitleNameWidth) / 2;
    doc.text(TitleName, TitleNameX, verticalPosition);
    verticalPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    const paragraph = `${title} `;
    doc.text(paragraph, marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
    verticalPosition += 18;

    // Add sections
    addSection('Section: Information', informationData);
    addSection('Section: Scientific Review (Synopsis)', scientificData);
    addSection('Section: Ethical Review', ethicalData);
    addSection('Section: Consent', ConsentData);

    // Add footer
    doc.setFontSize(8);
    const footerText = [
      'BMY Health Pakistan',
      'Phone: (123) 456-7890',
      'Email: contact@company.com'
    ];
    doc.setFont('helvetica', 'normal');
    footerText.forEach((text, index) => {
      const footerY = pageHeight - footerMarginBottom + index * 5;
      if (verticalPosition + lineHeight > pageHeight - footerMarginBottom) {
        doc.addPage();
        verticalPosition = marginTop;
      }
      doc.text(text, marginLeft, footerY);
    });

    // Save the document
    doc.save('proposal_report.pdf');
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
      Download
    </button>
  );
}
