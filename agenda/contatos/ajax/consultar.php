<?php
require_once '../../comum/php/comum.php';

// Contato
$contato = $db -> contato[$_POST['id']] -> fetch();
$contato -> data_nascimento = ($contato -> data_nascimento ? format_date($contato -> data_nascimento) : '');
if (!empty($contato -> foto_id)) {
	$foto_principal = $db -> foto[$contato -> foto_id] -> fetch();
	$contato -> foto_principal = array('nome_arquivo' => $foto_principal -> nome_arquivo, 'caminho_arquivo' => SITE_HOME . '/comum/imagens/uploads/' . $contato -> id . '/' . $foto_principal -> nome_arquivo, 'descricao' => $foto_principal -> descricao);
}

// Contato - telefone
$telefones = $db -> telefone(array('contato_id' => $contato -> id)) -> fetchAll();
if (count($telefones) > 0) {
	$contato -> telefones = array();
	foreach ($telefones as $telefone) {
		$contato -> telefones[] = $telefone -> numero;
	}
}

// Contato - e-mail
$emails = $db -> email(array('contato_id' => $contato -> id)) -> fetchAll();
if (count($emails) > 0) {
	$contato -> emails = array();
	foreach ($emails as $email) {
		$contato -> emails[] = $email -> endereco;
	}
}

// Contato - foto
$fotos = $db -> foto(array('contato_id' => $contato -> id)) -> fetchAll();
if (count($fotos) > 0) {
	$contato -> fotos = array();
	$diretorio_fotos_do_contato = UPLOADS_DIR . '/' . $contato -> id;
	foreach ($fotos as $foto) {
		$data_hora = format_datetime($foto -> data_hora);
		$data = substr($data_hora, 0, strpos($data_hora, ' '));
		$hora = substr($data_hora, strpos($data_hora, ' ') + 1);
		$contato -> fotos[] = array('nome_arquivo' => $foto -> nome_arquivo, 'caminho_arquivo' => SITE_HOME . '/comum/imagens/uploads/' . $contato -> id . '/' . $foto -> nome_arquivo, 'data' => $data, 'hora' => $hora, 'descricao' => $foto -> descricao);
	}
}

// Forma a resposta
ini_set('default_charset','utf8');
header("Content-Type: application/json; charset=UTF-8", true);
echo json_encode(get_object_vars($contato));
?>