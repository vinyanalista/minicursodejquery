var contato_a_excluir = 0;

function atualizarInformacoesSobreContato() {
	// Esconde o que estiver atualmente sendo exibido
	$('#info_contato_selecione, #info_contato_selecionado, #info_contato_erro').hide();
	// Obtém a linha selecionada (se houver)
	var $linha_selecionada = $('#table_contato tbody tr.row_selected');
	// Obtém os dados da linha selecionada na tabela
	var contato = $('#table_contato').dataTable().fnGetData($linha_selecionada[0]);
	// Verifica se há um contato selecionado de fato
	if (($linha_selecionada.length != 0) && (contato != null)) {
		console.log(contato);
		$.ajax({
			async: false,
			url: "ajax/consultar.php",
			data: {
				id: contato.id
			},
			dataType : 'json',
			success: function(data) {
				$('a#info_contato_foto_principal, img#info_contato_sem_foto').hide();
				if (data.foto_principal) {
					$('a#info_contato_foto_principal').attr('href', data.foto_principal.caminho_arquivo);
					$('a#info_contato_foto_principal img').attr('src', data.foto_principal.caminho_arquivo);
					$('a#info_contato_foto_principal').show().fancybox();
				} else {
					$('img#info_contato_sem_foto').show();
				}
				$('#info_contato_nome_apelido').html(data.nome);
				if (data.apelido) {
					$('#info_contato_nome_apelido').append(' (' + data.apelido + ')');
				}
				if (data.data_nascimento) {
					$('#info_contato_idade').html('21').parent('div').css('display', 'block');
					$('#info_contato_aniversario').html('13/06').parent('div').css('display', 'block');
				} else {
					$('#info_contato_idade').parent('div').css('display', 'none');
					$('#info_contato_aniversario').parent('div').css('display', 'none');
				}
				$('#info_contato_telefones').html('');
				if ((data.telefones) && (data.telefones.length > 0)) {
					for (var t = 0; t < data.telefones.length; t++) {
						var li = '<li class="info_contato_telefone icone_telefone">';
						li += data.telefones[t];
						li += '</li>';
						$('#info_contato_telefones').append(li);
					}
					$('#info_contato_telefones').parent('div').show();
				} else {
					$('#info_contato_telefones').parent('div').hide();
				}
				$('#info_contato_emails').html('');
				if ((data.emails) && (data.emails.length > 0)) {
					for (var e = 0; e < data.emails.length; e++) {
						var li = '<li class="info_contato_email icone_email tooltipster" title="Clique para enviar um e-mail">';
						li += data.emails[e];
						li += '</li>';
						$('#info_contato_emails').append(li);
					}
					$('#info_contato_emails').parent('div').show();
					$('#info_contato_emails li').tooltip().click(function() {
						window.location = '../email/?enviar_para=' + $(this).text();
					});
				} else {
					$('#info_contato_emails').parent('div').hide();
				}
				$('#info_contato_fotos').html('');
				if ((data.fotos) && (data.fotos.length > 0)) {
					for (var f = 0; f < data.fotos.length; f++) {
						var li = '<li class="info_contato_foto">';
						li += '<a class="tooltipster" href="' + data.fotos[f].caminho_arquivo + '" title="Clique para ver a foto ampliada">';
						li += data.fotos[f].nome_arquivo;
						li += '</a></li>';
						$('#info_contato_fotos').append(li);
					}
					$("ul#info_contato_fotos a").fancybox();
					$("ul#info_contato_fotos .tooltipster").tooltip();
					$('ul#info_contato_fotos').parent('div').show();
				} else {
					$('#info_contato_fotos').parent('div').hide();
				}
				$('#info_contato_selecionado').show();
			},
			error: function() {
				$.notify('Houve um erro ao tentar carregar os dados do contato selecionado.', 'error');
				$('#info_contato_erro').show();
			}
		});
	} else {
		// contato = null indica que a última linha clicada foi a linha do cabeçalho
		$('#info_contato_selecione').show();
	}
}

