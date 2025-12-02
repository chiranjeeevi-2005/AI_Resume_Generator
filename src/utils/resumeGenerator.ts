import { Resume } from '../types/Resume';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

export const generateResumeHTML = (data: Resume): string => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const groupSkillsByCategory = () => {
    return data.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof data.skills>);
  };

  const skillsByCategory = groupSkillsByCategory();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.fullName} - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
        }
        
        .resume-container {
            max-width: 800px;
            margin: 20px auto;
            background: white;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #2563eb, #7c3aed);
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 15px;
        }
        
        .contact-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            font-size: 0.9rem;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: #2563eb;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #2563eb;
        }
        
        .summary {
            font-size: 1rem;
            line-height: 1.7;
            color: #555;
        }
        
        .experience-item {
            margin-bottom: 25px;
            padding-left: 20px;
            border-left: 2px solid #e5e7eb;
            position: relative;
        }
        
        .experience-item::before {
            content: '';
            position: absolute;
            left: -6px;
            top: 5px;
            width: 10px;
            height: 10px;
            background: #2563eb;
            border-radius: 50%;
        }
        
        .job-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 5px;
        }
        
        .company {
            font-size: 1rem;
            font-weight: 500;
            color: #2563eb;
            margin-bottom: 5px;
        }
        
        .date-range {
            font-size: 0.9rem;
            color: #6b7280;
            margin-bottom: 10px;
        }
        
        .job-description {
            margin-bottom: 10px;
            color: #555;
        }
        
        .achievements {
            list-style: none;
            padding-left: 0;
        }
        
        .achievements li {
            margin-bottom: 5px;
            padding-left: 20px;
            position: relative;
            color: #555;
        }
        
        .achievements li::before {
            content: '▸';
            position: absolute;
            left: 0;
            color: #2563eb;
            font-weight: bold;
        }
        
        .education-item {
            margin-bottom: 20px;
        }
        
        .degree {
            font-size: 1.1rem;
            font-weight: 600;
            color: #1f2937;
        }
        
        .institution {
            font-size: 1rem;
            font-weight: 500;
            color: #2563eb;
            margin-bottom: 5px;
        }
        
        .skills-category {
            margin-bottom: 20px;
        }
        
        .skills-category h4 {
            font-size: 1rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 10px;
        }
        
        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .skill-tag {
            background: #eff6ff;
            color: #1d4ed8;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
        }
        
        @media print {
            body { background: white; }
            .resume-container { 
                box-shadow: none; 
                margin: 0;
                border-radius: 0;
            }
        }
        
        @media (max-width: 600px) {
            .contact-info {
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <header class="header">
            <h1>${data.personalInfo.fullName}</h1>
            <div class="contact-info">
                ${data.personalInfo.email ? `<div class="contact-item">📧 ${data.personalInfo.email}</div>` : ''}
                ${data.personalInfo.phone ? `<div class="contact-item">📞 ${data.personalInfo.phone}</div>` : ''}
                ${data.personalInfo.location ? `<div class="contact-item">📍 ${data.personalInfo.location}</div>` : ''}
                ${data.personalInfo.linkedin ? `<div class="contact-item">💼 ${data.personalInfo.linkedin.replace('https://', '')}</div>` : ''}
                ${data.personalInfo.website ? `<div class="contact-item">🌐 ${data.personalInfo.website.replace('https://', '')}</div>` : ''}
            </div>
        </header>
        
        <div class="content">
            ${data.summary ? `
            <section class="section">
                <h2 class="section-title">Professional Summary</h2>
                <p class="summary">${data.summary}</p>
            </section>
            ` : ''}
            
            ${data.experience.length > 0 ? `
            <section class="section">
                <h2 class="section-title">Work Experience</h2>
                ${data.experience.map(exp => `
                    <div class="experience-item">
                        <h3 class="job-title">${exp.position}</h3>
                        <div class="company">${exp.company}</div>
                        <div class="date-range">
                            ${formatDate(exp.startDate)} - ${exp.isCurrentRole ? 'Present' : formatDate(exp.endDate)}
                        </div>
                        ${exp.description ? `<p class="job-description">${exp.description}</p>` : ''}
                        ${exp.achievements.some(ach => ach.trim()) ? `
                            <ul class="achievements">
                                ${exp.achievements.filter(ach => ach.trim()).map(achievement => `
                                    <li>${achievement}</li>
                                `).join('')}
                            </ul>
                        ` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}
            
            ${data.education.length > 0 ? `
            <section class="section">
                <h2 class="section-title">Education</h2>
                ${data.education.map(edu => `
                    <div class="education-item">
                        <div class="degree">${edu.degree} in ${edu.field}</div>
                        <div class="institution">${edu.institution}</div>
                        <div class="date-range">
                            Graduated ${formatDate(edu.graduationDate)}
                            ${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                        </div>
                    </div>
                `).join('')}
            </section>
            ` : ''}
            
            ${data.skills.length > 0 ? `
            <section class="section">
                <h2 class="section-title">Skills</h2>
                ${Object.entries(skillsByCategory).map(([category, skills]) => `
                    <div class="skills-category">
                        <h4>${category}</h4>
                        <div class="skills-list">
                            ${skills.map(skill => `
                                <span class="skill-tag">${skill.name} (${skill.level})</span>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </section>
            ` : ''}
        </div>
    </div>
</body>
</html>`;
};

export const downloadResumeHTML = (data: Resume) => {
  const html = generateResumeHTML(data);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadResumePDF = async (data: Resume) => {
  // Create a temporary div with the resume HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = generateResumeHTML(data);
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '800px';
  document.body.appendChild(tempDiv);

  try {
    const canvas = await html2canvas(tempDiv.querySelector('.resume-container') as HTMLElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
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

    pdf.save(`${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
  } finally {
    document.body.removeChild(tempDiv);
  }
};

export const downloadResumeWord = async (data: Resume) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const groupSkillsByCategory = () => {
    return data.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof data.skills>);
  };

  const skillsByCategory = groupSkillsByCategory();

  const children = [];

  // Header
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.personalInfo.fullName,
          bold: true,
          size: 32,
          color: '2563EB'
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    })
  );

  // Contact Info
  const contactInfo = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.linkedin?.replace('https://', ''),
    data.personalInfo.website?.replace('https://', '')
  ].filter(Boolean).join(' • ');

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: contactInfo,
          size: 20
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    })
  );

  // Professional Summary
  if (data.summary) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'PROFESSIONAL SUMMARY',
            bold: true,
            size: 24,
            color: '2563EB'
          })
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: data.summary,
            size: 22
          })
        ],
        spacing: { after: 400 }
      })
    );
  }

  // Work Experience
  if (data.experience.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'WORK EXPERIENCE',
            bold: true,
            size: 24,
            color: '2563EB'
          })
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 }
      })
    );

    data.experience.forEach(exp => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.position,
              bold: true,
              size: 22
            })
          ],
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: exp.company,
              bold: true,
              size: 20,
              color: '2563EB'
            })
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${formatDate(exp.startDate)} - ${exp.isCurrentRole ? 'Present' : formatDate(exp.endDate)}`,
              size: 18,
              italics: true
            })
          ],
          spacing: { after: 200 }
        })
      );

      if (exp.description) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: exp.description,
                size: 20
              })
            ],
            spacing: { after: 200 }
          })
        );
      }

      exp.achievements.filter(ach => ach.trim()).forEach(achievement => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `• ${achievement}`,
                size: 20
              })
            ],
            spacing: { after: 100 }
          })
        );
      });
    });
  }

  // Education
  if (data.education.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'EDUCATION',
            bold: true,
            size: 24,
            color: '2563EB'
          })
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    data.education.forEach(edu => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.degree} in ${edu.field}`,
              bold: true,
              size: 22
            })
          ],
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: edu.institution,
              bold: true,
              size: 20,
              color: '2563EB'
            })
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Graduated ${formatDate(edu.graduationDate)}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}`,
              size: 18,
              italics: true
            })
          ],
          spacing: { after: 200 }
        })
      );
    });
  }

  // Skills
  if (data.skills.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'SKILLS',
            bold: true,
            size: 24,
            color: '2563EB'
          })
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 }
      })
    );

    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: category,
              bold: true,
              size: 20
            })
          ],
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: skills.map(skill => `${skill.name} (${skill.level})`).join(' • '),
              size: 20
            })
          ],
          spacing: { after: 200 }
        })
      );
    });
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children: children
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  saveAs(blob, `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.docx`);
};

export const downloadResume = (data: Resume, format: 'html' | 'pdf' | 'word' = 'html') => {
  switch (format) {
    case 'pdf':
      return downloadResumePDF(data);
    case 'word':
      return downloadResumeWord(data);
    default:
      return downloadResumeHTML(data);
  }
};