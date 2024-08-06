import React from 'react';
import jsPDF from 'jspdf';

export default function Letter() {
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
    const companyName = 'Company Name';
    const companyNameWidth = doc.getTextWidth(companyName);
    const companyNameX = (pageWidth - companyNameWidth) / 2;
    doc.text(companyName, companyNameX, verticalPosition);
    verticalPosition += 10;

  

    // Add a
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const paragraph = `Hello, my name is [Your Name]. I am a [Your Profession/Role] with a passion for [Your Interests]. I have been working in [Your Industry/Field] for [Number] years, and I am excited to share this information with you.`;
    doc.text(paragraph, marginLeft, verticalPosition, { maxWidth: pageWidth - 2 * marginLeft });
    verticalPosition += 15; 


      // Section Header
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const sectionName = 'Section: Information';
      const sectionNameWidth = doc.getTextWidth(sectionName);
      const sectionNameX = (pageWidth - sectionNameWidth) / 2;
      doc.text(sectionName, sectionNameX, verticalPosition);
      verticalPosition += 15;

      
    // Main content
    doc.setFontSize(12);
    data.forEach(item => {
      if (verticalPosition + lineHeight * 2 > pageHeight - marginTop) {
        // Add a new page if necessary
        doc.addPage();
        verticalPosition = marginTop;
      }
      // Set font weight to bold for the question
      doc.setFont('helvetica', 'bold');
      doc.text(item.question, marginLeft, verticalPosition);
      // Move to the next line for the answer
      verticalPosition += lineHeight;
      // Set font weight to normal for the answer
      doc.setFont('helvetica', 'normal');
      doc.text(item.answer, marginLeft, verticalPosition);
      // Increase y position for the next item
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
    <div>
      <h1>Download Letter</h1>
      <button onClick={createAndDownloadPDF}>Download PDF</button>
    </div>
  );
}
