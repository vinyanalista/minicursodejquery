<?php
require_once '../../comum.php';

$categoria = $db -> categoria[$_POST['id']] -> fetch();

// Forma a resposta
ini_set('default_charset','utf8');
header("Content-Type: application/json; charset=UTF-8", true);
echo json_encode(get_object_vars($categoria));
?>