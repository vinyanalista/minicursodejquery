var categoria_a_excluir = 0;

$(document).ready(function() {
	$('#tab-categorias').parent('li').addClass('ui-tabs-active ui-state-active');
	
	$('#btn_nova_categoria').click(function(event){
		$('#editor_de_categoria').dialog('open');
	});
	
	$('#table_categoria').dataTable({
		"sAjaxSource": "../ajax/categoria_listar.php",
		"aoColumns": [
		    null,
		    null,
		    {"bSortable": false}
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
			inicializarTooltips();
			
			$('.link_editar_categoria').click(function(event){
				alert('Ainda não implementado!');
			});
			
			$('.link_excluir_categoria').click(function(event){
				event.preventDefault();
				event.stopPropagation();
				categoria_a_excluir = $(this).data('id');
				$.confirmacao('Tem certeza de que deseja excluir essa categoria?<br><br>Esta ação não poderá ser desfeita!', function(){
					$.ajax({
						url: "../ajax/categoria_excluir.php",
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
		show: {
			effect: "blind",
	        duration: 400
	    },
	    buttons: {
	        'Cancelar': function() {
	        	$(this).dialog("close");
	        },
		    'Salvar': function() {
		    	$.notify('Ainda não implementado!', 'info');
		    	$(this).dialog("close");
		    }
	    }
	});
});