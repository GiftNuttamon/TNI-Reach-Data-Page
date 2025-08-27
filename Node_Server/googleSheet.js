// googleSheet.js *****************เตรียมดาต้าเบสเรียบร้อยแล้ว**********************

const { google } = require("googleapis");
const path = require("path");

const KEYFILEPATH = path.join(__dirname, "solar-idea-470104-r0-83b7f2684f00.json"); 
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = "1G-htktut-n4Iy9hoZEWWKPsvlw44kDNlZw_Wb8YCDX0"; 

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

  // 1. ดึงข้อมูลที่มีอยู่ทั้งหมดจากชีตเพื่อหาจำนวนแถว
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:A`, // อ่านจากคอลัมน์ A เท่านั้นเพื่อความเร็ว
  });
  const existingRows = response.data.values ? response.data.values.length : 0;
  const newRowNumber = existingRows; // ลำดับใหม่ = จำนวนแถวเดิม + 1

  // 2. เพิ่มลำดับคนที่ลงในอาร์เรย์ values
  const updatedValues = [...values, newRowNumber];

  // 3. เพิ่มข้อมูลลงในชีต
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:Z`, 
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [updatedValues],
    },
  });
  console.log("✅ Data added to Google Sheets");
}

module.exports = { addRow };