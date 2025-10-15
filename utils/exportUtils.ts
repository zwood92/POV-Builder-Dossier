import jsPDF from 'jspdf';
import { Packer, Document, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import type { AnalysisResult } from '../types';

// Helper to trigger file download
const saveBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};


// --- Markdown Export ---
const formatMarkdown = (result: AnalysisResult, companyName: string): string => {
  let md = `# Analysis for ${companyName}\n\n`;

  if (result.dossier && (result.dossier.overview || result.dossier.keyContacts?.length > 0 || result.dossier.recentNews?.length > 0)) {
    md += `## Account Dossier\n\n`;
    if (result.dossier.overview) {
        md += `### Company Overview\n`;
        md += `${result.dossier.overview}\n\n`;
    }
    if (result.dossier.keyContacts?.length > 0) {
        md += `### Key Contacts\n`;
        result.dossier.keyContacts.forEach(item => {
            md += `* **${item.name}** - ${item.role} (${item.email})\n`;
        });
        md += `\n`;
    }
    if (result.dossier.recentNews?.length > 0) {
        md += `### Recent News/Events\n`;
        result.dossier.recentNews.forEach(item => {
            md += `* **${item.title}** (${item.source} - ${item.date})\n`;
            md += `  *${item.summary}*\n`;
        });
        md += `\n`;
    }
  }

  if (result.useCases && result.useCases.length > 0) {
    md += `## Salesforce Business Use Cases\n\n`;
    result.useCases.forEach(useCase => {
        md += `### ${useCase.title}\n\n`;
        md += `**Problem:** ${useCase.problem}\n\n`;
        md += `**Solution:** ${useCase.solution}\n\n`;
        md += `**Business Value:** ${useCase.businessValue}\n\n`;
        md += `---\n\n`;
    });
  }

  if (result.outreachTemplates && result.outreachTemplates.length > 0) {
    md += `## Outreach Templates\n\n`;
    result.outreachTemplates.forEach(template => {
        md += `### ${template.title} (${template.channel})\n\n`;
        md += `**Subject:** ${template.subject}\n\n`;
        md += `**Body:**\n${template.body}\n\n`;
        md += `---\n\n`;
    });
  }

  return md;
};

export const exportAsMarkdown = (result: AnalysisResult, companyName: string) => {
  const markdownContent = formatMarkdown(result, companyName);
  const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
  saveBlob(blob, `${companyName}_Dossier.md`);
};

