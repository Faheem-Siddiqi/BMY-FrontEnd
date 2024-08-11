import React from 'react';
import jsPDF from 'jspdf';
export default function Proposal({ sections, title }) {

  const rawInformaiton = sections.information.questions
  const informationData = Object.keys(rawInformaiton).map(question => ({
    question: question,
    answer: rawInformaiton[question] || "N/A"
  }));
  const rawConsent = sections.consent.questions
  const ConsentData = Object.keys(rawConsent).map(question => ({
    question: question,
    answer: rawConsent[question] || "N/A"
  }));

  const createAndDownloadPDF = () => {
    const data = [
      { "question": "What is the capital of France?", "answer": "Paris" },
      { "question": "Who wrote 'To Kill a Mockingbird'?", "answer": "Harper Lee" },
      { "question": "What is the chemical symbol for gold?", "answer": "Au" },
      { "question": "What is the largest planet in our solar system?", "answer": "Jupiter" },
      { "question": "What year did the Titanic sink?", "answer": "1912" },
      { "question": "Who painted the Mona Lisa?", "answer": "Leonardo da Vinci" },
      { "question": "What is the hardest natural substance on Earth?", "answer": "Diamond" },
      { "question": "What is the smallest prime number?", "answer": "2" },
      { "question": "Who is known as the father of modern physics?", "answer": "Albert Einstein" },
      { "question": "Which planet is known as the Red Planet?", "answer": "Mars" },
      { "question": "What is the largest ocean on Earth?", "answer": "Pacific Ocean" },
      { "question": "What element does 'O' represent on the periodic table?", "answer": "Oxygen" },
      { "question": "In what year did World War I begin?", "answer": "1914" },
      { "question": "What is the longest river in the world?", "answer": "Nile" },
      { "question": "What is the main language spoken in Brazil?", "answer": "Portuguese" },
      { "question": "Who is the author of '1984'?", "answer": "George Orwell" },
      { "question": "What planet is known for its rings?", "answer": "Saturn" },
      { "question": "What gas do plants primarily use for photosynthesis?", "answer": "Carbon dioxide" },
      { "question": "Which country is known as the Land of the Rising Sun?", "answer": "Japan" },
      { "question": "What is the largest mammal in the world?", "answer": "Blue whale" }
    ];
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    // Define margins and initial vertical position
    const marginLeft = 10;
    const marginTop = 20;
    const lineHeight = 10;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let verticalPosition = marginTop;
    // Add a header
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
    // Add a
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    const paragraph = `${title} `;
    doc.text(paragraph, marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
    verticalPosition += 18;
    // Section Information
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const sectionName = 'Section: Information';
    const sectionNameWidth = doc.getTextWidth(sectionName);
    const sectionNameX = (pageWidth - sectionNameWidth) / 2;
    doc.text(sectionName, sectionNameX, verticalPosition);
    verticalPosition += 15;
    // Information Content
    doc.setFontSize(12);
    informationData.forEach(item => {
      if (verticalPosition + lineHeight * 2 > pageHeight - marginTop) {
        // Add a new page if necessary
        doc.addPage();
        verticalPosition = marginTop;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(item.question, marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
      verticalPosition += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.text(item.answer, marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
      verticalPosition += lineHeight;
    });
    // Section Scientific Data
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const sectionName2 = 'Section: Scientific Review (Synopsis)';
    const sectionNameWidth2 = doc.getTextWidth(sectionName2);
    const sectionNameX2 = (pageWidth - sectionNameWidth2) / 2;
    doc.text(sectionName2, sectionNameX2, verticalPosition);
    verticalPosition += 15;
    // Scientific
    doc.setFontSize(12);
    scientificData.forEach(item => {
      if (verticalPosition + lineHeight * 2 > pageHeight - marginTop) {
        // Add a new page if necessary
        doc.addPage();
        verticalPosition = marginTop;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(item.question, marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
      verticalPosition += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.text(item.answer, marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
      verticalPosition += lineHeight;
    });
    // EthicalData
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const sectionName3 = 'Section: Ethical Review';
    const sectionNameWidth3 = doc.getTextWidth(sectionName3);
    const sectionNameX3 = (pageWidth - sectionNameWidth3) / 2;
    doc.text(sectionName, sectionNameX3, verticalPosition);
    verticalPosition += 15;
    // Information Content
    doc.setFontSize(12);
    ethicalData.forEach(item => {
      if (verticalPosition + lineHeight * 2 > pageHeight - marginTop) {
        // Add a new page if necessary
        doc.addPage();
        verticalPosition = marginTop;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(item.question, marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
      verticalPosition += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.text(item.answer, marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
      verticalPosition += lineHeight;
    });
    // Section Consent
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const sectionName4 = 'Section: Consent';
    const sectionNameWidth4 = doc.getTextWidth(sectionName4);
    const sectionNameX4 = (pageWidth - sectionNameWidth4) / 2;
    doc.text(sectionName, sectionNameX4, verticalPosition);
    verticalPosition += 15;
    doc.setFontSize(12);
    ConsentData.forEach(item => {
      if (verticalPosition + lineHeight * 2 > pageHeight - marginTop) {
        // Add a new page if necessary
        doc.addPage();
        verticalPosition = marginTop;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(item.question, marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
      verticalPosition += lineHeight;
      doc.setFont('helvetica', 'normal');
      doc.text(item.answer, marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
      verticalPosition += lineHeight;
    });
    // Footer
    doc.setFontSize(8);
    const footerText = [
      'BMY Health Pakistan',
      'Phone: (123) 456-7890',
      'Email: contact@company.com'
    ];
    footerText.forEach((text, index) => {
      if (verticalPosition + lineHeight > pageHeight - marginTop) {
        doc.addPage();
        verticalPosition = 5;
      }
      doc.text(text, marginLeft, pageHeight - 20 + index * 5);
    });
    // Save the document
    doc.save('questions_and_answers.pdf');
  };
  return (
    <button
      className="
   relative rounded h-fit py-1 my-auto  w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-epsilon after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center
  "
      onClick={createAndDownloadPDF}
    >
      Download</button>
  );
}
