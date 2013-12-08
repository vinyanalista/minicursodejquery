<?php
require_once '../../comum/php/comum.php';

// Contato
$contato = $db -> contato[$_POST['id']] -> fetch();
$contato -> data_nascimento = ($contato -> data_nascimento ? format_date($contato -> data_nascimento) : '');

// Contato - telefone
$telefones = $db -> telefone(array('contato_id' => $contato -> id)) -> fetchAll();
$contato -> telefones = array();
foreach ($telefones as $telefone) {
	$contato -> telefones[] = $telefone -> numero;
}

// Contato - e-mail
$emails = $db -> email(array('contato_id' => $contato -> id)) -> fetchAll();
$contato -> emails = array();
foreach ($emails as $email) {
	$contato -> emails[] = $email -> endereco;
}

// Forma a resposta
ini_set('default_charset','utf8');
header("Content-Type: application/json; charset=UTF-8", true);
echo json_encode(get_object_vars($contato));
?>