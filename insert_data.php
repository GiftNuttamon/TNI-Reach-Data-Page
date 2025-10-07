<?php
include 'db_connect.php';

// รับค่าจากฟอร์ม (POST)
$title = $_POST['title'];
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$grade = $_POST['grade'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$country = $_POST['country'];
$province = $_POST['province'];
$level = $_POST['level'];


$sql = "INSERT INTO inquiries (title, fname, lname, grade, email, phone, country, province, level, timestamp)
VALUES ('$title','$fname','$lname','$grade','$email','$phone', '$country','$province','$level', NOW())";

if ($conn->query($sql) === TRUE) {
  echo "success";
} else {
  echo "error: " . $conn->error;
}
$conn->close();
?>
