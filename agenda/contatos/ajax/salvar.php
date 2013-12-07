<?php
require_once '../../comum/php/comum.php';

/* Contato */

$cadastro = ($_POST['acao'] == 'cadastrar');
if ($cadastro) {
	$contato = new Contato();
} else {
	$contato = $db -> contato[$_POST['id']] -> fetch();
}
$contato -> nome = $_POST['nome'];
$contato -> apelido = $_POST['apelido'];
$contato -> data_nascimento = ($_POST['data_nascimento'] ? format_date($_POST['data_nascimento'], TRUE) : NULL);
$contato -> logradouro = $_POST['logradouro'];
$contato -> numero = ($_POST['numero'] ? $_POST['numero'] : NULL);
$contato -> bairro = $_POST['bairro'];
$contato -> cidade = $_POST['cidade'];
$contato -> estado = $_POST['estado'];
$db -> contato -> persist($contato);
$db -> flush();

/* Contato - categoria */

if (!$cadastro) {
	$mysqli -> query('DELETE FROM contato_categoria WHERE contato_id = ' . $contato -> id);
}
if (!empty($_POST['categoria_id'])) {
	foreach ($_POST['categoria_id'] as $categoria_id) {
		$mysqli -> query('INSERT INTO contato_categoria (contato_id, categoria_id) VALUES (' . $contato -> id . ', ' . $categoria_id . ');');
	}
}

echo TRUE;
?>