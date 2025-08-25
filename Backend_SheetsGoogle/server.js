const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors middleware
const { google } = require("googleapis");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

const KEYFILEPATH = path.join(__dirname, "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = "1G-htktut-n4Iy9hoZEWWKPsvlw44kDNlZw_Wb8YCDX0";

async function addRow(values) {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Info!A:Z", // เปลี่ยนชื่อชีตจาก "Sheet1" เป็น "Info" เพื่อให้ตรงกับรูปภาพของคุณ
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values],
    },
  });
}

// Route รับข้อมูลจากฟอร์ม
app.post("/submit", async (req, res) => {
  try {
    const { fname, lname, grade, email, phone } = req.body;
    
    // สร้างอาร์เรย์ของข้อมูลตามลำดับคอลัมน์ใน Google Sheets
    // A: ชื่อ, B: นามสกุล, C: ระดับชั้น, D: อีเมล, E: เบอร์, F: TimeStamp, G: คนที่
    const rowData = [
      fname, 
      lname, 
      grade, 
      email, 
      phone, 
      new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }), // เพิ่ม TimeStamp
      "คนที่" // เพิ่มข้อมูล 'คนที่'
    ];
    
    await addRow(rowData);
    res.send("✅ บันทึกข้อมูลเรียบร้อย");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ เกิดข้อผิดพลาด");
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});