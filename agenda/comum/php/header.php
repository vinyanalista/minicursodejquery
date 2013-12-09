<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Agenda de contatos</title>
		<!-- TODO Configurar redes sociais e AddThis -->
		<!-- Facebook -->
		<!--<meta property="og:url" content="http://www.vinyanalista.com.br/estatistica20131" />
		<meta property="og:title" content="Pesquisa: o que influencia a MGP dos alunos da UFS?" />
		<meta property="og:description" content="Pesquisa desenvolvida por alunos da disciplina de Estatística Aplicada 2013/1 com o intuito de verificar como anda a MGP dos alunos da UFS e quais fatores podem estar contribuindo para essa condição." />
		<meta property="og:image" content="<?=SITE_HOME?>/imagens/ufs.png"/>
		<meta property="og:image:width" content="200" />
		<meta property="og:image:height" content="200" />
		<meta property="og:type" content="website"/>-->
		<!-- Favicons -->
		<link rel="shortcut icon" href="../comum/imagens/icones/agenda.png" />
		<link rel="icon" href="../comum/imagens/icones/agenda.png" />
		<link rel="apple-touch-icon" href="../comum/imagens/icones/agenda.png" />
		<!-- TODO Verificar estilos e scripts, carregar só o que for mesmo comum -->
		<!-- CSS -->
		<link rel="stylesheet" type="text/css" href="../comum/css/reset.css" />
		<link rel="stylesheet" type="text/css" href="../../lib/forgotten-futurist/forgotten-futurist.css" />
		<link rel="stylesheet" type="text/css" href="../../lib/formee/css/formee-structure.css" />
		<link rel="stylesheet" type="text/css" href="../../lib/jquery-ui/css/cupertino/jquery-ui-1.10.3.custom.min.css" />
		<link rel="stylesheet" type="text/css" href="../../lib/tag-it/css/jquery.tagit.css" />
		<link rel="stylesheet" type="text/css" href="../../lib/tooltipster/css/tooltipster.css" />
		<link rel="stylesheet" type="text/css" href="../../lib/jquery-timepicker/jquery.timepicker.css" />
		<link rel="stylesheet" type="text/css" href="../../lib/datatables/css/demo_table_jui.css" />
		<link rel="stylesheet" type="text/css" href="../../lib/uploadify/uploadify.css" />
		<link rel="stylesheet" type="text/css" href="../../lib/fancybox/jquery.fancybox.css" />
		<link rel="stylesheet" type="text/css" href="../comum/css/comum.css" />
		<!-- Scripts -->
		<script type="text/javascript" src="../../lib/jquery/jquery-1.8.3.min.js"></script>
		<script type="text/javascript" src="../../lib/formee/js/formee.js"></script>
		<script type="text/javascript" src="../../lib/jquery-ui/js/jquery-ui-1.10.3.custom.min.js"></script>
		<script type="text/javascript" src="../../lib/jquery-ui/js/jquery.ui.datepicker-pt-BR.js"></script>
		<script type="text/javascript" src="../../lib/blockui/jquery.blockUI.js"></script>
		<script type="text/javascript" src="../../lib/notifyjs/notify-combined.min.js"></script>
		<script type="text/javascript" src="../../lib/tag-it/js/tag-it.min.js"></script>
		<script type="text/javascript" src="../../lib/tooltipster/js/jquery.tooltipster.min.js"></script>
		<script type="text/javascript" src="../../lib/jquery-validate/jquery.validate.min.js"></script>
		<script type="text/javascript" src="../../lib/jquery-validate/messages_pt_BR.js"></script>
		<script type="text/javascript" src="../../lib/jquery-mask/jquery.mask.min.js"></script>
		<script type="text/javascript" src="../../lib/jquery-timepicker/jquery.timepicker.min.js"></script>
		<script type="text/javascript" src="../../lib/datatables/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript" src="../../lib/ckeditor/ckeditor.js"></script>
		<script type="text/javascript" src="../../lib/ckeditor/adapters/jquery.js"></script>
		<script type="text/javascript" src="../../lib/uploadify/jquery.uploadify.min.js"></script>
		<script type="text/javascript" src="../../lib/fancybox/jquery.fancybox.pack.js"></script>
		<script type="text/javascript" src="http://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-4f7774466af48b4f"></script>
		<script type="text/javascript" src="../comum/js/comum.js"></script>
	</head>
	<body>
		<div id="container">
			<div id="content-wrapper" class="ui-tabs ui-widget ui-widget-content ui-corner-all">
				<!-- Navegação -->
				<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" id="navegacao">
					<h1><a href="../">Agenda de contatos</a></h1>
					<li class="ui-state-default ui-corner-top">
						<a class="tab icone_email ui-tabs-anchor" id="tab-email" href="../email">E-mail</a>
					</li>
					<li class="ui-state-default ui-corner-top">
						<a class="tab icone_categorias ui-tabs-anchor" id="tab-categorias" href="../categorias">Categorias</a>
					</li>
					<li class="ui-state-default ui-corner-top">
						<a class="tab icone_contatos ui-tabs-anchor" id="tab-contatos" href="../contatos">Contatos</a>
					</li>
				</ul>
				<!-- Conteúdo -->
				<div id="conteudo" class="ui-tabs-panel ui-widget-content ui-corner-bottom">