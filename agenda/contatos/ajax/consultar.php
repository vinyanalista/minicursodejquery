<?php
require_once '../../comum/php/comum.php';

$contato = $db -> contato[$_POST['id']] -> fetch();
$contato -> data_nascimento = ($contato -> data_nascimento ? format_date($contato -> data_nascimento) : '');

// Forma a resposta
ini_set('default_charset','utf8');
header("Content-Type: application/json; charset=UTF-8", true);
echo json_encode(get_object_vars($contato));
?>