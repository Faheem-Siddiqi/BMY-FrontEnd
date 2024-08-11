import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import { pdfMake as pdfFonts } from 'pdfmake/build/vfs_fonts'; // Named import

pdfMake.vfs = pdfFonts.pdfMake.vfs; 

export default function Proposal({ sections, title }) {

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
    const docDefinition = {
      content: [
        { text: 'BMY Health Pakistan', style: 'header' },
        { text: 'Proposal Report', style: 'subHeader' },
        { text: title, style: 'italic' },
        { text: 'Section: Information', style: 'title' },
        ...informationData.map(item => [
          { text: item.question, style: 'question' },
          { text: item.answer, style: 'answer' }
        ]).flat(),
        { text: 'Section: Scientific Review (Synopsis)', style: 'title' },
        ...scientificData.map(item => [
          { text: item.question, style: 'question' },
          { text: item.answer, style: 'answer' }
        ]).flat(),
        { text: 'Section: Ethical Review', style: 'title' },
        ...ethicalData.map(item => [
          { text: item.question, style: 'question' },
          { text: item.answer, style: 'answer' }
        ]).flat(),
        { text: 'Section: Consent', style: 'title' },
        ...ConsentData.map(item => [
          { text: item.question, style: 'question' },
          { text: item.answer, style: 'answer' }
        ]).flat()
      ],
      styles: {
        header: { fontSize: 16, bold: true, alignment: 'center' },
        subHeader: { fontSize: 14, bold: true, alignment: 'center'  ,margin: [0, 10] },
        title: { fontSize: 14, bold: true, margin: [0, 10] },
        question: { fontSize: 12, bold: true, margin: [0, 5] },
        answer: { fontSize: 12, margin: [0, 5] },
        italic: { fontSize: 12, italics: true, margin: [0, 10] },
        footer: { fontSize: 8, alignment: 'center', margin: [0, 20] }
      },
      pageMargins: [30, 30, 30, 50], // Left, Top, Right, Bottom
      footer: (currentPage, pageCount) => ({
        text: [
          'BMY Health Pakistan',
        
        ],
        style: 'footer'
      }),
      pageBreakBefore: (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) => {
        return followingNodesOnPage.length === 0 && currentNode.pageNumber % 2 === 1;
      }
    };

    pdfMake.createPdf(docDefinition).download('proposal_report.pdf');
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
