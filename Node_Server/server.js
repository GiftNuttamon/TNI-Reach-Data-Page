//วิธีเปิดดาต้าเบส open new terminal > cd Node_Server > node server.js จะมีแจ้งเตือน ✅ Data added to Google Sheets

const express = require("express"); //ใช้ express
const bodyParser = require("body-parser");
const cors = require("cors"); //Install Cors
const path = require("path");
const { addRow } = require("./googleSheet.js");  //เรียกใช้ Node googleSheets.js

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // เพิ่มบรรทัดนี้เพื่อรองรับข้อมูลจากฟอร์ม HTML
app.use(cors());

// Route สำหรับรับข้อมูลจากฟอร์ม
app.post("/submit", async (req, res) => {
  try {
    const { title, fname, lname, grade, email, phone, lineid, country, province, level, fac, major } = req.body;
    
    // ตรวจสอบว่า country เป็นไทย
    let provinceValue = "";
    if (country === "ไทย" || country.toLowerCase() === "thailand") {
      if (!province || province.trim() === "") {
        return res.status(400).send("❌ โปรดเลือกจังหวัดด้วย"); // ถ้าไม่กรอกจะ error
      }
      provinceValue = province;
    }

    const rowData = [
      title,
      fname, 
      lname, 
      grade, 
      email, 
      phone, 
      lineid,
      country,
      province,
      level,
      fac,
      major,
      new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }), 
    ];
    
    // เรียกใช้ฟังก์ชัน addRow จากไฟล์ googleSheet.js
    await addRow("INFO1", rowData); //ชีตแผ่นชื่อ INFO1
    res.send("✅ บันทึกข้อมูลเรียบร้อย"); //popup nofi
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ เกิดข้อผิดพลาด"); //popup nofi unsuccess
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000"); // port
});