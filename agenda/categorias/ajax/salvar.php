<?php
require_once '../../comum/php/comum.php';

/* Categoria */

$cadastro = ($_POST['acao'] == 'cadastrar');
if ($cadastro) {
	$categoria = new Categoria();
} else {
	$categoria = $db -> categoria[$_POST['id']] -> fetch();
}
$categoria -> nome = $_POST['nome'];
$db -> categoria -> persist($categoria);
$db -> flush();

/* Contato - categoria */

if (!$cadastro) {
	$mysqli -> query('DELETE FROM contato_categoria WHERE categoria_id = ' . $categoria -> id);
}
if (!empty($_POST['contato_id'])) {
	foreach ($_POST['contato_id'] as $contato_id) {
		$mysqli -> query('INSERT INTO contato_categoria (contato_id, categoria_id) VALUES (' . $contato_id . ', ' . $categoria -> id . ');');
	}
}

echo TRUE;
?>