<?php
require_once '../includes/comum.php';
require_once '../includes/header.php';
?>
<div class="grid-12-12">
	<button>Novo contato</button>
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
				<td class="table_contato_acoes">Ações</th>
			</tr>
		</tbody>
	</table>
</div>
<link rel="stylesheet" type="text/css" href="../resources/css/contatos.css" />
<script type="text/javascript" src="../resources/js/contatos.js"></script>
<?php
require_once '../includes/footer.php';
?>