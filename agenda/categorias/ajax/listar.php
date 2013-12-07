<?php
require_once '../../comum.php';

/* Lista todas as categorias. */

// Correspondência entre as colunas do data tables e as colunas do banco de dados
$colunas = array('nome', 'COUNT(contato_id) AS contatos', 'id');

// TODO Tentar montar consulta com Respect
$categorias_sql = 'SELECT nome, COUNT(contato_id) AS contatos, id FROM categoria LEFT JOIN contato_categoria ON contato_categoria.categoria_id = categoria.id';

// Busca
$where = '';
if ((isset($_REQUEST['sSearch'])) && (($busca = trim($_REQUEST['sSearch'])) != "")) {
	$where = "nome LIKE '%".mysqli_real_escape_string($mysqli, $busca)."%'";
}
if ($where != '') {
	$categorias_sql .= ' WHERE '.$where;
}

$categorias_sql .= ' GROUP BY id';

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
$categorias_sql .= ' ORDER BY '.$order_by;

// Paginação
if (isset($_POST['iDisplayStart'])) {
	$primeira_categoria = intval($_POST['iDisplayStart']);
} else {
	$primeira_categoria = intval(0);
}
if (isset($_POST['iDisplayLength'])) {
	$categorias_por_pagina = intval($_POST['iDisplayLength']);
} else {
	$categorias_por_pagina = intval(10);
}
$categorias_sql .= ' LIMIT '.$primeira_categoria.', '.$categorias_por_pagina;

// Obtém as categorias
if (!$categorias = $mysqli->query($categorias_sql)) {
	echo 'Houve um erro durante a execução da query:<br><br>' . $categorias_sql . '<br><br>';
	echo $mysqli -> error.'<br><br>';
	exit();
}

// Número de categorias a exibir
$categorias_a_exibir_sql = 'SELECT COUNT(id) AS categorias_a_exibir FROM categoria';
if ($where != '') {
	$categorias_a_exibir_sql .= ' WHERE '.$where;
}
if (!$categorias_a_exibir_query = $mysqli -> query($categorias_a_exibir_sql)) {
	echo 'Houve um erro durante a execução da query:<br><br>' . $categorias_a_exibir_sql . '<br><br>';
	echo $mysqli -> error.'<br><br>';
	exit();
}
$categorias_a_exibir_linha = $categorias_a_exibir_query -> fetch_row();
$categorias_a_exibir = $categorias_a_exibir_linha[0];

// Quantidade total de categorias
$total_de_categorias_sql = 'SELECT COUNT(id) AS total_de_categorias FROM categoria';
if (!$total_de_categorias_query = $mysqli -> query($total_de_categorias_sql)) {
	echo 'Houve um erro durante a execução da query:<br><br>' . $total_de_categorias_sql . '<br><br>';
	echo $mysqli -> error.'<br><br>';
	exit();
}
$total_de_categorias_linha = $total_de_categorias_query -> fetch_row();
$total_de_categorias = $total_de_categorias_linha[0];

// Forma a resposta
ini_set('default_charset','utf8');
header("Content-Type: application/json; charset=UTF-8", true);

$resposta = array(
	'sEcho' => $_POST['sEcho'],
	'iTotalRecords' => $total_de_categorias,
	'iTotalDisplayRecords' => $categorias_a_exibir,
	'aaData' => array()
);

while ($categoria = $categorias->fetch_array()) {
	$resposta['aaData'][] = $categoria;
}

echo json_encode($resposta);
?>
