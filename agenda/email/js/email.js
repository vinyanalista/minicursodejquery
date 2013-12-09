function adicionarDestinatario(valor, contato_ou_categoria, email, id) {
	$("#ul_destinatarios").tagit("createTag", valor);
	$("#ul_destinatarios li.tagit-choice:last").attr('data-contato_ou_categoria', contato_ou_categoria);
	if (contato_ou_categoria == 1) {
		// Contato
		$("#ul_destinatarios li.tagit-choice:last").attr('data-email', email);
		$('#form_email').append('<input type="hidden" name="email[]" class="email" value="'+email+'">');
	} else {
		// Categoria
		$("#ul_destinatarios li.tagit-choice:last").attr('data-categoria_id', id);
		$('#form_email').append('<input type="hidden" name="categoria_id[]" class="categoria" value="'+id+'">');
		
	}
}

$(document).ready(function() {
	$('#tab-email').tabAtiva();
	
	function extractLast(term) {
		return term.split( /,\s*/ ).pop();
	}
	
	$('#ul_destinatarios').tagit({
		allowSpaces: true,
		autocomplete: {
			delay: 500,
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
        	search: function() {
            	// custom minLength
          		var term = extractLast(this.value);
          		if (term.length < 2) {
            		return false;
          		}
         	},
        	focus: function() {
          		// prevent value inserted on focus
          		return false;
        	},
        	select: function(event, ui) {
          		this.value = '';
          		adicionarDestinatario(ui.item.value, ui.item.contato_ou_categoria, ui.item.email, ui.item.id);
          		return false;
        	}
		},
		beforeTagRemoved: function(event, ui) {
			if (ui.tag.data('contato_ou_categoria') == 1) {
				// Contato
				$('input.email[value="'+ui.tag.data('email')+'"]').remove();
			} else {
				// Categoria
				$('input.categoria[value="'+ui.tag.data('categoria_id')+'"]').remove();
			}
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
	
	$('#mensagem').editor();
	
	$('#btn_enviar').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		if ($('#form_email').valid()) {
			$.ajax({
				async: false,
				url: "ajax/enviar.php",
				data: $('#form_email').serialize(),
				dataType : 'json',
				success: function(data) {
					if (data == '1') {
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
	});
	
	if ($('#enviar_para').length > 0) {
		adicionarDestinatario($('#enviar_para').val(), 1, $('#enviar_para').val());
	}
		
	$('#form_email #ul_destinatarios input').focus();
});