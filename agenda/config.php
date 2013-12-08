<?php
define("SITE_HOME", "http://localhost/jquery/agenda");
define("SITE_DIR", dirname(__FILE__));
define("UPLOADS_DIR", SITE_DIR . '/comum/imagens/uploads');
define("UPLOADS_TEMP_DIR", UPLOADS_DIR . '/temp');
    
// Configuração do MySQL

define("MYSQL_HOST", "localhost");
define("MYSQL_USER", "root");
define("MYSQL_PASSWORD", "123456"); 
define("MYSQL_DATABASE", "agenda");

// Exibição de erros

//error_reporting(0);
error_reporting(E_ALL);
//ini_set('display_errors', 1);
 
// Envio de e-mails
 
define("SMTP_HOST", "ssl://seu.servidor_smtp.com");
define("SMTP_USERNAME", "seu_usuario");
define("SMTP_PASSWORD", "sua_senha"); 
define("SMTP_PORT", 123456);
define("SMTP_FROM", "Seu Nome <seu@email.com>");
?>