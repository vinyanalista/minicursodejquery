<?php
require_once '../comum.php';
require_once '../comum/php/header.php';
?>
<div class="grid-12-12">
	<button class="botao_com_icone" id="btn_nova_categoria"><span class='icone icone_22x22 icone_nova_categoria'>Nova categoria</span></button>
</div>
<div class="grid-12-12">
	<table id="table_categoria" class="display">
		<thead>
			<tr>
				<th>Nome</th>
				<th class="table_categoria_contatos">Contatos</th>
				<th class="table_categoria_acoes">Ações</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</div>
<div id="editor_de_categoria" title="Editor de categoria">
	<form class="formee" id="form_categoria">
		<input id="acao" name="acao" type="hidden" value="inserir" />
		<input id="id" name="id" type="hidden" />
		<div class="grid-12-12">
			<label for="nome">Nome</label>
			<input id="nome" name="nome" type="text" placeholder="Nome" class="required" />
		</div>
		<div class="grid-12-12">
			<table id="table_contato_categoria" class="display">
				<thead>
					<tr>
						<th>Nome</th>
						<th class="table_contato_categoria_pertence">Pertence</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</form>
</div>
<link rel="stylesheet" type="text/css" href="css/categorias.css" />
<script type="text/javascript" src="js/categorias.js"></script>
<?php
require_once '../comum/php/footer.php';
?>