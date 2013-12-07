var contato_a_excluir = 0;

$(document).ready(function() {
	$('#tab-contatos').parent('li').addClass('ui-tabs-active ui-state-active');
	
	$('#btn_novo_contato').click(function(event){
		alert('Ainda não implementado!');
	});
	
	$('#table_contato').dataTable({
		"sAjaxSource": "ajax/listar.php",
		"aoColumns": [
		    null,
		    {"bSortable": false}
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
			inicializarTooltips();
			
			$('.link_editar_contato').click(function(event){
				alert('Ainda não implementado!');
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
								// TODO Carregando tabela de um jeito estranho se não há contatos
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
});
