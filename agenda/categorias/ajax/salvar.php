<?php
require_once '../../comum.php';

$cadastro = ($_POST['acao'] == 'inserir');
if ($cadastro) {
	$categoria = new Categoria();
} else {
	$categoria = $db -> categoria[$_POST['id']] -> fetch();
}
$categoria -> nome = $_POST['nome'];
$db -> categoria -> persist($categoria);
$db -> flush();
echo TRUE;
?>