function carregarCategoria(id, success) {
	$.ajax({
		async: false,
		url: "ajax/consultar.php",
		data: {
			'id': id
		},
		dataType : 'json',
		'success': success,
		error: function() {
			$.notify('Erro ao carregar a categoria. Por favor, tente novamente.', 'error');
		}
	});
}

function editarCategoria(id) {
	carregarCategoria(id, function(data) {
		$('#acao').val('atualizar');
		$('#id').val(data.id);
		$('#nome').val(data.nome);
		$('#editor_de_categoria').dialog('option', 'title', 'Editar categoria').dialog('open');
	});
}

function excluirCategoria(id) {
	$.confirmacao('Tem certeza de que deseja excluir essa categoria?<br><br>Esta ação não poderá ser desfeita!', function(){
		$.ajax({
			url: "ajax/excluir.php",
			data: {
				'id': id
			},
			success: function(data) {
				if (data == '1') {
					$.notify('Categoria excluída com sucesso!', 'success');
					$("#table_categoria").dataTable().fnReloadAjax();
				} else {
					$.notify('Houve um erro ao tentar excluir a categoria.', 'error');
				}
			},
			error: function() {
				$.notify('Houve um erro ao tentar excluir a categoria.', 'error');
			}
		});
	});
}

function novaCategoria() {
	$('#acao').val('cadastrar');
	$('#nome').val('');
	$('#editor_de_categoria').dialog('option', 'title', 'Nova categoria').dialog('open');
}

function salvarCategoria() {
	var salvou = false;
	// Verifica se o formulário foi preenchido corretamente
	if ($('#form_categoria').valid()) {
		// Se sim, procede ao envio via AJAX
		$.ajax({
			async: false,
			url: "ajax/salvar.php",
			data: $("#form_categoria").serialize(),
			success: function(data) {
				// Verifica a resposta do servidor (se a categoria foi salva)
				if (data == '1') {
					$.notify('Categoria ' + ($('#acao').val() == 'cadastrar' ? 'cadastrada' : 'atualizada') + ' com sucesso!', 'success');
					$("#table_categoria").dataTable().fnReloadAjax();
					salvou = true;
				} else {
					$.notify('Houve um erro ao tentar ' + $('#acao').val() + ' a categoria.', 'error');
				}
			},
			error: function() {
				$.notify('Houve um erro ao tentar ' + $('#acao').val() + ' a categoria.', 'error');
			}
		});
	}
	return salvou;
}

$(document).ready(function() {
	$('#tab-categorias').tabAtiva();
	
	// Nova categoria
	$('#btn_nova_categoria').click(function(event){
		novaCategoria();
	});
	
	/* Tabela categoria */
	
	$('#table_categoria').dataTable({
		"sAjaxSource": "ajax/listar.php",
		"aoColumns": [
		    null,
		    {"sWidth": "100px"},
		    {"bSortable": false, "sWidth": "70px"}
		],
		"aoColumnDefs": [{
			aTargets: [2],
			mRender: function(data, type, full) {
				var html = "<div class='acoes_wrapper'>";
				html += "<a href='#' class='icone icone_24x24 icone_editar link_editar_categoria tooltipster' title='Editar' data-id='"+full.id+"'></a>";
				html += "<a href='#' class='icone icone_24x24 icone_excluir link_excluir_categoria tooltipster' title='Excluir' data-id='"+full.id+"'></a>";
				html += "</div>";
				return html;
			}
		}],
		"aaSorting": [
			[0, "asc"],
		],
		"fnDrawCallback": function() {
			// Estiliza as colunas Contatos e Ações
			$('#table_categoria tr:not([role=row])').each(function(){
				$(this).find('td:eq(1)').addClass('table_categoria_contatos');
				$(this).find('td:eq(2)').addClass('table_categoria_acoes');
			});
			
			$('.link_editar_categoria').click(function(event){
				event.preventDefault();
				event.stopPropagation();
				editarCategoria($(this).data('id'));
			});
			
			$('.link_excluir_categoria').click(function(event){
				event.preventDefault();
				event.stopPropagation();
				excluirCategoria($(this).data('id'));
			});
			
			$('.tooltipster').tooltip();
		},
	});
	
	/* Editor de categoria */
	
	$('#editor_de_categoria').dialog({
		create: function() {
			// Adiciona ícones aos botões Cancelar e Salvar
	    	var $botoes = $('div.ui-dialog[aria-describedby="editor_de_categoria"] .ui-dialog-buttonset button');
	    	$botoes.first().addClass('botao_com_icone').find('.ui-button-text').html('<span class="icone icone_22x22 icone_cancelar">Cancelar</span>');
	    	$botoes.eq(1).addClass('botao_com_icone').find('.ui-button-text').html('<span class="icone icone_22x22 icone_salvar">Salvar</span>');
	    },
	    open: function() {
	    	$('#form_categoria input[type=text]').removeClass('error');
			$('#form_categoria label.error').remove();
			$('#table_contato_categoria').dataTable().fnReloadAjax();
			$('#nome').focus();
	    },
	    buttons: {
	        'Cancelar': function() {
	        	$(this).dialog("close");
	        },
		    'Salvar': function() {
		    	if (salvarCategoria()) {
		    		$('#editor_de_categoria').dialog("close");
		    	}
		    }
	    }
	});
	
	$('#table_contato_categoria').dataTable({
		"sAjaxSource": "../contatos/ajax/listar.php",
		"fnServerParams": function (aoData) {
			// Se for uma edição de categoria, passa o ID para que os contatos sejam trazidos marcados
			if ($('#acao').val() == 'atualizar') {
				aoData.push({ name: "categoria_id", value: $('#id').val() });
			}	
		},
		"aoColumns": [
		    null,
		    {"bSortable": false, "sWidth": "60px"}
		],
		"aoColumnDefs": [{
			aTargets: [1],
			mRender: function(data, type, full) {
				return '<input type="checkbox" name="contato_id[]" value="'+full.id+'"'+(full.pertence == '1' ? ' checked="checked"' : '')+'>';
			}
		}],
		"aaSorting": [
			[0, "asc"],
		],
		"fnDrawCallback": function() {
			$('#table_contato_categoria tr:not([role=row])').each(function(){
				// Estiliza a coluna Pertence
				$(this).find('td:eq(1)').addClass('table_contato_categoria_pertence');
			});
		}
	});
});
