<?php
require_once '../../comum/php/comum.php';

if (!empty($_FILES)) {
	$tempFile = $_FILES['Filedata']['tmp_name'];
	$targetFile = rtrim(UPLOADS_TEMP_DIR, '/') . '/' . $_FILES['Filedata']['name'];
	
	// Validate the file type
	$fileTypes = array('jpg','gif','png','jpeg'); // File extensions
	$fileParts = pathinfo($_FILES['Filedata']['name']);
	
	if (in_array(strtolower($fileParts['extension']),$fileTypes)) {
		move_uploaded_file($tempFile, $targetFile);
		echo SITE_HOME . '/comum/imagens/uploads/temp/' . $_FILES['Filedata']['name'];
	} else {
		echo 'Invalid file type.';
	}
}
?>