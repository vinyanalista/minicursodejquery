<?php
require_once '../../comum.php';

/* Lista todos os contatos. */

// Correspondência entre as colunas do data tables e as colunas do banco de dados
$colunas = array('nome', 'id');

// TODO Tentar montar consulta com Respect
$contatos_sql = 'SELECT nome, id FROM contato';

// Busca
$where = '';
if ((isset($_REQUEST['sSearch'])) && (($busca = trim($_REQUEST['sSearch'])) != "")) {
	$where = "nome LIKE '%".mysqli_real_escape_string($mysqli, $busca)."%'";
}
if ($where != '') {
	$contatos_sql .= ' WHERE '.$where;
}

// Ordenação
$order_by = '';
if (isset($_POST['iSortCol_0'])) {
	for ($sc = 0; $sc < intval($_POST['iSortingCols']); $sc++) {
		if ($_POST['bSortable_'.intval($_POST['iSortCol_'.$sc])] == "true") {
			$order_by .= $colunas[intval($_POST['iSortCol_'.$sc])].' '.
				($_POST['sSortDir_'.$sc]==='asc' ? 'ASC' : 'DESC') .", ";
		}
	}
	$order_by = substr_replace($order_by, '', -2);
}
if ($order_by == '') {
	$order_by = 'nome ASC';
}
$contatos_sql .= ' ORDER BY '.$order_by;

// Paginação
if (isset($_POST['iDisplayStart'])) {
	$primeiro_contato = intval($_POST['iDisplayStart']);
} else {
	$primeiro_contato = intval(0);
}
if (isset($_POST['iDisplayLength'])) {
	$contatos_por_pagina = intval($_POST['iDisplayLength']);
} else {
	$contatos_por_pagina = intval(10);
}
$contatos_sql .= ' LIMIT '.$primeiro_contato.', '.$contatos_por_pagina;

// Obtém os contatos
if (!$contatos = $mysqli->query($contatos_sql)) {
	echo 'Houve um erro durante a execução da query:<br><br>' . $contatos_sql . '<br><br>';
	echo $mysqli -> error.'<br><br>';
	exit();
}

// Número de contatos a exibir
$contatos_a_exibir_sql = 'SELECT COUNT(id) AS contatos_a_exibir FROM contato';
if ($where != '') {
	$contatos_a_exibir_sql .= ' WHERE '.$where;
}
if (!$contatos_a_exibir_query = $mysqli -> query($contatos_a_exibir_sql)) {
	echo 'Houve um erro durante a execução da query:<br><br>' . $contatos_a_exibir_sql . '<br><br>';
	echo $mysqli -> error.'<br><br>';
	exit();
}
$contatos_a_exibir_linha = $contatos_a_exibir_query -> fetch_row();
$contatos_a_exibir = $contatos_a_exibir_linha[0];

// Quantidade total de contatos
$total_de_contatos_sql = 'SELECT COUNT(id) AS total_de_contatos FROM contato';
if (!$total_de_contatos_query = $mysqli -> query($total_de_contatos_sql)) {
	echo 'Houve um erro durante a execução da query:<br><br>' . $total_de_contatos_sql . '<br><br>';
	echo $mysqli -> error.'<br><br>';
	exit();
}
$total_de_contatos_linha = $total_de_contatos_query -> fetch_row();
$total_de_contatos = $total_de_contatos_linha[0];

// Forma a resposta
ini_set('default_charset','utf8');
header("Content-Type: application/json; charset=UTF-8", true);

$resposta = array(
	'sEcho' => $_POST['sEcho'],
	'iTotalRecords' => $total_de_contatos,
	'iTotalDisplayRecords' => $contatos_a_exibir,
	'aaData' => array()
);

while ($contato = $contatos->fetch_array()) {
	$resposta['aaData'][] = $contato;
}

echo json_encode($resposta);
?>
