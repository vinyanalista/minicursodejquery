var categoria_a_excluir = 0;

$(document).ready(function() {
	$('#tab-categorias').tabAtiva();
	
	$('#btn_nova_categoria').click(function(event){
		$('#acao').val('cadastrar');
		$('#nome').val('');
		$('#editor_de_categoria').dialog('option', 'title', 'Nova categoria').dialog('open');
	});
	
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
			$('#table_categoria tr:not([role=row])').each(function(){
				$(this).find('td:eq(1)').addClass('table_categoria_contatos');
				$(this).find('td:eq(2)').addClass('table_categoria_acoes');
			});
			
			$('.tooltipster').tooltip();
			
			$('.link_editar_categoria').click(function(event){
				event.preventDefault();
				event.stopPropagation();
				$.ajax({
					async: false,
					url: "ajax/consultar.php",
					data: {
						id: $(this).data('id')
					},
					dataType : 'json',
					success: function(data) {
						$('#acao').val('atualizar');
						$('#id').val(data.id);
						$('#nome').val(data.nome);
						$('#editor_de_categoria').dialog('option', 'title', 'Editar categoria').dialog('open');
					},
					error: function() {
						$.notify('Houve um erro ao tentar carregar a categoria para edição.', 'error');
					}
				});
			});
			
			$('.link_excluir_categoria').click(function(event){
				event.preventDefault();
				event.stopPropagation();
				categoria_a_excluir = $(this).data('id');
				$.confirmacao('Tem certeza de que deseja excluir essa categoria?<br><br>Esta ação não poderá ser desfeita!', function(){
					$.ajax({
						url: "ajax/excluir.php",
						data: {
							id: categoria_a_excluir
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
			});
		},
	});
	
	$('#editor_de_categoria').dialog({
		create: function() {
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
		    	if ($('#form_categoria').valid()) {
		    		$.ajax({
		    			async: false,
		    			url: "ajax/salvar.php",
		    			data: $("#form_categoria").serialize(),
		    			success: function(data) {
							if (data == '1') {
								$('#editor_de_categoria').dialog("close");
								$("#table_categoria").dataTable().fnReloadAjax();
								$.notify('Categoria ' + ($('#acao').val() == 'cadastrar' ? 'cadastrada' : 'atualizada') + ' com sucesso!', 'success');
							} else {
								$.notify('Houve um erro ao tentar ' + $('#acao').val() + ' a categoria.', 'error');
							}
						},
						error: function() {
							$.notify('Houve um erro ao tentar ' + $('#acao').val() + ' a categoria.', 'error');
						}
		    		});
		    	}
		    }
	    }
	});
	
	$('#table_contato_categoria').dataTable({
		"sAjaxSource": "../contatos/ajax/listar.php",
		"fnServerParams": function (aoData) {
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
				$(this).find('td:eq(1)').addClass('table_contato_categoria_pertence');
			});
		}
	});
});