function adicionarTelefone(telefone) {
	if (telefone == undefined) {
		var $novo_telefone = $('.contato_telefone').first().clone();
		$novo_telefone.find('label.error').remove();
		$novo_telefone.find('label').hide();
		$novo_telefone.find('input').removeClass('error').val('').mascaraDeTelefone();
		$novo_telefone.find('button').attr('title', 'Excluir telefone').tooltip();
		$novo_telefone.removeClass('primeiro');
		$novo_telefone.find('.btn_excluir_telefone').click(removerTelefone);
		$('.contato_telefone:last').after($novo_telefone);
		$('.contato_telefone:last input').focus();
	} else {
		if ($('.contato_telefone:first input').val() != '') {
			adicionarTelefone();
		}
		$('.contato_telefone:last input').val(telefone);
	}
}

function removerTelefone(event) {
	event.preventDefault();
	event.stopPropagation();
	var $telefone = $(this).parents('.contato_telefone');
	if (($telefone[0] == $('.contato_telefone:first')[0]) && ($('.contato_telefone').length == 1)) {
		// $telefone.is('.contato_telefone:first') não funciona, ver:
		// http://api.jquery.com/is/
		$telefone.find('input').removeClass('error').val('');
		$telefone.find('label.error').remove();
	} else {
		$telefone.remove();
		$('.contato_telefone:first').addClass('primeiro').find('label').show();
	}
}

function limparTelefones() {
	$('.contato_telefone:not(:first)').remove();
	$('.contato_telefone').find('input').removeClass('error').val('');
	$('.contato_telefone').find('label.error').remove();
}

function adicionarEmail(email) {
	if (email == undefined) {
		var $novo_email = $('.contato_email').first().clone();
		$novo_email.find('label.error').remove();
		$novo_email.find('label').hide();
		$novo_email.find('input').removeClass('error').val(''); // TODO .mascaraDeTelefone();
		$novo_email.find('button').attr('title', 'Excluir e-mail').tooltip();
		$novo_email.removeClass('primeiro');
		$novo_email.find('.btn_excluir_email').click(removerEmail);
		$('.contato_email:last').after($novo_email);
		$('.contato_email:last input').focus();
	} else {
		if ($('.contato_email:first input').val() != '') {
			adicionarEmail();
		}
		$('.contato_email:last input').val(email);
	}
}

function removerEmail(event) {
	event.preventDefault();
	event.stopPropagation();
	var $email = $(this).parents('.contato_email');
	if (($email[0] == $('.contato_email:first')[0]) && ($('.contato_email').length == 1)) {
		$email.find('input').removeClass('error').val('');
		$email.find('label.error').remove();
	} else {
		$email.remove();
		$('.contato_email:first').addClass('primeiro').find('label').show();
	}
}

function limparEmails() {
	$('.contato_email:not(:first)').remove();
	$('.contato_email').find('input').removeClass('error').val('');
	$('.contato_email').find('label.error').remove();
}

function selecionarEstado(sigla) {
	if (sigla == undefined) {
		sigla = 'SE';
	}
	$('#estado option').removeAttr('selected');
	$('#estado option[value="'+sigla+'"]').attr('selected', 'selected');
}

function adicionarFoto(nomeDoArquivo, caminhoCompletoDoArquivo, descricao) {
	var html = "<li><input type='hidden' class='foto_nome_arquivo' name='foto_nome_arquivo[]' value='" + nomeDoArquivo + "' />";
	html += "<a class='tooltipster' href='"+caminhoCompletoDoArquivo+"' title='Clique para ver a foto ampliada'><img src='" + caminhoCompletoDoArquivo + "' /></a><br />";
	html += "<p><span>Manter foto:</span> <input type='checkbox' class='foto_manter tooltipster' name='foto_manter[" + nomeDoArquivo + "]' value='" + nomeDoArquivo + "' checked='checked' title='Desmarque para excluir a foto quando salvar' /></p>";
	html += "<p><span>Foto do contato:</span> <input type='radio' class='foto_principal' name='foto_principal' value='" + nomeDoArquivo + "' /></p>";
	html += "Descrição<input class='foto_descricao' type='text' name='foto_descricao[" + nomeDoArquivo + "]' value='" + descricao + "' placeholder='Descrição' /></li>";
	
	$("ul#fotos").append(html);
	$("ul#fotos a").fancybox();
	$("ul#fotos .tooltipster").tooltip();
	$("ul#fotos input.foto_manter").change(function() {
		$(this).parents('li').find('input.foto_principal, input.foto_descricao').prop('disabled', !$(this).is(':checked'));
	});
	$("ul#fotos").sortable({
		placeholder: "ui-state-highlight"
	}).show();
}

