<?php
require_once '../../comum/php/comum.php';

$destinatarios_sql =
"SELECT * FROM (
	(
		SELECT contato.id AS id, CONCAT(contato.nome, ' (', email.endereco, ')') AS nome, email.endereco AS email, '1' AS contato_ou_categoria
		FROM contato INNER JOIN email ON email.contato_id = contato.id
	) UNION (
		SELECT contato.id AS id, CONCAT(contato.apelido, ' (', email.endereco, ')') AS nome, email.endereco AS email, '1' AS contato_ou_categoria
		FROM contato INNER JOIN email ON email.contato_id = contato.id
	) UNION (
		SELECT categoria.id AS id, CONCAT(categoria.nome, ' (categoria)') AS nome, NULL AS email, '2' AS contato_ou_categoria 
		FROM categoria
	)
) AS destinatarios";
if (isset($_POST['typed'])) {
	$destinatarios_sql .= " WHERE nome LIKE '%{$_POST['typed']}%'";
}
$destinatarios_sql .= " ORDER BY nome";

// Obtém os destinatários
if (!$destinatarios = $mysqli -> query($destinatarios_sql)) {
	echo 'Houve um erro durante a execução da query:<br><br>' . $destinatarios_sql . '<br><br>';
	echo $mysqli -> error.'<br><br>';
	exit();
}

// Forma a resposta
ini_set('default_charset','utf8');
header("Content-Type: application/json; charset=UTF-8", true);

$resposta = array();
while ($destinatario = $destinatarios -> fetch_array()) {
	$resposta[] = array('contato_ou_categoria' => $destinatario['contato_ou_categoria'], 'id'=>$destinatario['id'], 'label' => $destinatario['nome'], 'value' => $destinatario['nome'], 'email' => $destinatario['email']);
}

echo json_encode($resposta);
?>