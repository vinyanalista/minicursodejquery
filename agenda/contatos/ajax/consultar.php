<?php
require_once '../../comum/php/comum.php';

// Contato
$contato = $db -> contato[$_POST['id']] -> fetch();
$contato -> data_nascimento = ($contato -> data_nascimento ? format_date($contato -> data_nascimento) : '');
if (!empty($contato -> foto_id)) {
	$contato -> foto_principal = $db -> foto[$contato -> foto_id] -> fetch() -> nome_arquivo;
}

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

// Contato - foto
$diretorio_fotos_do_contato = UPLOADS_DIR . '/' . $contato -> id;
$fotos = $db -> foto(array('contato_id' => $contato -> id)) -> fetchAll();
$contato -> fotos = array();
foreach ($fotos as $foto) {
	$contato -> fotos[] = array('nome_arquivo' => $foto -> nome_arquivo, 'caminho_arquivo' => SITE_HOME . '/comum/imagens/uploads/' . $contato -> id . '/' . $foto -> nome_arquivo, 'descricao' => $foto -> descricao);
}

// Forma a resposta
ini_set('default_charset','utf8');
header("Content-Type: application/json; charset=UTF-8", true);
echo json_encode(get_object_vars($contato));
?>