// --- DOCX Export ---
const createDocxChildren = (result: AnalysisResult, companyName: string) => {
    const children: (Paragraph | TextRun)[] = [
        new Paragraph({ text: `Analysis for ${companyName}`, heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
    ];
    
    if (result.dossier && (result.dossier.overview || result.dossier.keyContacts?.length > 0 || result.dossier.recentNews?.length > 0)) {
        children.push(new Paragraph({ text: "Account Dossier", heading: HeadingLevel.HEADING_2 }));
        if (result.dossier.overview) {
            children.push(new Paragraph({ text: "Company Overview", heading: HeadingLevel.HEADING_3 }));
            children.push(new Paragraph({ text: result.dossier.overview }));
        }
        if (result.dossier.keyContacts?.length > 0) {
            children.push(new Paragraph({ text: "Key Contacts", heading: HeadingLevel.HEADING_3 }));
            result.dossier.keyContacts.forEach(item => children.push(new Paragraph({ text: `${item.name} - ${item.role} (${item.email})`, bullet: { level: 0 } })));
        }
        if (result.dossier.recentNews?.length > 0) {
            children.push(new Paragraph({ text: "Recent News/Events", heading: HeadingLevel.HEADING_3 }));
            result.dossier.recentNews.forEach(item => {
                children.push(new Paragraph({ text: `${item.title} (${item.source} - ${item.date})`, bullet: { level: 0 } }))
                children.push(new Paragraph({ text: item.summary, style: "Normal" }))
            });
        }
    }

    if (result.useCases && result.useCases.length > 0) {
        children.push(new Paragraph({ text: "Salesforce Business Use Cases", heading: HeadingLevel.HEADING_2 }));
        result.useCases.forEach(useCase => {
            children.push(new Paragraph({ text: useCase.title, heading: HeadingLevel.HEADING_3 }));
            children.push(new Paragraph({ children: [ new TextRun({ text: "Problem: ", bold: true }), new TextRun(useCase.problem) ] }));
            children.push(new Paragraph({ children: [ new TextRun({ text: "Solution: ", bold: true }), new TextRun(useCase.solution) ] }));
            children.push(new Paragraph({ children: [ new TextRun({ text: "Business Value: ", bold: true }), new TextRun(useCase.businessValue) ] }));
            children.push(new Paragraph(""));
        });
    }

    if (result.outreachTemplates && result.outreachTemplates.length > 0) {
        children.push(new Paragraph({ text: "Outreach Templates", heading: HeadingLevel.HEADING_2 }));
        result.outreachTemplates.forEach(template => {
            children.push(new Paragraph({ text: `${template.title} (${template.channel})`, heading: HeadingLevel.HEADING_3 }));
            children.push(new Paragraph({ children: [ new TextRun({ text: "Subject: ", bold: true }), new TextRun(template.subject) ] }));
            children.push(new Paragraph({ children: [ new TextRun({ text: "Body: ", bold: true }) ]}));
            template.body.split('\n').forEach(line => children.push(new Paragraph(line)));
            children.push(new Paragraph(""));
        });
    }

    return children as Paragraph[];
}


export const exportAsDocx = (result: AnalysisResult, companyName: string) => {
    const doc = new Document({
        sections: [{
            children: createDocxChildren(result, companyName)
        }]
    });

    Packer.toBlob(doc).then(blob => {
        saveBlob(blob, `${companyName}_Dossier.docx`);
    });
};


// --- PDF Export ---
export const exportAsPdf = (result: AnalysisResult, companyName: string) => {
  if (!result.dossier) return; // Dossier with companyName is required for filename
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 15;
  const maxLineWidth = pageWidth - margin * 2;
  let y = margin;
  
  const addText = (text: string, options: { size?: number; style?: 'bold' | 'normal'; isTitle?: boolean; isCentered?: boolean }) => {
    if (y > pageHeight - margin - 10) { // Add a buffer
      doc.addPage();
      y = margin;
    }
    const { size = 11, style = 'normal', isTitle = false, isCentered = false } = options;
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    const splitText = doc.splitTextToSize(text, maxLineWidth);
    
    let textX = margin;
    if (isCentered) {
        const textWidth = doc.getTextWidth(splitText[0]); // Check first line for centering
        textX = (pageWidth - textWidth) / 2;
        if (textX < margin) textX = margin;
    }

    doc.text(splitText, textX, y);
    y += (doc.getTextDimensions(splitText).h) + (isTitle ? 6 : 4);
  };
  
  addText(`Analysis for ${companyName}`, { size: 18, style: 'bold', isTitle: true, isCentered: true });
  y += 5;

  if (result.dossier && (result.dossier.overview || result.dossier.keyContacts?.length > 0 || result.dossier.recentNews?.length > 0)) {
    addText('Account Dossier', { size: 16, style: 'bold', isTitle: true });
    if (result.dossier.overview) {
        addText('Company Overview', { size: 14, style: 'bold', isTitle: true });
        addText(result.dossier.overview, { size: 10 });
        y += 5;
    }
    if (result.dossier.keyContacts?.length > 0) {
        addText('Key Contacts', { size: 14, style: 'bold', isTitle: true });
        result.dossier.keyContacts.forEach(item => {
            addText(`• ${item.name} - ${item.role} (${item.email})`, {size: 10});
        });
        y += 5;
    }
    if (result.dossier.recentNews?.length > 0) {
        addText('Recent News/Events', { size: 14, style: 'bold', isTitle: true });
        result.dossier.recentNews.forEach(item => {
            addText(`• ${item.title} (${item.source} - ${item.date})`, {size: 10, style: 'bold'});
            addText(item.summary, {size: 9});
        });
    }
  }
  
  if (result.useCases && result.useCases.length > 0) {
    if (y > pageHeight - 60) { 
        doc.addPage();
        y = margin;
    } else {
        y += 10;
    }
    addText('Salesforce Business Use Cases', { size: 16, style: 'bold', isTitle: true });
    result.useCases.forEach(useCase => {
        addText(useCase.title, { size: 14, style: 'bold', isTitle: true });
        addText(`Problem:`, { size: 11, style: 'bold'});
        addText(useCase.problem, { size: 10 });
        addText(`Solution:`, { size: 11, style: 'bold'});
        addText(useCase.solution, { size: 10 });
        addText(`Business Value:`, { size: 11, style: 'bold'});
        addText(useCase.businessValue, { size: 10 });
        y += 10;
    });
  }

  if (result.outreachTemplates && result.outreachTemplates.length > 0) {
    if (y > pageHeight - 60) {
        doc.addPage();
        y = margin;
    } else {
        y += 10;
    }
    addText('Outreach Templates', { size: 16, style: 'bold', isTitle: true });
    result.outreachTemplates.forEach(template => {
        addText(`${template.title} (${template.channel})`, { size: 14, style: 'bold', isTitle: true });
        addText(`Subject:`, { size: 11, style: 'bold'});
        addText(template.subject, { size: 10 });
        addText(`Body:`, { size: 11, style: 'bold'});
        addText(template.body, { size: 10 });
        y += 10;
    });
  }

  doc.save(`${companyName}_POV.pdf`);
};