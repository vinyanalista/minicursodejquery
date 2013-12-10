<?php
require_once '../comum/php/comum.php';
require_once '../comum/php/header.php';
?>
<form class="formee" id="form_email">
	<div class="grid-12-12">
		<label for="remetente">De</label>
		<input id="remetente" name="remetente" type="text" placeholder="Remetente" class="required" value="<?=SMTP_FROM?>" />
	</div>
	<div class="grid-12-12">
		<label for="ipt_destinatarios">Para</label>
		<input id="ipt_destinatarios" name="destinatarios" type="text" placeholder="Destinatário(s)" class="required" />
		<ul id="ul_destinatarios"></ul>
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
<?php if (isset($_GET['enviar_para'])) echo '<input type="hidden" id="enviar_para" value="'.$_GET['enviar_para'].'">'; ?>

<!-- CSS -->
<link rel="stylesheet" type="text/css" href="../../lib/tag-it/css/jquery.tagit.css" />
<link rel="stylesheet" type="text/css" href="css/email.css" />

<!-- Scripts -->
<script type="text/javascript" src="../../lib/tag-it/js/tag-it.min.js"></script>
<script type="text/javascript" src="js/email.js"></script>
<?php
require_once '../comum/php/footer.php';
?>