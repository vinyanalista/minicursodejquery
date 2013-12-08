<?php
namespace Agenda\Entities;

/* Entidades */

class Categoria {
	public $id, $nome;
}

class Contato {
	public $id, $nome, $apelido, $data_nascimento, $logradouro, $numero, $bairro, $cidade, $estado, $foto_id;
}

class Email {
	public $id, $endereco, $contato_id;
}

class Foto {
	public $id, $nome_arquivo, $data_hora, $descricao, $contato_id;
}

class Telefone {
	public $id, $numero, $contato_id;
}

// Torna as entidades visíveis no namespace global
class_alias('Agenda\Entities\Categoria', 'Categoria');
class_alias('Agenda\Entities\Contato', 'Contato');
class_alias('Agenda\Entities\Email', 'Email');
class_alias('Agenda\Entities\Foto', 'Foto');
class_alias('Agenda\Entities\Telefone', 'Telefone');
?>