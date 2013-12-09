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

$.extend($.ui.dialog.prototype.options, {
	autoOpen: false,
	modal: true,
	width: 800,
	show: {
		effect: "blind",
        duration: 400
    },
    hide: {
		effect: "blind",
        duration: 200
    }
	// TODO Pesquisar um meio viável de acrescentar scroll ao diálogo
});

/* jQuery Validate */

$.validator.setDefaults({
	onclick: false,
	onfocusout: false,
	onkeyup: false
});

/* Máscaras e validação */

$.fn.extend({
	// Data
	mascaraDeData: function() {
		$(this).datepicker({
			changeMonth: true,
			changeYear: true,
			yearRange: '1920:+10',
			showButtonPanel: true 
		});
		$(this).mask("00/00/0000");
		return $(this);
	},
	
	// Hora
	mascaraDeHora: function() {
		$(this).timepicker({
			scrollDefaultNow: true,
			timeFormat: 'H:i'
		});
		$(this).mask("00:00");
		return $(this);
	},
	
	// Número
	mascaraDeNumero: function() {
		$(this).addClass('number');
		$(this).mask('#', {maxlength: false});
		return $(this);
	},
	
	// Telefone
	mascaraDeTelefone: function() {
		// TODO Não está funcionando para números de São Paulo com 9 dígitos
		$(this).mask(function(phone) {
			return phone.match(/^(\(?11\)? ?9(5[0-9]|6[0-9]|7[01234569]|8[0-9]|9[0-9])[0-9]{1})/g) ? 
					'(00) 00000-0000' : '(00) 0000-0000';
		});
		return $(this);
	}
});

$(document).ready(function() {
	$('input.data').mascaraDeData();
	$('input.hora').mascaraDeHora();
	$('input.numero').mascaraDeNumero();
	$('input.telefone').mascaraDeTelefone();
});

$.confirmacao = function(mensagem, callbackSim, callbackNao) {
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

$(document).ready(function() {
	/*$("#content-wrapper").tabs({
		active: 2
	});*/
	$("body").addClass("ui-form");
	$("button, input[type=button], input[type=submit], a.button").button();
	
	$("#navegacao li").mouseover(function() {
		$(this).addClass('ui-state-hover');
	});
	$("#navegacao li").mouseout(function() {
		$(this).removeClass('ui-state-hover');
	});
});

/* CKEditor */

$.fn.extend({
	editor: function(options) {
		options = $.extend({
			language: 'pt-br',
			skin: 'moono_blue',
			toolbar: [
				['Font'],['FontSize'],['Bold','Italic','Underline','Strike', '-', 'Subscript', 'Superscript', '-', 'RemoveFormat'],['TextColor','BGColor'],['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'],'/',
				['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord'], ['Undo','Redo'],['Find', 'Replace'],['Link', 'Unlink', 'Anchor','-', 'Image','Table','Blockquote'],['Source','Preview','Maximize'],['About']
			]
		}, options);
		$(this).ckeditor(options);
		return $(this);
	}
});

/* Tooltipster */

$.fn.extend({
	tooltip: function(options) {
		$(this).tooltipster(options);
		// Exibir tooltip ao ganhar foco
		$(this).focusin(function(){
			$(this).tooltipster('show');
		});
		$(this).focusout(function(){
			$(this).tooltipster('hide');
		});
		return $(this);
	}
});

$(document).ready(function() {
	$('.tooltipster').tooltip();
});

/* Data tables */

$.extend($.fn.dataTable.defaults, {
	"bJQueryUI": true,
	"aLengthMenu": [10, 20, 50, 100],
	"iDisplayLength": 10,
	"bPaginate" : true,
	"sPaginationType" : "full_numbers",
	"bServerSide": true,
	"bDeferRender": true,
	"sServerMethod": "POST",
	"fnServerData": function (sSource, aoData, fnCallback, oSettings) {
		oSettings.jqXHR = $.ajax({
			async: false,
			dataType: 'json',
		    type: 'POST',
		    url: sSource,
		    data: aoData,
		    success: fnCallback
	    });
    },
	"fnDrawCallback": function() {
		$('.tooltipster').tooltip();
	},
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
	    // TODO Traduzir e propor alteração no site do DataTables
	    // Sem a configuração abaixo, a tabela não é renderizada
	    "oAria": {
	    	"sSortAscending": ": activate to sort column ascending",
	    	"sSortDescending": ": activate to sort column descending"
	    },
	    "oPaginate": {
	        "sFirst":    "Primeiro",
	        "sPrevious": "Anterior",
	        "sNext":     "Próximo",
	        "sLast":     "Último"
	    }
	}
});

