import { Resume } from '../types/Resume';

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

export const downloadResume = (data: Resume) => {
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