<?php
require_once '../includes/comum.php';
require_once '../includes/header.php';
?>
<div class="grid-12-12">
	<button>Nova categoria</button>
</div>
<div class="grid-12-12">
	<table id="table_categoria" class="display">
		<thead>
			<tr>
				<th>Nome</th>
				<th>Contatos</th>
				<th class="table_categoria_acoes">Ações</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Amigos</td>
				<td>1</td>
				<td class="table_categoria_acoes">Ações</th>
			</tr>
		</tbody>
	</table>
</div>
<link rel="stylesheet" type="text/css" href="../resources/css/categorias.css" />
<script type="text/javascript" src="../resources/js/categorias.js"></script>
<?php
require_once '../includes/footer.php';
?>