<?php
require_once ("utilities/configfactory.php");
require_once ("utilities/config_database.php");
require_once ("keyrepo.php");
header('Content-Type: application/json');
$request = (!empty($_REQUEST)) ? $_REQUEST : null;
try {
	$retArr = null;
	$pdo = ConfigFactory::build("Database", "config.ini") -> getPDODatabase();
	$keyrepo = new KeyRepo($pdo);
	switch($request["action"]) {
		case "getkeylist" :
			break;
		case "getsoftwaretypes" :
			$retArr = $keyrepo -> getSoftwareTypes($request);
			break;
		case "search" :
			$retArr = $keyrepo -> search($request);
			
			break;
	}
	print(json_encode($retArr, JSON_PRETTY_PRINT));
} catch(PDOException $e) {
	print($e -> getMessage());
}
?>
