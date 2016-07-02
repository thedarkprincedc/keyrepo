<?php
require_once ("utilities/configfactory.php");
require_once ("utilities/config_database.php");
require_once ("keyrepo.php");
header('Content-Type: application/json');
$request = (!empty($_REQUEST)) ? $_REQUEST : null;
$request_body = file_get_contents('php://input');
parse_str($request_body, $request_arr);
//print_r($request_arr);
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
		case "addkey":
			$retArr = $keyrepo -> addKey($request_arr);
			break;
		case "deletekey":
			$retArr = $keyrepo -> deleteKey($request);
			break;
	}
	print(json_encode($retArr, JSON_PRETTY_PRINT));
} catch(PDOException $e) {
	print($e -> getMessage());
}
?>
