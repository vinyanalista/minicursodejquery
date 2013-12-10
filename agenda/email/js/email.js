function adicionarDestinatario(valor, contato_ou_categoria, email, id) {
	// Cria a tag do destinatário
	$("#ul_destinatarios").tagit("createTag", valor);
	// Armazena informações sobre o destinatário na tag
	$("#ul_destinatarios li.tagit-choice:last").data('contato_ou_categoria', contato_ou_categoria);
	if (contato_ou_categoria == 1) {
		// Contato
		$("#ul_destinatarios li.tagit-choice:last").data('email', email);
		$('#form_email').append('<input type="hidden" name="email[]" class="email" value="'+email+'">');
	} else {
		// Categoria
		$("#ul_destinatarios li.tagit-choice:last").data('categoria_id', id);
		$('#form_email').append('<input type="hidden" name="categoria_id[]" class="categoria" value="'+id+'">');
	}
}

function enviar() {
	// Verifica se o formulário foi preenchido corretamente
	if ($('#form_email').valid()) {
		// Se sim, procede ao envio via AJAX
		$.ajax({
			async: false,
			url: "ajax/enviar.php",
			data: $('#form_email').serialize(),
			dataType : 'json',
			success: function(data) {
				// Verifica a resposta do servidor (se o e-mail foi enviado)
				if (data == '1') {
					// Limpa o formulário e avisa que o e-mail foi enviado
					$('#ul_destinatarios').tagit('removeAll');
					$('#ul_destinatarios input, #assunto').val('');
					$('#mensagem').val('');
					$.notify('E-mail enviado com sucesso!', 'success');
					$('#ul_destinatarios input').focus();
				} else {
					$.notify('Houve um erro ao tentar enviar o e-mail.', 'error');
				}
			},
			error: function() {
				$.notify('Houve um erro ao tentar enviar o e-mail.', 'error');
			}
		});
	}
}

function removerDestinatario(contato_ou_categoria, email, id) {
	if (contato_ou_categoria == 1) {
		// Contato
		$('input.email[value="'+email+'"]').remove();
	} else {
		// Categoria
		$('input.categoria[value="'+id+'"]').remove();
	}
}

$(document).ready(function() {
	$('#tab-email').tabAtiva();
	
	/* Destinatários */
	
	function extractLast(term) {
		return term.split( /,\s*/ ).pop();
	}
	
	$('#ul_destinatarios').tagit({
		allowSpaces: true,
		autocomplete: {
			delay: 500,
        	// Executa a busca pelos termos digitados no servidor
			source: function(request, response) {
		        $.ajax({
					dataType: "json",
					url: "ajax/consultar_destinatarios.php",
					data: {
			        	typed: extractLast(request.term)
			        },
			        type: "POST",
					success: response
				});
        	},
        	// Determina quando a busca deve ser feita no servidor
        	search: function() {
          		var term = extractLast(this.value);
          		if (term.length < 2) {
            		return false;
          		}
         	},
         	// Previne que uma nova tag seja criada quando o componente recebe foco
        	focus: function() {
          		return false;
        	},
        	// Insere o contato escolhido pelo usuário como uma nova tag
        	select: function(event, ui) {
          		this.value = '';
          		adicionarDestinatario(ui.item.value, ui.item.contato_ou_categoria, ui.item.email, ui.item.id);
          		return false;
        	}
		},
		beforeTagRemoved: function(event, ui) {
			removerDestinatario(ui.tag.data('contato_ou_categoria'), ui.tag.data('email'), ui.tag.data('categoria_id'));
		},
		placeholderText: 'Destinatário(s)',
		singleField: true,
        singleFieldNode: $('#ipt_destinatarios'),
        tagLimit: null
	});
	
	$('#ul_destinatarios').removeClass('ui-corner-all ui-widget-content').find('input').removeClass('ui-widget-content');
	
	$.validator.addMethod("peloMenosUmDestinatario", function(value, element) {
		return ($('li.tagit-choice').length > 0);
	}, "Informe ao menos um destinatário.");
	
	$('#form_email').validate();
	
	$('#ul_destinatarios input').rules("add", {
		peloMenosUmDestinatario: true
	});
	
	// Mensagem
	$('#mensagem').editor();
	
	// Enviar
	$('#btn_enviar').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		enviar();
	});
	
	if ($('#enviar_para').length > 0) {
		adicionarDestinatario($('#enviar_para').val(), 1, $('#enviar_para').val());
	}
		
	$('#form_email #ul_destinatarios input').focus();
});