function limparFotos() {
	$("ul#fotos li").remove();
	$("ul#fotos").hide();
}

$(document).ready(function() {
	$('#tab-contatos').parent('li').addClass('ui-tabs-active ui-state-active');
	
	$('#btn_novo_contato').click(function(event){
		$('#acao').val('cadastrar');
		$('#form_contato input[type=text]').val('');
		limparTelefones();
		limparEmails();
		selecionarEstado();
		limparFotos();
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
						limparTelefones();
						if ((data.telefones) && (data.telefones.length > 0)) {
							for (var t = 0; t < data.telefones.length; t++) {
								adicionarTelefone(data.telefones[t]);
							};
						}
						limparEmails();
						if ((data.emails) && (data.emails.length > 0)) {
							for (var e = 0; e < data.emails.length; e++) {
								adicionarEmail(data.emails[e]);
							};
						}
						$('#logradouro').val(data.logradouro);
						$('#numero').val(data.numero);
						$('#bairro').val(data.bairro);
						$('#cidade').val(data.cidade);
						selecionarEstado(data.estado);
						limparFotos();
						if ((data.fotos) && (data.fotos.length > 0)) {
							for (var f = 0; f < data.fotos.length; f++) {
								adicionarFoto(data.fotos[f].nome_arquivo, data.fotos[f].caminho_arquivo, data.fotos[f].descricao);
							};
						}
						if (data.foto_principal) {
							$('input.foto_principal[value="' + data.foto_principal.nome_arquivo + '"]').attr('checked', 'checked');
						}
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
	
	$('#table_contato tbody tr').click(function(event) {
		// Estiliza a linha selecionada
		$($('#table_contato').dataTable().fnSettings().aoData).each(function(){
			$(this.nTr).removeClass('row_selected');
		});
		$(event.target.parentNode).addClass('row_selected');
		// Exibe as informações sobre o contato selecionado 
		atualizarInformacoesSobreContato();
	});
	
	$('#editor_de_contato').dialog({
		width: 800,
		// TODO Height? Colocar scroll
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
	
	$('#btn_adicionar_telefone').click(function(event) {
		event.preventDefault();
		event.stopPropagation();
		adicionarTelefone();
	});
	
	$('#btn_adicionar_email').click(function(event) {
		event.preventDefault();
		event.stopPropagation();
		adicionarEmail();
	});
	
	$('.btn_excluir_telefone').click(removerTelefone);
	
	$('.btn_excluir_email').click(removerEmail);
	
	var extensoesDeImagemPermitidas = "*.jpg; *.gif; *.png; *.jpeg; *.JPG; *.GIF; *.PNG; *.JPEG";
	
	$('#btn_enviar_foto').uploadify({
		'auto'				: true,
		'buttonText'		: 'Enviar',
		'fileSizeLimit' 	: '8MB',
		'fileTypeDesc'		: 'Somente imagens',
		'fileTypeExts'		: extensoesDeImagemPermitidas,
		'multi'	 			: true,
		'onUploadError' 	: function(file, errorCode, errorMsg, errorString) {
			console.log('The file ' + file.name + ' could not be uploaded: ' + errorString);
        },
		'onUploadSuccess'	: function(file, data, response) {
            //console.log('The file ' + file.name + ' was successfully uploaded with a response of ' + response + ':' + data);
            //console.log(file);
            adicionarFoto(file.name, data, '');
        },
		'swf'				: '../../lib/uploadify/uploadify.swf',
		'uploader'			: 'ajax/enviar_fotos.php'
	});
	
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
	
	atualizarInformacoesSobreContato();
});
