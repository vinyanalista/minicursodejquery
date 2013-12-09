<?php
require_once '../../comum/php/comum.php';

/* Contato */

$cadastro = ($_POST['acao'] == 'cadastrar');
if ($cadastro) {
	$contato = new Contato();
} else {
	$contato = $db -> contato[$_POST['id']] -> fetch();
}
$contato -> nome = $_POST['nome'];
$contato -> apelido = $_POST['apelido'];
$contato -> data_nascimento = ($_POST['data_nascimento'] ? format_date($_POST['data_nascimento'], TRUE) : NULL);
$contato -> logradouro = $_POST['logradouro'];
$contato -> numero = ($_POST['numero'] ? $_POST['numero'] : NULL);
$contato -> bairro = $_POST['bairro'];
$contato -> cidade = $_POST['cidade'];
$contato -> estado = $_POST['estado'];
$contato -> foto_id = NULL;
$db -> contato -> persist($contato);
$db -> flush();

/* Contato - telefone */

if (!$cadastro) {
	$mysqli -> query('DELETE FROM telefone WHERE contato_id = ' . $contato -> id);
}
if (!empty($_POST['telefone'])) {
	foreach ($_POST['telefone'] as $numero) {
		if (!empty($numero)) {
			$mysqli -> query('INSERT INTO telefone (contato_id, numero) VALUES (' . $contato -> id . ', \'' . $numero . '\');');
		}
	}
}

/* Contato - e-mail */

if (!$cadastro) {
	$mysqli -> query('DELETE FROM email WHERE contato_id = ' . $contato -> id);
}
if (!empty($_POST['email'])) {
	foreach ($_POST['email'] as $endereco) {
		if (!empty($endereco)) {
			$mysqli -> query('INSERT INTO email (contato_id, endereco) VALUES (' . $contato -> id . ', \'' . $endereco . '\');');
		}
	}
}

/* Contato - foto */

if (!$cadastro) {
	$mysqli -> query('DELETE FROM foto WHERE contato_id = ' . $contato -> id);
}
if (!empty($_POST['foto_nome_arquivo'])) {
	$diretorio_fotos_do_contato = UPLOADS_DIR . '/' . $contato -> id;
	// Se não existir, cria o diretório onde serão armazenadas as fotos do contato
	if (!empty($_POST['foto_manter']) && !file_exists($diretorio_fotos_do_contato)) {
		mkdir($diretorio_fotos_do_contato);
	}
	$contato_foto_principal = -1;
	foreach($_POST['foto_nome_arquivo'] as $nome_arquivo) {
		$manter = isset($_POST['foto_manter'][$nome_arquivo]);
		$data = $_POST['foto_data'][$nome_arquivo];
		$hora = $_POST['foto_hora'][$nome_arquivo];
		$descricao = $_POST['foto_descricao'][$nome_arquivo];
		$arquivo_temporario = UPLOADS_TEMP_DIR . '/' . $nome_arquivo;
		$arquivo_definitivo = $diretorio_fotos_do_contato . '/' . $nome_arquivo;
		if (!file_exists($arquivo_definitivo)) {
			// Foto nova sendo enviada agora
			if ($manter) {
				rename($arquivo_temporario, $arquivo_definitivo);
			} else {
				unlink($arquivo_temporario);
			}
		} else {
			// Foto que já pertencia ao contato
			if (!$manter) {
				unlink($arquivo_definitivo);
			}
		}
		if ($manter) {
			$foto = new Foto();
			$foto -> nome_arquivo = $nome_arquivo;
			if (empty($data) && !empty($hora)) {
				$data = format_date();
			}
			$foto -> data_hora = format_date(trim($data . ($hora ? ' ' . $hora : '')), TRUE);
			$foto -> descricao = $descricao;
			$foto -> contato_id = $contato -> id;
			$db -> foto -> persist($foto);
			$db -> flush();
			if ($nome_arquivo == $_POST['foto_principal']) {
				$contato_foto_principal = $foto -> id;
			}
		}
	}
	if ($contato_foto_principal != -1) {
		$contato -> foto_id = $contato_foto_principal;
		$db -> contato -> persist($contato);
		$db -> flush();
	}
}

/* Contato - categoria */

if (!$cadastro) {
	$mysqli -> query('DELETE FROM contato_categoria WHERE contato_id = ' . $contato -> id);
}
if (!empty($_POST['categoria_id'])) {
	foreach ($_POST['categoria_id'] as $categoria_id) {
		$mysqli -> query('INSERT INTO contato_categoria (contato_id, categoria_id) VALUES (' . $contato -> id . ', ' . $categoria_id . ');');
	}
}

echo TRUE;
?>