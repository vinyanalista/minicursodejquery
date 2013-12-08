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

/* jQuery Validate */

$.validator.setDefaults({
	onclick: false,
	onfocusout: false,
	onkeyup: false
});

/* jQuery UI */

// Validação de data
$.fn.extend({
	aplicarData: function() {
		$(this).datepicker({
			dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
			dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
			monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
			monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
			changeMonth: true,
			changeYear: true,
			yearRange: '1920:+10',
			dateFormat: "dd/mm/yy"
		});
		$(this).mask("99/99/9999");
		return $(this);
	}
});

$(document).ready(function() {
	$('input.data').aplicarData();
	$('.number').mask('#', {maxlength: false});
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
	}
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
	"fnPreDrawCallback": function() {
		showLoading();
	},
	"fnDrawCallback": function() {
		inicializarTooltips();
		hideLoading();
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
	    // TODO Sugerir atualização de tradução no site do Data Tables
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

function showLoading() {
	/*if ($(".blockOverlay").length == 0) {
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
	}*/
}

function hideLoading() {
	/*if ($(".blockOverlay").length > 0) {
		$.unblockUI();
	}*/
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