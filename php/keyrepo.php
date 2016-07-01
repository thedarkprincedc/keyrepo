<?php
	class KeyRepo{
		public $pdo = null;
		function __construct($pdoRef){
			$this->pdo = $pdoRef;
		}
		function getSoftwareTypes($request){
			$retArr = new stdClass();
			$retArr->items = array();
			$retArr->items[] = new stdClass();
			$retArr->items[0]->id = "a1";
			$retArr->items[0]->text = "All Programs";
			$retArr->items[0]->selected = true;
			$retArr->items[0]->userdata = array("searchterm" => "?all");
			 
			if($stmt = $this->pdo->query("SELECT id, type FROM `keyrepo.keys` GROUP BY type")){
				foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $key => $value) {
					$itemObj = new stdClass();
					$itemObj->id = strtolower($value["type"]);
					$itemObj->text = $value["type"];
					$retArr->items[] = $itemObj;
				}
			}
				
			$itemObj = new stdClass();
			$itemObj->id = "dd";
			$itemObj->text = "Export Backup";
			$retArr->items[] = $itemObj;
			return $retArr;
		}
		function search($request){
			$query = (!empty($request["q"]))?$request["q"]:null;
			$name = (!empty($request["name"]))?$request["name"]:null;
			$os = (!empty($request["os"]))?$request["os"]:null;
			$type = (!empty($request["type"]))?$request["type"]:null;
			$manufacturer = (!empty($request["manufacturer"]))?$request["manufacturer"]:null;
			
			$retArr = new stdClass();
			$whereClause = "";
			if($type && $type !== "a1"){
				$whereClause = "type = '{$type}'";
			}
			$whereClause = (strlen($whereClause)>0) ? "WHERE {$whereClause}" : "";
			if($stmt = $this->pdo->query("SELECT * FROM `keyrepo.keys` {$whereClause}")){
				foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $key => $value) {
					$retObj = new stdClass();
					$retObj->id = $value["id"];
					$retObj->data = array($value["name"],$value["company"],$value["type"],"wvwewecewcewc");
					$retArr->rows[] = $retObj;
				}
			}
	
			
			
			return $retArr;
		}
		
	}
?>