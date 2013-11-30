PPW.init({
	authors : [{
		name : "Antônio Vinícius Menezes Medeiros",
		email : "vinyanalista@gmail.com",
		twitter : "@vinyanalista",
		picture : "resources/images/author.jpg"
	}],
	defaultLanguage : "PT",
	languages : ['PT'],
	PPWSrc : "../lib/power-polygon/",
	theme : 'thm-jquery',
	title : "Minicurso de jQuery"
});

$(document).ready(function() {
	$("pre.javascript").snippet("javascript", {
		style : "ide-eclipse"
	});

	$("pre#exemplo01").snippet("javascript", {
		style : "ide-eclipse",
		'box' : '2'
	});
});