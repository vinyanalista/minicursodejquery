PPW.init({
	authors : [{
		name : "Antônio Vinícius Menezes Medeiros",
		email : "vinyanalista@gmail.com",
		twitter : "@vinyanalista",
		picture : "resources/images/autor.jpg"
	}],
	defaultLanguage : "PT",
	languages : ['PT'],
	PPWSrc : "../lib/power-polygon/",
	theme : 'thm-jquery',
	title : "Minicurso de jQuery"
});

$(document).ready(function() {
	$("pre").each(function(){
		$(this).text($(this).html());
	});
	SyntaxHighlighter.defaults['gutter'] = true;
	SyntaxHighlighter.config.clipboardSwf = '../lib/syntaxhighlighter/scripts/clipboard.swf';
	SyntaxHighlighter.config.tagName = 'xmp';
	SyntaxHighlighter.all();
});