import React from 'react';
import PropTypes from 'prop-types';
import pdfMake from 'pdfmake/build/pdfmake';

// Define the fonts for pdfMake
(pdfMake).fonts = {
  Roboto: {
    normal: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};

const Proposal = ({ sections = {}, title = '' }) => {
  // Function to map and filter out "N/A" values
  const mapData = (rawData) => {
    if (!rawData) return [];
    return Object.keys(rawData)
      .filter(question => rawData[question] !== "N/A")
      .map(question => ({
        question,
        answer: rawData[question]
      }));
  };

  const informationData = mapData(sections.information?.questions || {});
  const consentData = mapData(sections.consent?.questions || {});
  const scientificData = mapData(sections.scientificReview?.questions || {});
  const ethicalData = mapData(sections.ethicalReview?.questions || {});

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
        ...consentData.map(item => [
          { text: item.question, style: 'question' },
          { text: item.answer, style: 'answer' }
        ]).flat(),
      ],
      styles: {
        header: { fontSize: 16, bold: true, alignment: 'center' },
        subHeader: { fontSize: 14, bold: true, alignment: 'center', margin: [0, 10] },
        title: { fontSize: 14, bold: true, margin: [0, 10] },
        question: { fontSize: 12, bold: true, margin: [0, 5] },
        answer: { fontSize: 12, margin: [0, 5] },
        italic: { fontSize: 12, italics: true, margin: [0, 10] },
        footer: { fontSize: 8, alignment: 'center', margin: [0, 20] },
      },
      pageMargins: [30, 30, 30, 50], // Left, Top, Right, Bottom
      footer: (currentPage, pageCount) => ({
        text: 'BMY Health Pakistan',
        style: 'footer',
      }),
      pageBreakBefore: (currentNode, followingNodesOnPage) => {
        return followingNodesOnPage.length === 0 && currentNode.pageNumber % 2 === 1;
      },
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
};

Proposal.propTypes = {
  sections: PropTypes.shape({
    information: PropTypes.shape({
      questions: PropTypes.object
    }),
    consent: PropTypes.shape({
      questions: PropTypes.object
    }),
    scientificReview: PropTypes.shape({
      questions: PropTypes.object
    }),
    ethicalReview: PropTypes.shape({
      questions: PropTypes.object
    }),
  }),
  title: PropTypes.string,
};

export default Proposal;
