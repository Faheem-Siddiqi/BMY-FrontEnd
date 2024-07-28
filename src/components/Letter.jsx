
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import React from 'react';

function Letter() {
  const generatePDF = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('letter.pdf');
    });
  };
  return (
    <div>
      <div className="relative min-h-screen overflow-scroll p-5 md:p-10 flex items-center justify-center bg-iota">
        {/* Background Overlay */}
      
        {/* Main Content */}
        <div   id="pdf-content"  className="relative md:w-a4 md:h-a4 bg-white p-8 overflow-scroll shadow-lg z-10">
          {/* Header with Logos */}
          <div className="flex justify-between items-center ">
            <div className="font-CormorantGaramond-Regular flex flex-col items-center justify-center  ">
              <h1 className="text-2xl gap-1 flex">
                <p className="text-zeta font-bold">BMY</p>
                <p className="text-primary  font-semibold">Health</p>
              </h1>
              <p className="font-light text-xl text-mist">Pakistan</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-light">https://bmyhealth.com</p>
              <p className="text-sm font-light">Tel: (123) 456-7890 | Email: contact@bmyhealth.com</p>
            </div>
          </div>
          <hr className='my-5 border-zeta' />
          {/* Main Title */}
          <h3 className="text-2xl uppercase text-center font-bold font-CormorantGaramond-Regular">Clearance Letter</h3>
          {/* Letter Content */}
          <div className='mb-4 font-WorkSans-Regular my-5'>
            <div className='my-2'>
              <b>Department:</b> <u>Ethical Review Committee</u>
            </div>
            <div className='my-2'>
              <b>Date:</b> <span>12 Jan 2020</span>
            </div>
            <div className='my-2'>
              <b>Subject:</b> <span>Approval Letter of Research Project “ ” by Ethical Review Committee (ERC), BMY Health</span>
            </div>
            <div className='my-2'>
              <b>Submitted By:</b> <span>Dr. Faheem</span>
            </div>
            <div className='my-2'>
              <b>Protocol Number:</b> <span>BMY-ERC2-06-2024</span>
            </div>
          </div>
          <div className='my-4'>
            The project titled 'Assessing Health and Economic Ramifications of Smog' received clearance from BMY Health on date…, having met the ethical guidelines and standards established by the Ethical Review Committee (ERC) at BMY Health. This clearance ensures that the team demonstrated compliance with all necessary ethical protocols required by BMY Health Ethics Review Committee.
            Approved version of manuscript: [link to submission]
          </div>
          {/* Footer */}
          <div className='flex flex-col gap-10 mt-8'>
            <div>
              <b>Dated:</b> <span>06-2024</span>
            </div>
            <div>
              <b>For Chair</b>
              <button onClick={generatePDF} className="p-2 bg-blue-500 text-white rounded">Download PDF</button>
            </div>
          </div>
          {/* Contact Details at the Bottom */}
          <div className="absolute bottom-8 left-8 text-sm font-light">
            <p>Contact Information:</p>
            <p>123 Health Street, Medical City</p>
            <p>Tel: (123) 456-7890 | Email: contact@bmyhealth.com</p>
          </div>
        </div>
      </div>
    
    </div>
  );
}
export default Letter;
