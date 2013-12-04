var contato_a_excluir = 0;

$(document).ready(function() {
	$('#tab-contatos').parent('li').addClass('ui-tabs-active ui-state-active');
	
	$('#table_contato').dataTable();
	
	$('#btn_novo_contato').click(function(event){
		alert('Ainda não implementado!');
	});
	
	$('.link_editar_contato').click(function(event){
		alert('Ainda não implementado!');
	});
	
	$('.link_excluir_contato').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		console.log('Chamado 1');
		contato_a_excluir = $(this).data('contato_id');
		$.confirmacao('Tem certeza?', function(){
			alert('Ainda não implementado!');
		});
	});
});