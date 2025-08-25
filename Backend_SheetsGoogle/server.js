const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { addRow } = require("./googleSheet.js"); // นำเข้าฟังก์ชัน addRow

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Route สำหรับรับข้อมูลจากฟอร์ม
app.post("/submit", async (req, res) => {
  try {
    const { fname, lname, grade, email, phone } = req.body;
    
    // สร้างอาร์เรย์ของข้อมูลตามลำดับคอลัมน์ใน Google Sheets
    const rowData = [
      fname, 
      lname, 
      grade, 
      email, 
      phone, 
      new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }), 
      "คนที่" 
    ];
    
    // เรียกใช้ฟังก์ชัน addRow จากไฟล์ googleSheet.js
    await addRow("Info", rowData);
    res.send("✅ บันทึกข้อมูลเรียบร้อย");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ เกิดข้อผิดพลาด");
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});