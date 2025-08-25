const express = require("express");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// โหลด credentials.json ที่โหลดมาจาก Google Cloud Console
const KEYFILEPATH = path.join(__dirname, "credentials.json");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = "1G-htktut-n4Iy9hoZEWWKPsvlw44kDNlZw_Wb8YCDX0"; // ใส่ ID จากลิงก์ Google Sheet ของคุณ

async function addRow(values) {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A:Z", // ต้องมี Sheet1 ในไฟล์
    valueInputOption: "RAW",
    requestBody: {
      values: [values],
    },
  });
}

// Route รับข้อมูลจากฟอร์ม
app.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await addRow([name, email, message, new Date().toLocaleString()]);
    res.send("✅ บันทึกข้อมูลเรียบร้อย");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ เกิดข้อผิดพลาด");
  }
});

// เริ่มเซิร์ฟเวอร์
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
