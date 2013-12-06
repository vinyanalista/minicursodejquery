var categoria_a_excluir = 0;

$(document).ready(function() {
	$('#tab-categorias').parent('li').addClass('ui-tabs-active ui-state-active');
	
	$('#table_categoria').dataTable({
		"sAjaxSource": "../ajax/listar_categorias.php",
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
				categoria_a_excluir = $(this).data('categoria_id');
				$.confirmacao('Tem certeza?', function(){
					alert('Ainda não implementado!');
				});
			});
			
			hideLoading();
		},
	});
	
	$('#btn_nova_categoria').click(function(event){
		alert('Ainda não implementado!');
	});
});