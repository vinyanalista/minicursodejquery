<?php
define("SITE_HOME", "http://localhost/jquery/agenda");
define("SITE_DIR", "/srv/www/htdocs/jquery/agenda");
    
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
define("SMTP_FROM", "Você <seu@email.com>");
?>