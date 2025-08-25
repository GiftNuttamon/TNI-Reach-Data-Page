// googleSheet.js
const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

// โหลด service account key (ต้องโหลดจาก Google Cloud Console)
// ไฟล์ .json ที่ได้จากการสร้าง Service Account
const KEYFILEPATH = path.join(__dirname, "credentials.json"); 
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// spreadsheet ID จาก URL ของคุณ
const SPREADSHEET_ID = "1G-htktut-n4Iy9hoZEWWKPsvlw44kDNlZw_Wb8YCDX0"; 

// ฟังก์ชันสร้าง client
async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
  return await auth.getClient();
}

// ฟังก์ชันเพิ่มข้อมูลลง Google Sheets
async function addRow(sheetName, values) {
  const authClient = await getAuthClient();
  const sheets = google.sheets({ version: "v4", auth: authClient });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:Z`, // sheetName คือชื่อชีต เช่น "Sheet1"
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values], // ใส่ array ของข้อมูล เช่น ["ชื่อ", "อีเมล", "ข้อความ"]
    },
  });
  console.log("✅ Data added to Google Sheets");
}

module.exports = { addRow };
