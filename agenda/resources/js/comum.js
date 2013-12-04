/* Browser detection */

function getInternetExplorerVersion() {
	// Returns the version of Internet Explorer or -1
	// (indicating the use of another browser).
	var result = -1;
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var regularExpression = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (regularExpression.exec(navigator.userAgent) != null)
			result = parseFloat(RegExp.$1);
	}
	return result;
}

/* jQuery */

// Fixes AJAX problems in IE 10
if (getInternetExplorerVersion() >= 10) {
	$.ajaxSetup({
		type: "GET"
	});
} else {
	$.ajaxSetup({
		type: "POST"
	});
}

/* jQuery UI */

$ = $.extend($, {
	confirmacao : function(mensagem, callbackSim, callbackNao) {
		$('div.dialogo_confirmacao').remove();
		$('#conteudo').append('<div class="dialogo_confirmacao" title="Confirmação">'+mensagem+'</div>');
		$('div.dialogo_confirmacao').dialog({
			autoOpen: false,
			closeOnEscape: true,
			modal: true,
			buttons: {
				'Sim': function() {
					if (callbackSim != undefined) {
						callbackSim();
					}
					$(this).dialog('close');
				},
				'Não' : function() {
					if (callbackNao != undefined) {
						callbackNao();
					}
					$(this).dialog('close');
				}
			}
		}).dialog('open');
	}
});

$(document).ready(function() {
	/*$("#content-wrapper").tabs({
		active: 2
	});*/
	
	$("body").addClass("ui-form");
	$("button, input[type=button], input[type=submit], a.button").button();
	$("h2:first").after("<div class='clear' />");
});

/* Tooltipster */

function inicializarTooltips() {
	$('.tooltipster').tooltipster();
	// Exibir tooltip em eventos onfocus
	$('.tooltipster').focusin(function(){
		$(this).tooltipster('show');
	});
	$('.tooltipster').focusout(function(){
		$(this).tooltipster('hide');
	});	
}

$(document).ready(function() {
	inicializarTooltips();
});

/* Data tables */

$.extend($.fn.dataTable.defaults, {
	"bJQueryUI": true,
	"oLanguage": {
	    "sProcessing":   "Processando...",
	    "sLengthMenu":   "Mostrar _MENU_ registros",
	    "sZeroRecords":  "Não foram encontrados resultados",
	    "sInfo":         "Mostrando de _START_ até _END_ de _TOTAL_ registros",
	    "sInfoEmpty":    "Mostrando de 0 até 0 de 0 registros",
	    "sInfoFiltered": "(filtrado de _MAX_ registros no total)",
	    "sInfoPostFix":  "",
	    "sSearch":       "Buscar:",
	    "sUrl":          "",
	    "oPaginate": {
	        "sFirst":    "Primeiro",
	        "sPrevious": "Anterior",
	        "sNext":     "Próximo",
	        "sLast":     "Último"
	    }
	}
});



/* Redes sociais */

var addthis_config = {
	"data_track_clickback" : false,
	"data_track_addressbar" : false,
	"ui_language" : "pt"
};

var addthis_share = {
	"url" : "http://www.vinyanalista.com.br/estatistica20131",
	"title" : "Pesquisa: o que influencia a MGP dos alunos da UFS?",
	"description" : "Pesquisa desenvolvida por alunos da disciplina de Estatística Aplicada 2013/1 com o intuito de verificar como anda a MGP dos alunos da UFS e quais fatores podem estar contribuindo para essa condição."
}; 

$(document).ready(function(){
	/*var left = $("#header").position().left + $("#header").width() - $("#redes_sociais_flutuante").width() + 20;
	$("#redes_sociais_flutuante").css("left", left);*/
});

/* Debugger */

$(document).ready(function() {
	$("#debugger").dialog({
		autoOpen : false,
		modal : true,
		width : 640,
		height : 480
	});
});

function showDebugger() {
	$("#debugger").dialog("open");
}

/* Loading */

function showLoading() {
	if ($(".blockOverlay").length == 0) {
		$.blockUI({
			message : $('#loading'),
			css : {
				background : 'transparent',
				border : '0',
				top : ($(window).height() - 125) / 2 + 'px',
				left : ($(window).width() - 173) / 2 + 'px',
				width : '173px'
			}
		});
	}
}

function hideLoading() {
	if ($(".blockOverlay").length > 0) {
		$.unblockUI();
	}
}

/* Other */

function redirect(url) {
	window.top.showLoading();
	window.top.location = url;
}

/*$(document).ready(function() {
	$("#table_contato").dataTable();
});

$(document).ready(function() {
	$("#table_categoria").dataTable();
});*/

// TODO Marcar aba: adicionar classes ui-tabs-active ui-state-active