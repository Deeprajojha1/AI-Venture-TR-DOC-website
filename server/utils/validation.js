export const requireFields = (body, fields) => {
  const missing = fields.filter((field) => !String(body[field] ?? "").trim());
  if (missing.length) {
    const error = new Error(`Missing required fields: ${missing.join(", ")}`);
    error.statusCode = 400;
    throw error;
  }
};
