<?php
class Config_Database {
	protected $ini_array;
	protected $host;
	protected $database;
	protected $username;
	protected $password;
	public function __construct($ini_array) {
        $this->ini_array = $ini_array;
		$this->host = (!empty($this->ini_array["config"]["host"]))?$this->ini_array["config"]["host"]:"";
		$this->database = (!empty($this->ini_array["config"]["database"]))?$this->ini_array["config"]["database"]:"";
		$this->username = (!empty($this->ini_array["config"]["username"]))?$this->ini_array["config"]["username"]:"";
		$this->password = (!empty($this->ini_array["config"]["password"]))?$this->ini_array["config"]["password"]:"";
    }
	public function getPDODatabase(){
		return new PDO("mysql:host={$this->host};dbname={$this->database}", $this->username, $this->password);
	}
}
?>