import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';

function DownloadButtons({ beaches }) {
  // Generates a PDF file with all beach information, adds new pages if content gets too long
  const createPdf = () => {
  
    const doc = new jsPDF();
    let y = 14;
    doc.setFontSize(12);
    doc.text('BeautyOfBeaches - Beach List', 10, 10);
    beaches.forEach((beach, idx) => {
      const line = `${beach.name} | ${beach.country} | ${beach.zone} | ${beach.description}`;
      doc.text(line, 10, y);
      y += 8;
      if (y > 280) {
        doc.addPage();
        y = 14;
      }
    });
    doc.save('beaches.pdf');
  };

  // Generates a Word document with beach data and triggers download. Has error handling for older browsers.
  const createDocx = async () => {
    const doc = new Document({ sections: [{ children: [] }] });
    beaches.forEach((beach) => {
      const text = `${beach.name} | ${beach.country} | ${beach.zone} | ${beach.description}`;
      doc.addSection({ children: [new Paragraph({ children: [new TextRun(text)] })] });
    });

    try {
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'beaches.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Error creating DOCX', e);
      alert('Unable to generate Word document in this browser.');
    }
  };

  return (
    <div className="d-flex flex-wrap gap-3 mt-3">
      <button className="btn btn-primary" onClick={createPdf}>Download PDF</button>
      <button className="btn btn-outline-light" onClick={createDocx}>Download Word Doc</button>
    </div>
  );
}

export default DownloadButtons;
