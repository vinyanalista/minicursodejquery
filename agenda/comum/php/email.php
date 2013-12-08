<?php
function enviar_email($para, $assunto, $conteudo, $html = false, $de = SMTP_FROM) {
	require_once 'Mail.php';

	$smtp = &Mail::factory('smtp', array('host' => SMTP_HOST, 'port' => SMTP_PORT,
	'auth' => true, 'debug' => false, 'username' => SMTP_USERNAME, 'password' => SMTP_PASSWORD));

	$headers = array('From' => $de, 'To' => $para, 'Subject' => $assunto);

	if ($html) {
		require_once 'Mail/mime.php';
		$mime = new Mail_mime( array('eol' => "\n"));

		$mime -> setHTMLBody($conteudo);
		$conteudo = $mime -> get();
		$headers = $mime -> headers($headers);
	}

	@$envio = $smtp -> send($para, $headers, $conteudo);
	return !PEAR::isError($envio);
}
?>
