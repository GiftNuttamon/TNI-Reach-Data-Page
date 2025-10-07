<?php
include 'db_connect.php';

$sql = "SELECT * FROM dashboardTNI ORDER BY timestamp DESC";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}
echo json_encode($data, JSON_UNESCAPED_UNICODE);
$conn->close();
?>
