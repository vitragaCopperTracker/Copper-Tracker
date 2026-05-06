// pages/api/test-env.js
export default function handler(req, res) {
  res.json({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ? "set" : "missing",
  });
}
