var categoria_a_excluir = 0;

$(document).ready(function() {
	$('#tab-categorias').parent('li').addClass('ui-tabs-active ui-state-active');
	
	$('#btn_nova_categoria').click(function(event){
		$('#acao').val('inserir');
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
			});
			
			inicializarTooltips();
			
			$('.link_editar_categoria').click(function(event){
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
						// TODO Marcar contatos na tabela
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
								// TODO Carregando tabela de um jeito estranho se não há categorias
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
			
			hideLoading();
		},
	});
	
	$('#editor_de_categoria').dialog({
		autoOpen: false,
		modal: true,
		width: 800,
		height: 600,
		show: {
			effect: "blind",
	        duration: 400
	    },
	    buttons: {
	        'Cancelar': function() {
	        	$(this).dialog("close");
	        },
		    'Salvar': function() {
		    	if ($('#form_categoria').valid()) {
		    		showLoading();
		    		$.ajax({
		    			async: false,
		    			url: "ajax/salvar.php",
		    			data: $("#form_categoria").serialize(),
		    			success: function(data) {
		    				hideLoading();
							if (data == '1') {
								$('#editor_de_categoria').dialog("close");
								$("#table_categoria").dataTable().fnReloadAjax();
								$.notify('Categoria cadastrada com sucesso!', 'success');
							} else {
								$.notify('Houve um erro ao tentar cadastrar a categoria.', 'error');
							}
						},
						error: function() {
							hideLoading();
							$.notify('Houve um erro ao tentar cadastrar a categoria.', 'error');
						}
		    		});
		    	}
		    }
	    }
	});
	
	$('#table_contato_categoria').dataTable({
		"sAjaxSource": "../contatos/ajax/listar.php",
		"aoColumns": [
		    null,
		    {"bSortable": false}
		],
		"aoColumnDefs": [{
			aTargets: [1],
			mRender: function(data, type, full) {
				return '<input type="checkbox" name="contato_id" value="'+full.contato_id+'">';
			}
		}],
		"aaSorting": [
			[0, "asc"],
		]
	});
});
