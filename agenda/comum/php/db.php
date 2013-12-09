<?php
/* Respect */

require_once dirname(__FILE__) . '/../../../lib/respect/Data/Styles/Stylable.php';
require_once dirname(__FILE__) . '/../../../lib/respect/Data/Styles/AbstractStyle.php';
require_once dirname(__FILE__) . '/../../../lib/respect/Data/Styles/Standard.php';
require_once dirname(__FILE__) . '/../../../lib/respect/Data/CollectionIterator.php';
require_once dirname(__FILE__) . '/../../../lib/respect/Data/Collections/Collection.php';
require_once dirname(__FILE__) . '/../../../lib/respect/Data/Collections/Typable.php';
require_once dirname(__FILE__) . '/../../../lib/respect/Data/Collections/Mixable.php';
require_once dirname(__FILE__) . '/../../../lib/respect/Data/Collections/Filterable.php';
require_once dirname(__FILE__) . '/../../../lib/respect/Data/AbstractMapper.php';
require_once dirname(__FILE__) . '/../../../lib/respect/Relational/Db.php';
require_once dirname(__FILE__) . '/../../../lib/respect/Relational/Sql.php';
require_once dirname(__FILE__) . '/../../../lib/respect/Relational/Mapper.php';

require_once dirname(__FILE__) . '/entities.php';

use  \PDO, Respect\Relational\Mapper, Respect\Relational\Db;

$conn = new PDO('mysql:host=' . MYSQL_HOST . ';port=3306;dbname=' . MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD);
$db = new Mapper($conn);
$db -> entityNamespace = '\\Agenda\\Entities';
$db_sql = new Db($conn);

class_alias('Respect\Relational\Sql', 'Sql');

/* MySQLi */

use \mysqli;

$mysqli = new mysqli(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE);

if (mysqli_connect_errno()) {
	echo "There was an error while trying to connect to the database:<br><br>" . mysqli_connect_error();
	return;
}

/* Auxiliary functions */

//Formats a time indication to send to the database
function mysql_time($time = NULL) {
	if ($time == NULL) {
		return 'NOW()';
	} else {
		return date("Y-m-d H:i", $time);
	}
}

function format_date($date = NULL, $to_mysql = FALSE) {
	if (!$to_mysql) {
		if (empty($date)) {
			return date('d/m/Y');
		} else {
			return date('d/m/Y', strtotime($date));
		}
	} else {
		if (empty($date)) {
			return date('Y-m-d');
		} else {
			return date('Y-m-d', strtotime($date));
		}
	}
}

function format_datetime($datetime = NULL, $to_mysql = FALSE) {
	if (!$to_mysql) {
		if (empty($datetime)) {
			return date('d/m/Y H:i');
		} else {
			return date('d/m/Y H:i', strtotime($datetime));
		}
	} else {
		if (empty($datetime)) {
			return date('Y-m-d H:i');
		} else {
			return date('Y-m-d H:i', strtotime($datetime));
		}
	}
}
?>
