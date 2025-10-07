<?php
$servername = "localhost";
$username = "root"; // ค่าเริ่มต้นของ XAMPP
$password = "";     // ปกติว่าง
$dbname = "tnidata";

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
mysqli_set_charset($conn, "utf8"); // รองรับภาษาไทย
?>