// Permite fazer nova consulta AJAX e atualizar a tabela
$.fn.dataTableExt.oApi.fnReloadAjax = function ( oSettings, sNewSource, fnCallback, bStandingRedraw )
{
    if ( sNewSource !== undefined && sNewSource !== null ) {
        oSettings.sAjaxSource = sNewSource;
    }
 
    // Server-side processing should just call fnDraw
    if ( oSettings.oFeatures.bServerSide ) {
        this.fnDraw();
        return;
    }
 
    this.oApi._fnProcessingDisplay( oSettings, true );
    var that = this;
    var iStart = oSettings._iDisplayStart;
    var aData = [];
 
    this.oApi._fnServerParams( oSettings, aData );
 
    oSettings.fnServerData.call( oSettings.oInstance, oSettings.sAjaxSource, aData, function(json) {
        /* Clear the old information from the table */
        that.oApi._fnClearTable( oSettings );
 
        /* Got the data - add it to the table */
        var aData =  (oSettings.sAjaxDataProp !== "") ?
            that.oApi._fnGetObjectDataFn( oSettings.sAjaxDataProp )( json ) : json;
 
        for ( var i=0 ; i<aData.length ; i++ )
        {
            that.oApi._fnAddData( oSettings, aData[i] );
        }
         
        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
 
        that.fnDraw();
 
        if ( bStandingRedraw === true )
        {
            oSettings._iDisplayStart = iStart;
            that.oApi._fnCalculateEnd( oSettings );
            that.fnDraw( false );
        }
 
        that.oApi._fnProcessingDisplay( oSettings, false );
 
        /* Callback user function - for event handlers etc */
        if ( typeof fnCallback == 'function' && fnCallback !== null )
        {
            fnCallback( oSettings );
        }
    }, oSettings );
};

// Espera 500 milissegundos antes de realizar a busca (útil para economizar consultas AJAX)
$.fn.dataTableExt.oApi.fnSetFilteringDelay = function ( oSettings, iDelay ) {
    var _that = this;
 
    if ( iDelay === undefined ) {
        iDelay = 500;
    }
      
    this.each( function ( i ) {
        $.fn.dataTableExt.iApiIndex = i;
        var
            $this = this,
            oTimerId = null,
            sPreviousSearch = null,
            anControl = $( 'input', _that.fnSettings().aanFeatures.f );
          
            anControl.unbind( 'keyup' ).bind( 'keyup', function() {
            var $$this = $this;
  
            if (sPreviousSearch === null || sPreviousSearch != anControl.val()) {
                window.clearTimeout(oTimerId);
                sPreviousSearch = anControl.val(); 
                oTimerId = window.setTimeout(function() {
                    $.fn.dataTableExt.iApiIndex = i;
                    _that.fnFilter( anControl.val() );
                }, iDelay);
            }
        });
          
        return this;
    } );
    return this;
};

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

$.showLoading = function() {
	$('body').append('<img id="loading" src="../comum/imagens/loading.gif" />');
	$.blockUI({
		message : $('#loading'),
		css : {
			background : 'transparent',
			border : '0',
			top : ($(window).height() - 55) / 2 + 'px',
			left : ($(window).width() - 55) / 2 + 'px',
			width : '55px'
		}
	});
}

$.hideLoading = function() {
	$.unblockUI();
}

$(document).ajaxSend(function() {
	$.showLoading();
});

$(document).ajaxComplete(function() {
	$.hideLoading();
});

$('a').click(function() {
	$.showLoading();
});

/* Outras funções */

$.fn.extend({
	tabAtiva: function() {
		$(this).parent('li').addClass('ui-tabs-active ui-state-active');
		return $(this);
	}
});

$.redirecionar = function(url) {
	$.showLoading();
	window.top.location = url;
}