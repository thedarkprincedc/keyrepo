<?php
	class ConfigFactory{
		public static function build($type, $inifile = null){
			$ini_array = parse_ini_file((!empty($inifile))?$inifile:$default_location, TRUE);
			$config = "Config_{$type}";
			if(class_exists($config)){
				return new $config($ini_array);
			}
			else{
				throw new Exception("Invalid config type given.");
			}
		}
	}
?>