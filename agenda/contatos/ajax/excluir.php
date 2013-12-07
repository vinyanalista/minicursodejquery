<?php
require_once '../../comum.php';
$contato = $db -> contato[$_POST['id']] -> fetch();
$db -> contato -> remove($contato);
$db -> flush();
echo TRUE;
?>
