<?php
require_once '../comum.php';
require_once '../comum/php/header.php';
?>
<div class="grid-12-12">
	<button class="botao_com_icone" id="btn_novo_contato"><span class='icone icone_22x22 icone_novo_contato'>Novo contato</span></button>
</div>
<div class="grid-12-12">
	<table id="table_contato" class="display">
		<thead>
			<tr>
				<th>Nome</th>
				<th class="table_contato_acoes">Ações</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</div>
<link rel="stylesheet" type="text/css" href="css/contatos.css" />
<script type="text/javascript" src="js/contatos.js"></script>
<?php
require_once '../comum/php/footer.php';
?>
