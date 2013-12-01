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

function initializeTooltips() {
	//Renders tooltips based on the tooltip attribute
	$('[tooltip]').tooltip({
		content : function () {
			return $(this).attr('tooltip');
		},
		items : "[tooltip]"
	});
	//The tooltip will follow the mouse around
	$('[tooltip]').mousemove(function(e) {
        var mousex = e.pageX + 20;
        var mousey = e.pageY + 10;
        $('.ui-tooltip').css({ top: mousey, left: mousex });
    });
}

$(document).ready(function() {
	$("#content-wrapper").tabs({
		active: 2
	});
	
	$("body").addClass("ui-form");
	$("button, input[type=button], input[type=submit], a.button").button();
	$("h2:first").after("<div class='clear' />");
	initializeTooltips();
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