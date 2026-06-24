import { buildMarkdownBundle, buildPdfBuffer } from "./exportService.js";

export const sendProjectEmail = async ({ to, project, reports }) => {
  const required = ["RESEND_API_KEY", "RESEND_FROM"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    return { status: "skipped", reason: `Missing Resend variables: ${missing.join(", ")}` };
  }

  const markdown = buildMarkdownBundle(project, reports);
  const pdf = await buildPdfBuffer(project, reports);
  const payload = {
    from: process.env.RESEND_FROM,
    to: [to],
    subject: `${project.startupName} Venture Blueprint`,
    text: "Attached is your AI Venture Studio blueprint.",
    reply_to: process.env.RESEND_REPLY_TO || undefined,
    attachments: [
      {
        filename: "venture-blueprint.md",
        content: Buffer.from(markdown, "utf8").toString("base64")
      },
      {
        filename: "venture-blueprint.pdf",
        content: pdf.toString("base64")
      }
    ]
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || `Resend email failed with HTTP ${response.status}`);
    error.statusCode = 502;
    throw error;
  }

  return { status: "sent", provider: "resend", id: data.id };
};
