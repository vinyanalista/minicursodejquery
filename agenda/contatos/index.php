<?php
require_once '../comum/php/comum.php';
require_once '../comum/php/header.php';
?>
<div class="grid-12-12">
	<button class="botao_com_icone" id="btn_novo_contato">
		<span class='icone icone_22x22 icone_novo_contato'>Novo contato</span>
	</button>
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
<div id="editor_de_contato" title="Editor de contato">
	<form class="formee" id="form_contato">
		<input id="acao" name="acao" type="hidden" value="cadastrar" />
		<input id="id" name="id" type="hidden" />
		<div id="editor_de_contato_tabs">
			<ul>
				<li>
					<a href="#tab-informacoes-pessoais">Informações pessoais</a>
				</li>
				<li>
					<a href="#tab-fotos">Fotos</a>
				</li>
				<li>
					<a href="#tab-contato_categoria">Categorias</a>
				</li>
			</ul>
			<div id="tab-informacoes-pessoais">
				<div class="grid-12-12">
					<label for="nome">Nome</label>
					<input id="nome" name="nome" type="text" placeholder="Nome" class="required" />
				</div>
				<div class="grid-6-12">
					<label for="apelido">Apelido</label>
					<input id="apelido" name="apelido" type="text" placeholder="Apelido" />
				</div>
				<div class="grid-6-12">
					<label for="data_nascimento">Data de nascimento</label>
					<input id="data_nascimento" class="data" name="data_nascimento" type="text" />
				</div>
				
				<div class="grid-6-12">
					<div class="contato_telefone primeiro">
						<div class="grid-10-12">
							<label>Telefone</label>
							<input class="telefone" name="telefone[]" type="text" placeholder="Telefone" maxlength="15" />
						</div>
						<div class="grid-2-12">
							<button class="botao_com_icone btn_excluir btn_excluir_telefone tooltipster" title="Excluir telefone">
								<span class='icone icone_22x22 icone_excluir'></span>
							</button>
						</div>
					</div>
					<div class="grid-12-12">
						<button class="botao_com_icone btn_adicionar" id="btn_adicionar_telefone">
							<span class='icone icone_22x22 icone_adicionar'>Adicionar telefone</span>
						</button>
					</div>
				</div>
				<div class="grid-6-12">
					<p>Aqui virá e-mail.</p>
				</div>
				
				<div class="grid-10-12">
					<label for="logradouro">Logradouro</label>
					<input id="logradouro" name="logradouro" type="text" placeholder="Logradouro" />
				</div>
				<div class="grid-2-12">
					<label for="numero">Número</label>
					<input id="numero" class="numero" name="numero" type="text" placeholder="Número" />
				</div>
				<div class="grid-4-12">
					<label for="bairro">Bairro</label>
					<input id="bairro" name="bairro" type="text" placeholder="Bairro" />
				</div>
				<div class="grid-4-12">
					<label for="cidade">Cidade</label>
					<input id="cidade" name="cidade" type="text" placeholder="Cidade" />
				</div>
				<div class="grid-4-12">
					<label for="estado">Estado</label>
					<select id="estado" name="estado">
						<option value="AC">Acre</option>
						<option value="AL">Alagoas</option>
						<option value="AM">Amazonas</option>
						<option value="AP">Amapá</option>
						<option value="BA">Bahia</option>
						<option value="CE">Ceará</option>
						<option value="DF">Distrito Federal</option>
						<option value="ES">Espirito Santo</option>
						<option value="GO">Goiás</option>
						<option value="MA">Maranhão</option>
						<option value="MG">Minas Gerais</option>
						<option value="MS">Mato Grosso do Sul</option>
						<option value="MT">Mato Grosso</option>
						<option value="PA">Pará</option>
						<option value="PB">Paraíba</option>
						<option value="PE">Pernambuco</option>
						<option value="PI">Piauí</option>
						<option value="PR">Paraná</option>
						<option value="RJ">Rio de Janeiro</option>
						<option value="RN">Rio Grande do Norte</option>
						<option value="RO">Rondônia</option>
						<option value="RR">Roraima</option>
						<option value="RS">Rio Grande do Sul</option>
						<option value="SC">Santa Catarina</option>
						<option value="SE" selected="selected">Sergipe</option>
						<option value="SP">São Paulo</option>
						<option value="TO">Tocantins</option>
					</select>
				</div>
			</div>
			<div id="tab-fotos">
				<p>
					Ainda não implementado.
				</p>
			</div>
			<div id="tab-contato_categoria">
				<div class="grid-12-12">
					<table id="table_contato_categoria" class="display">
						<thead>
							<tr>
								<th>Nome</th>
								<th>Contatos</th>
								<th class="table_contato_categoria_pertence">Pertence</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</form>
</div>
<link rel="stylesheet" type="text/css" href="css/contatos.css" />
<script type="text/javascript" src="js/contatos.js"></script>
<?php
require_once '../comum/php/footer.php';
?>
