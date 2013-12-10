function adicionarEmail(email) {
	if (email == undefined) {
		var $novo_email = $('.contato_email').first().clone();
		$novo_email.find('label.error').remove();
		$novo_email.find('label').hide();
		$novo_email.find('input').removeClass('error').val('');
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

function adicionarFoto(nomeDoArquivo, caminhoCompletoDoArquivo, data, hora, descricao) {
	var li = "<li><input type='hidden' class='foto_nome_arquivo' name='foto_nome_arquivo[]' value='" + nomeDoArquivo + "' />";
	li += "<a class='tooltipster' title='Clique para ver a foto ampliada' rel='fotos' href='"+caminhoCompletoDoArquivo+"' data-nome_arquivo='" + nomeDoArquivo + "'>";
	li += "<img src='" + caminhoCompletoDoArquivo + "' /></a><br />";
	li += "<p><span>Manter foto:</span> <input type='checkbox' class='foto_manter tooltipster' name='foto_manter[" + nomeDoArquivo + "]' value='" + nomeDoArquivo + "' checked='checked' title='Desmarque para excluir a foto quando salvar' /></p>";
	li += "<p><span>Foto do contato:</span> <input type='radio' class='foto_principal' name='foto_principal' value='" + nomeDoArquivo + "' /></p>";
	li += "Data e hora<br><input class='foto_data' type='text' name='foto_data[" + nomeDoArquivo + "]' data-nome_arquivo='" + nomeDoArquivo + "' value='" + data + "' placeholder='Data' />";
	li += "<input class='foto_hora' type='text' name='foto_hora[" + nomeDoArquivo + "]' data-nome_arquivo='" + nomeDoArquivo + "' value='" + hora + "' placeholder='Hora' />";
	li += "Descrição<input class='foto_descricao' type='text' name='foto_descricao[" + nomeDoArquivo + "]' data-nome_arquivo='" + nomeDoArquivo + "' value='" + descricao + "' placeholder='Descrição' /></li>";
	
	$("ul#fotos").append(li);
	$("ul#fotos a").fancybox({
		beforeLoad: function() {
			// Exibe a descrição e a data/hora como legenda
			var nome_arquivo = $(this.element).data('nome_arquivo');
			var data = $('input.foto_data[data-nome_arquivo="'+nome_arquivo+'"]').val();
			var hora = $('input.foto_hora[data-nome_arquivo="'+nome_arquivo+'"]').val();
			var descricao = $('input.foto_descricao[data-nome_arquivo="'+nome_arquivo+'"]').val();
			var title = '';
			if (descricao) {
				title += '<p>' + descricao + '</p>';
			}
			if (data || hora) {
				title += '<p>' + data + ' ' + hora + '</p>';
			}
            this.title = title;
        },
		helpers : {
	        title: {
	            type: 'inside'
	        }
	    }
	});
	$("ul#fotos li:last a").tooltip();
	$("ul#fotos li:last input.foto_data").mascaraDeData();
	$("ul#fotos li:last input.foto_hora").mascaraDeHora();
	$("ul#fotos input.foto_manter").change(function() {
		$(this).parents('li').find('input.foto_principal, input.foto_descricao').prop('disabled', !$(this).is(':checked'));
	});
	$("ul#fotos").sortable({
		placeholder: "ui-state-highlight"
	}).show();
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

var jcarousel = null;

function aplicarCarrossel() {
	if (jcarousel != null) {
		jcarousel.jcarousel('destroy');
	}
	
	jcarousel = $('.jcarousel')
        .on('jcarousel:reload jcarousel:create', function () {
            var width = $(this).innerWidth();

            if (width >= 600) {
                width = width / 3;
            } else if (width >= 150) {
                width = width / 2;
            }

            $(this).jcarousel('items').css('width', width + 'px');
        })
        .jcarousel({
            wrap: 'circular'
        });

    $('.jcarousel-control-prev')
        .jcarouselControl({
            target: '-=1'
        });

    $('.jcarousel-control-next')
        .jcarouselControl({
            target: '+=1'
        });

    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
            $(this).removeClass('active');
        })
        .on('click', function(e) {
            e.preventDefault();
        })
        .jcarouselPagination({
            perPage: 1,
            item: function(page) {
                return '<a href="#' + page + '">' + page + '</a>';
            }
        });
}

function atualizarInformacoesSobreContato() {
	// Esconde o que estiver atualmente sendo exibido
	$('#info_contato_nao_ha, #info_contato_selecione, #info_contato_selecionado, #info_contato_erro').hide();
	// Verifica se a tabela está vazia (se não há contatos)
	if ($('#table_contato td.dataTables_empty').length != 0) {
		// Se não há contatos, não há o que fazer
		$('#info_contato_nao_ha').show();
		return;
	}
	// Obtém a linha selecionada (se houver)
	var $linha_selecionada = $('#table_contato tbody tr.row_selected');
	// Obtém os dados da linha selecionada na tabela
	var contato = $('#table_contato').dataTable().fnGetData($linha_selecionada[0]);
	// Verifica se há um contato selecionado de fato
	if (($linha_selecionada.length != 0) && (contato != null)) {
		// Se há um contato selecionado, carrega o contato e exibe suas informações
		carregarContato(contato.id, function(data) {
			// Foto principal
			$('a#info_contato_foto_principal, img#info_contato_sem_foto').hide();
			if (data.foto_principal) {
				$('a#info_contato_foto_principal').attr('href', data.foto_principal.caminho_arquivo);
				$('a#info_contato_foto_principal img').attr('src', data.foto_principal.caminho_arquivo);
				$('a#info_contato_foto_principal').show().fancybox();
			} else {
				$('img#info_contato_sem_foto').show();
			}
			// Nome e apelido
			$('#info_contato_nome_apelido').html(data.nome);
			if (data.apelido) {
				$('#info_contato_nome_apelido').append(' (' + data.apelido + ')');
			}
			// Idade e aniversário
			if (data.data_nascimento) {
				$('#info_contato_idade').html(calcularIdade(data.data_nascimento)).parent('div').css('display', 'block');
				$('#info_contato_aniversario').html(dataDeAniversario(data.data_nascimento)).parent('div').css('display', 'block');
			} else {
				$('#info_contato_idade').parent('div').css('display', 'none');
				$('#info_contato_aniversario').parent('div').css('display', 'none');
			}
			// Telefones
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
			// E-mails
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
			// Fotos
			$('#info_contato_fotos').html('');
			if ((data.fotos) && (data.fotos.length > 0)) {
				// Insere cada uma das fotos
				for (var f = 0; f < data.fotos.length; f++) {
					var li = '<li class="info_contato_foto tooltipster" title="Clique para ver a foto ampliada">';
					li += '<a rel="info_contato_fotos" href="' + data.fotos[f].caminho_arquivo + '"';
					if (data.fotos[f].descricao) {
						li += ' data-descricao="'+data.fotos[f].descricao+'"';
					}
					if (data.fotos[f].data) {
						li += ' data-data="'+data.fotos[f].data+'"';
						li += ' data-hora="'+data.fotos[f].hora+'"';
					}
					li += '>';
					li += '<img src="' + data.fotos[f].caminho_arquivo + '" />';
					li += '</a></li>';
					$('#info_contato_fotos').append(li);
				}
				// Configura os componentes
				aplicarCarrossel();
				$("ul#info_contato_fotos .tooltipster").tooltip();
				$("ul#info_contato_fotos a").fancybox({
					beforeLoad: function() {
						var title = '';
						if ($(this.element).data('descricao')) {
							title += '<p>' + $(this.element).data('descricao') + '</p>';
						}
						if ($(this.element).data('data')) {
							title += '<p>' + $(this.element).data('data') + ' ' + $(this.element).data('hora') + '</p>';
						}
			            this.title = title;
			        },
					helpers : {
				        title: {
				            type: 'inside'
				        }
				    }
				});
				$('label[for="info_contato_fotos"]').parent('div').show();
				$('.jcarousel-wrapper').show();
			} else {
				$('label[for="info_contato_fotos"').parent('div').hide();
				$('.jcarousel-wrapper').hide();
			}
			// Exibe as informações do contato
			$('#info_contato_selecionado').show();
		});
	} else {
		// contato = null indica que a última linha clicada foi a linha do cabeçalho
		$('#info_contato_selecione').show();
	}
}

function calcularIdade(data_nascimento) {
	var data_nascimento_partes = data_nascimento.split('/');
	var data_nascimento_dia = data_nascimento_partes[0];
	var data_nascimento_mes = data_nascimento_partes[1];
	var data_nascimento_ano = data_nascimento_partes[2];
	
	var data_atual = new Date();
	var data_atual_ano = data_atual.getFullYear();
	
	var aniversario = new Date(data_atual_ano, data_nascimento_mes - 1, data_nascimento_dia - 1);

	var idade = data_atual_ano - data_nascimento_ano;
	if (data_atual < aniversario) {
		idade--;
    }
    return idade;
}

function carregarContato(id, success) {
	$.ajax({
		async: false,
		url: "ajax/consultar.php",
		data: {
			'id': id
		},
		dataType : 'json',
		'success': success,
		error: function() {
			$.notify('Erro ao carregar o contato. Por favor, tente novamente.', 'error');
		}
	});
}

function dataDeAniversario(data_nascimento) {
	var data_nascimento_partes = data_nascimento.split('/');
	var data_nascimento_dia = data_nascimento_partes[0];
	var data_nascimento_mes = data_nascimento_partes[1];
	return data_nascimento_dia + '/' + data_nascimento_mes;
}

function editarContato(id) {
	carregarContato(id, function(data) {
		// Informações pessoais
		$('#acao').val('atualizar');
		$('#id').val(data.id);
		$('#nome').val(data.nome);
		$('#apelido').val(data.apelido);
		$('#data_nascimento').val(data.data_nascimento);
		// Telefones
		limparTelefones();
		if ((data.telefones) && (data.telefones.length > 0)) {
			for (var t = 0; t < data.telefones.length; t++) {
				adicionarTelefone(data.telefones[t]);
			};
		}
		// E-mails
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
		// Fotos
		limparFotos();
		if ((data.fotos) && (data.fotos.length > 0)) {
			for (var f = 0; f < data.fotos.length; f++) {
				adicionarFoto(data.fotos[f].nome_arquivo, data.fotos[f].caminho_arquivo, data.fotos[f].data, data.fotos[f].hora, data.fotos[f].descricao);
			};
		}
		if (data.foto_principal) {
			$('input.foto_principal[value="' + data.foto_principal.nome_arquivo + '"]').attr('checked', 'checked');
		}
		// Abre o editor
		$('#editor_de_contato').dialog('option', 'title', 'Editar contato').dialog('open');
	});
}

function excluirContato(id) {
	$.confirmacao('Tem certeza de que deseja excluir esse contato?<br><br>Esta ação não poderá ser desfeita!', function(){
		$.ajax({
			url: "ajax/excluir.php",
			data: {
				'id': id
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
}

function limparEmails() {
	$('.contato_email:not(:first)').remove();
	$('.contato_email').find('input').removeClass('error').val('');
	$('.contato_email').find('label.error').remove();
}

function limparFotos() {
	$("ul#fotos li").remove();
	$("ul#fotos").hide();
}

function limparTelefones() {
	$('.contato_telefone:not(:first)').remove();
	$('.contato_telefone').find('input').removeClass('error').val('');
	$('.contato_telefone').find('label.error').remove();
}

function novoContato() {
	$('#acao').val('cadastrar');
	$('#form_contato input[type=text]').val('');
	limparTelefones();
	limparEmails();
	selecionarEstado();
	limparFotos();
	$('#editor_de_contato').dialog('option', 'title', 'Novo contato').dialog('open');
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

function salvarContato() {
	var salvou = false;
	// Verifica se o formulário foi preenchido corretamente
	if ($('#form_contato').valid()) {
		// Se sim, procede ao envio via AJAX
		$.ajax({
			async: false,
			url: "ajax/salvar.php",
			data: $("#form_contato").serialize(),
			success: function(data) {
				// Verifica a resposta do servidor (se o contato foi salvo)
				if (data == '1') {
					$.notify('Contato ' + ($('#acao').val() == 'cadastrar' ? 'cadastrado' : 'atualizado') + ' com sucesso!', 'success');
					$("#table_contato").dataTable().fnReloadAjax();
					salvou = true;
				} else {
					$.notify('Houve um erro ao tentar ' + $('#acao').val() + ' o contato.', 'error');
				}
			},
			error: function() {
				$.notify('Houve um erro ao tentar ' + $('#acao').val() + ' o contato.', 'error');
			}
		});
	}
	return salvou;
}

function selecionarEstado(sigla) {
	if (sigla == undefined) {
		sigla = 'SE';
	}
	$('#estado option').removeAttr('selected');
	$('#estado option[value="'+sigla+'"]').attr('selected', 'selected');
}

$(document).ready(function() {
	$('#tab-contatos').tabAtiva();
	
	// Novo contato
	$('#btn_novo_contato').click(novoContato);
	
	/* Tabela contato */
	
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
			// Verifica se há contatos na tabela (se ela não está vazia)
			if ($('#table_contato td.dataTables_empty').length == 0) {
				// Quando o usuário clica em uma linha da tabela
				$('#table_contato tbody tr').click(function(event) {
					// Estiliza a linha selecionada
					$($('#table_contato').dataTable().fnSettings().aoData).each(function(){
						$(this.nTr).removeClass('row_selected');
					});
					$(event.target.parentNode).addClass('row_selected');
					// Exibe as informações sobre o contato selecionado 
					atualizarInformacoesSobreContato();
				});
				
				$('#table_contato tr:not([role=row])').each(function(){
					// Estiliza a coluna Ações
					$(this).find('td:eq(1)').addClass('table_contato_acoes');
				});
				
				$('.link_editar_contato').click(function(event){
					event.preventDefault();
					event.stopPropagation();
					editarContato($(this).data('id'));
				});
				
				$('.link_excluir_contato').click(function(event){
					event.preventDefault();
					event.stopPropagation();
					excluirContato($(this).data('id'));
				});
				
				$('.tooltipster').tooltip();
			}
			
			atualizarInformacoesSobreContato();
		},
	});
	
	/* Editor de contato */
	
	$('#editor_de_contato').dialog({
	    create: function() {
	    	// Adiciona ícones aos botões Cancelar e Salvar
	    	var $botoes = $('div.ui-dialog[aria-describedby="editor_de_contato"] .ui-dialog-buttonset button');
	    	$botoes.first().addClass('botao_com_icone').find('.ui-button-text').html('<span class="icone icone_22x22 icone_cancelar">Cancelar</span>');
	    	$botoes.eq(1).addClass('botao_com_icone').find('.ui-button-text').html('<span class="icone icone_22x22 icone_salvar">Salvar</span>');
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
		    	if (salvarContato()) {
		    		$(this).dialog("close");
		    	}
		    }
	    }
	});
	
	// Tabs do editor
	$('#editor_de_contato_tabs').tabs();
	
	/* Informações pessoais */
	
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
	
	/* Fotos */
	
	var extensoesDeImagemPermitidas = "*.jpg; *.gif; *.png; *.jpeg; *.JPG; *.GIF; *.PNG; *.JPEG";
	
	$('#btn_enviar_foto').uploadify({
		'auto'				: true,
		'buttonText'		: 'Enviar',
		'fileSizeLimit' 	: '8MB',
		'fileTypeDesc'		: 'Somente imagens',
		'fileTypeExts'		: extensoesDeImagemPermitidas,
		'multi'	 			: true,
		'onUploadError' 	: function(file, errorCode, errorMsg, errorString) {
			$.notify('Erro ao enviar a foto. Por favor, tente novamente.', 'error');
        },
		'onUploadSuccess'	: function(file, data, response) {
            adicionarFoto(file.name, data, '', '', '');
        },
		'swf'				: '../../lib/uploadify/uploadify.swf',
		'uploader'			: 'ajax/enviar_fotos.php'
	});
	
	/* Categorias */
	
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
				// Estiliza as colunas Contatos e Pertence
				$(this).find('td:eq(1)').addClass('table_contato_categoria_contatos');
				$(this).find('td:eq(2)').addClass('table_contato_categoria_pertence');
			});
		}
	});
});