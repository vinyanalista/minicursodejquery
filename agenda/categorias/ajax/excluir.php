<?php
require_once '../../comum/php/comum.php';
$categoria = $db -> categoria[$_POST['id']] -> fetch();
$db -> categoria -> remove($categoria);
$db -> flush();
echo TRUE;
?>
