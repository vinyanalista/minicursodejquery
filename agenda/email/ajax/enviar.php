<?php
sleep(5);
echo TRUE; exit; // Não envia o e-mail de verdade
require_once '../../comum/php/comum.php';
$remetente = $_POST['remetente'];
$destinatarios = array();
// Contatos
if (isset($_POST['email'])) {
	foreach ($_POST['email'] as $email) {
		$destinatarios[] = $email;
	}
}
// Categorias
if (isset($_POST['categoria_id'])) {
	foreach ($_POST['categoria_id'] as $categoria_id) {
		$emails = $db -> email -> contato -> categoria[$categoria_id] -> fetchAll();
		foreach ($emails as $email) {
			$destinatarios[] = $email -> endereco;
		}
	}
}
$assunto = $_POST['assunto'];
$mensagem = $_POST['mensagem'];
foreach ($destinatarios as $destinatario) {
	if (!enviar_email($destinatario, $assunto, $mensagem, TRUE, $remetente)) {
		echo FALSE;
		exit;
	}
}
echo TRUE;
?>