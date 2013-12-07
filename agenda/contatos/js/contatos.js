var contato_a_excluir = 0;

function selecionarEstado(sigla) {
	if (sigla == undefined) {
		sigla = 'SE';
	}
	$('#estado option').removeAttr('selected');
	$('#estado option[value="'+sigla+'"]').attr('selected', 'selected');
}

$(document).ready(function() {
	$('#tab-contatos').parent('li').addClass('ui-tabs-active ui-state-active');
	
	$('#btn_novo_contato').click(function(event){
		$('#acao').val('cadastrar');
		$('#form_contato input[type=text]').val('');
		selecionarEstado();
		$('#editor_de_contato').dialog('option', 'title', 'Novo contato').dialog('open');
	});
	
	$('#table_contato').dataTable({
		"sAjaxSource": "ajax/listar.php",
		"aoColumns": [
		    null,
		    {"bSortable": false, "sWidth": "70px"}
		],
		"aoColumnDefs": [{
			aTargets: [1],
			mRender: function(data, type, full) {
				var html = "<div class='acoes_wrapper'>";
				html += "<a href='#' class='icone icone_24x24 icone_editar link_editar_contato tooltipster' title='Editar' data-id='"+full.id+"'></a>";
				html += "<a href='#' class='icone icone_24x24 icone_excluir link_excluir_contato tooltipster' title='Excluir' data-id='"+full.id+"'></a>";
				html += "</div>";
				return html;
			}
		}],
		"aaSorting": [
			[0, "asc"],
		],
		"fnDrawCallback": function() {
			$('#table_contato tr:not([role=row])').each(function(){
				$(this).find('td:eq(1)').addClass('table_contato_acoes');
			});
			
			inicializarTooltips();
			
			$('.link_editar_contato').click(function(event){
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
						$('#apelido').val(data.apelido);
						$('#data_nascimento').val(data.data_nascimento);
						$('#logradouro').val(data.logradouro);
						$('#numero').val(data.numero);
						$('#bairro').val(data.bairro);
						$('#cidade').val(data.cidade);
						selecionarEstado(data.estado);
						$('#editor_de_contato').dialog('option', 'title', 'Editar contato').dialog('open');
					},
					error: function() {
						$.notify('Houve um erro ao tentar carregar o contato para edição.', 'error');
					}
				});
			});
			
			$('.link_excluir_contato').click(function(event){
				event.preventDefault();
				event.stopPropagation();
				contato_a_excluir = $(this).data('id');
				$.confirmacao('Tem certeza de que deseja excluir esse contato?<br><br>Esta ação não poderá ser desfeita!', function(){
					$.ajax({
						url: "ajax/excluir.php",
						data: {
							id: contato_a_excluir
						},
						success: function(data) {
							if (data == '1') {
								$.notify('Contato excluído com sucesso!', 'success');
								$("#table_contato").dataTable().fnReloadAjax();
							} else {
								$.notify('Houve um erro ao tentar excluir o contato.', 'error');
							}
						},
						error: function() {
							$.notify('Houve um erro ao tentar excluir o contato.', 'error');
						}
					});
				});
			});
			
			hideLoading();
		},
	});
	
	$('#editor_de_contato').dialog({
		autoOpen: false,
		modal: true,
		width: 800,
		height: 600,
		show: {
			effect: "blind",
	        duration: 400
	    },
	    open: function() {
	    	$('#editor_de_contato_tabs').tabs('option', 'active', 0);
	    	$('#form_contato input[type=text]').removeClass('error');
			$('#form_contato label.error').remove();
			$('#table_contato_categoria').dataTable().fnReloadAjax();
			$('#nome').focus();
	    },
	    buttons: {
	        'Cancelar': function() {
	        	$(this).dialog("close");
	        },
		    'Salvar': function() {
		    	if ($('#form_contato').valid()) {
		    		showLoading();
		    		$.ajax({
		    			async: false,
		    			url: "ajax/salvar.php",
		    			data: $("#form_contato").serialize(),
		    			success: function(data) {
		    				hideLoading();
							if (data == '1') {
								$('#editor_de_contato').dialog("close");
								$("#table_contato").dataTable().fnReloadAjax();
								$.notify('Contato ' + ($('#acao').val() == 'cadastrar' ? 'cadastrado' : 'atualizado') + ' com sucesso!', 'success');
							} else {
								$.notify('Houve um erro ao tentar ' + $('#acao').val() + ' o contato.', 'error');
							}
						},
						error: function() {
							hideLoading();
							$.notify('Houve um erro ao tentar ' + $('#acao').val() + ' o contato.', 'error');
						}
		    		});
		    	}
		    }
	    }
	});
	
	$('#editor_de_contato_tabs').tabs();
	
	$('#table_contato_categoria').dataTable({
		"sAjaxSource": "../categorias/ajax/listar.php",
		"fnServerParams": function (aoData) {
			if ($('#acao').val() == 'atualizar') {
				aoData.push({ name: "contato_id", value: $('#id').val() });
			}	
		},
		"aoColumns": [
		    null,
		    {"sWidth": "100px"},
		    {"bSortable": false, "sWidth": "60px"}
		],
		"aoColumnDefs": [{
			aTargets: [2],
			mRender: function(data, type, full) {
				return '<input type="checkbox" name="categoria_id[]" value="'+full.id+'"'+(full.pertence == '1' ? ' checked="checked"' : '')+'>';
			}
		}],
		"aaSorting": [
			[0, "asc"],
		],
		"fnDrawCallback": function() {
			$('#table_contato_categoria tr:not([role=row])').each(function(){
				$(this).find('td:eq(1)').addClass('table_contato_categoria_contatos');
				$(this).find('td:eq(2)').addClass('table_contato_categoria_pertence');
			});
		}
	});
});
