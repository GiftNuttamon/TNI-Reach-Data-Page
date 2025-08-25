// googleSheet.js
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

async function addRow(sheetName, values) {
  const authClient = await getAuthClient();
  const sheets = google.sheets({ version: "v4", auth: authClient });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:Z`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values],
    },
  });
  console.log("✅ Data added to Google Sheets");
}

module.exports = { addRow };