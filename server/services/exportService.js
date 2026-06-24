import PDFDocument from "pdfkit";

export const buildMarkdownBundle = (project, reports) => {
  const title = `# ${project.startupName || project.name} Venture Blueprint`;
  const body = reports.map((report) => `\n\n---\n\n${report.content}`).join("");
  return `${title}\n\nIndustry: ${project.industry}\nTarget Users: ${project.targetUsers}\nCountry: ${project.country}\n${body}\n`;
};

export const buildJsonBundle = (project, reports) => ({
  project,
  reports,
  exportedAt: new Date().toISOString()
});

export const streamPdfBundle = (res, project, reports) => {
  const doc = new PDFDocument({ margin: 48 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${(project.startupName || "venture").replace(/\W+/g, "-").toLowerCase()}-blueprint.pdf"`);
  doc.pipe(res);
  doc.fontSize(20).text(`${project.startupName || project.name} Venture Blueprint`, { underline: true });
  doc.moveDown();
  doc.fontSize(10).text(`Industry: ${project.industry}`);
  doc.text(`Target Users: ${project.targetUsers}`);
  doc.text(`Country: ${project.country}`);
  reports.forEach((report) => {
    doc.addPage();
    doc.fontSize(16).text(report.outputFile, { underline: true });
    doc.moveDown();
    doc.fontSize(10).text(report.content);
  });
  doc.end();
};

export const buildPdfBuffer = (project, reports) => new Promise((resolve, reject) => {
  const chunks = [];
  const doc = new PDFDocument({ margin: 48 });
  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => resolve(Buffer.concat(chunks)));
  doc.on("error", reject);

  doc.fontSize(20).text(`${project.startupName || project.name} Venture Blueprint`, { underline: true });
  doc.moveDown();
  doc.fontSize(10).text(`Industry: ${project.industry}`);
  doc.text(`Target Users: ${project.targetUsers}`);
  doc.text(`Country: ${project.country}`);
  reports.forEach((report) => {
    doc.addPage();
    doc.fontSize(16).text(report.outputFile, { underline: true });
    doc.moveDown();
    doc.fontSize(10).text(report.content);
  });
  doc.end();
});
