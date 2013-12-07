<?php
require_once '../comum/php/comum.php';
require_once '../comum/php/header.php';
?>
<form class="formee" id="form_contato">
	<div class="grid-12-12">
		<label for="remetente">De</label>
		<input id="remetente" name="remetente" type="text" placeholder="Remetente" class="required" />
	</div>
	<div class="grid-12-12">
		<label for="destinatarios">Para</label>
		<input id="destinatarios" name="destinatarios" type="text" placeholder="Destinatários" class="required" />
	</div>
	<div class="grid-12-12">
		<label for="assunto">Assunto</label>
		<input id="assunto" name="assunto" type="text" placeholder="Assunto" />
	</div>
	<div class="grid-12-12">
		<label for="mensagem">Mensagem</label>
		<textarea id="mensagem" name="mensagem"></textarea>
	</div>
	<div class="grid-12-12">
		<button class="botao_com_icone" id="btn_enviar" name="enviar" type="submit">
			<span class='icone icone_22x22 icone_enviar'>Enviar</span>
		</button>
	</div>
</form>
<link rel="stylesheet" type="text/css" href="css/email.css" />
<script type="text/javascript" src="js/email.js"></script>
<?php
require_once '../comum/php/footer.php';
?>