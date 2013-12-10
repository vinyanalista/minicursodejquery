Desenvolvimento de sites para a web 2.0 com jQuery
==================

A Internet das páginas de conteúdo estático cedeu espaço a um ambiente dinâmico, com sites e sistemas ricos em design e funcionalidades. Para implementar sites interativos e atraentes, os desenvolvedores recorrem a bibliotecas como o jQuery para simplificar todas as tarefas das mais simples às mais complicadas, como por exemplo: modificar o design e conteúdo da página, acrescentar animações, prover interatividade com suporte a eventos, facilitar o uso do AJAX, etc. Além disso, o jQuery pode ser expandido através de plugins, utiliza uma sintaxe fácil de aprender e respeita os padrões da Internet, contribuindo para a correta exibição do site nos diversos navegadores existentes. Não sem motivo, o jQuery é a biblioteca JavaScript mais usada, presente em 55% dos 10 mil sites mais visitados do mundo.

O objetivo deste minicurso é introduzir o desenvolvedor à utilização do jQuery. Serão apresentados os conceitos básicos para a utilização dessa biblioteca, assim como exemplos cotidianos do uso de suas rotinas e plugins. Espera-se que após o minicurso os desenvolvedores sejam capazes de utilizar a biblioteca eficientemente em seus projetos, assim como trilhar seus próprios caminhos na descoberta de mais funcionalidades e plugins.

Requisitos para realizar o minicurso
==================

Caso você queira utilizar seu computador para realizar o minicurso, você deve possuir os seguintes programas devidamente instalados e configurados:

* Navegador [Google Chrome](http://www.google.com/intl/pt-BR/chrome/) ou [Mozilla Firefox](http://www.mozilla.org/pt-BR/firefox/new/), atualizado até a versão mais recente;
* Servidor web [Apache](http://httpd.apache.org/) com [PHP](http://php.net/);
* Banco de dados [MySQL](http://dev.mysql.com/downloads/mysql/) 
* Recomenda-se a utilização de um Ambiente de desenvolvimento como o [Aptana Studio](http://www.aptana.com/);

Ao invés de instalar e configurar isoladamente o Apache, o PHP e o MySQL, você pode optar por instalar o [XAMPP](http://www.apachefriends.org/pt_br/xampp.html), que é uma distribuição Apache contendo PHP e MySQL, tudo já configurado.

Instruções para baixar o minicurso
==================

Clicando aqui você baixa um único arquivo compactado ZIP contendo todo o minicurso (apresentação + aplicação de exemplo) em sua última versão. Para extrair o conteúdo desse arquivo ZIP, no Windows, você pode utilizar um programa como o [7-Zip](http://www.7-zip.org/) ou o próprio mecanismo de extração de arquivos compactados do sistema. No Linux, a maioria das distribuições já vem com um utilitário, seja de linha de comando, seja de interface gráfica, próprio para a extração do conteúdo de arquivos ZIP.

Se você possui o [Git](http://git-scm.com/) instalado no seu computador, pode baixar o minicurso através dos seguintes comandos:

```
$ cd ~ # Mude para a pasta onde será baixado o minicurso
$ git clone https://github.com/vinyanalista/minicursodejquery.git
```

Instruções para executar o minicurso
==================

1. Mova (ou copie) a pasta do minicurso para a pasta onde ficam as páginas do seu servidor web (no caso do XAMPP, o padrão é `C:/xampp/htdocs` no Windows e `/opt/lampp/htdocs` no Linux).

2. Crie um banco de dados para a aplicação (no XAMPP, isso pode ser feito através do [phpMyAdmin](http://www.phpmyadmin.net/), que pode ser acessado via [http://localhost/phpmyadmin](http://localhost/phpmyadmin)).

3. Execute os comandos SQL do script [agenda.sql](agenda.sql) no banco de dados recém criado.

4. Altere o arquivo [agenda/config.php](agenda/config.php) para refletir a configuração do seu servidor:

```php
<?php
define("SITE_HOME", "http://localhost/minicursodejquery/agenda");
define("SITE_DIR", dirname(__FILE__));
define("UPLOADS_DIR", SITE_DIR . '/comum/imagens/uploads');
define("UPLOADS_TEMP_DIR", UPLOADS_DIR . '/temp');
    
// Configuração do MySQL

define("MYSQL_HOST", "localhost");
define("MYSQL_USER", "root");
define("MYSQL_PASSWORD", "123456"); 
define("MYSQL_DATABASE", "agenda");
```

Se o minicurso está dentro da pasta `minicursodejquery`, agora você pode acessar:

* A apresentação via [http://localhost/minicursodejquery/apresentacao](http://localhost/minicursodejquery/apresentacao); ou
* A aplicação de exemplo via [http://localhost/minicursodejquery/agenda](http://localhost/minicursodejquery/agenda)

Termos de uso
==================

Copyleft 2013 [Antônio Vinícius Menezes Medeiros](https://github.com/vinyanalista/). A apresentação e a aplicação de exemplo do minicurso podem ser utilizadas conforme as licenças [GPLv2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html) ou [MIT](http://opensource.org/licenses/mit-license.php).

Contato
==================

Quaisquer dúvidas acerca do minicurso podem ser enviadas para o meu e-mail vinyanalista at gmail. Por favor, se identificar e deixar claro no campo Assunto que o e-mail se trata do minicurso.

Desde já, obrigado pelo seu interesse no meu minicurso! :)