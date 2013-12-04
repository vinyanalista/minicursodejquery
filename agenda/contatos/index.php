<?php
require_once '../includes/comum.php';
require_once '../includes/header.php';
?>
<div class="grid-12-12">
	<button class="botao_com_icone" id="btn_novo_contato"><span class='icone icone_22x22 icone_novo_contato'>Novo contato</span></button>
</div>
<div class="grid-12-12">
	<table id="table_contato" class="display">
		<thead>
			<tr>
				<th>Nome</th>
				<th>Telefone</th>
				<th>E-mail</th>
				<th class="table_contato_acoes">Ações</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Antônio</td>
				<td>(79)8825-2334</td>
				<td>vinyanalista@gmail.com</td>
				<td class="table_contato_acoes"><div class='acoes_wrapper'><a href='#' class='icone icone_24x24 icone_editar link_editar_contato tooltipster' data-contato_id='1' title='Editar'></a><a href='#' class='icone icone_24x24 icone_excluir link_excluir_contato tooltipster' title='Excluir'></a></div></td>
			</tr>
		</tbody>
	</table>
</div>
<link rel="stylesheet" type="text/css" href="../resources/css/contatos.css" />
<script type="text/javascript" src="../resources/js/contatos.js"></script>
<?php
require_once '../includes/footer.php';
?>