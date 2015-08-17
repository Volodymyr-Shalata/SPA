<?php

$file = 'users.json';

function getMaxId($array){
	$max = 0;
	if(count($array)){
		for($i = 0; $i< count($array);$i++){
	        foreach($array[$i] as $key => $value){
	        if($key == 'id')
	            if($value > $max){
	                $max = $value;
	            };
	        }
	    }
    }
    return $max;
}

function cpm($a,$b){
	return ($a["id"]<$b["id"]) ? -1 :1;
}

if(isset($_POST['newUser'])){
	$newUser = $_POST['newUser'];
	$users = json_decode(file_get_contents($file),true);
	if($users){
		$count = count($users);
		$maxId = getMaxId($users);
		$newUser = array('id' => $maxId+1)+ $newUser;
	}else{
		$users = [];
		$newUser = array('id' =>1)+ $newUser;
	}
	array_push($users, $newUser);
	usort($users,"cpm");
	file_put_contents($file, json_encode($users));

	echo json_encode($users);exit;
}

if(isset($_POST['editUser']) && $_POST['editUser']){
	$editUser = $_POST['editUser'];
	$users = json_decode(file_get_contents($file), true);
	if($users){
		for($i = 0; $i< count($users);$i++){
			foreach($users[$i] as $key => $value){
			if($value == $editUser['id'])
				unset($users[$i]);
			}
		}
		array_push($users, $editUser);
        usort($users,"cpm");
		file_put_contents($file, json_encode($users));

		echo json_encode($users);exit;
	}
}

if(isset($_POST['operation']) && $_POST['operation'] == 'delete'){
	$id = $_POST['id'];
	$users = json_decode(file_get_contents($file),true);
	for($i = 0; $i< count($users);$i++){
    	foreach($users[$i] as $key => $value){
    	if($value ==$id)
    		unset($users[$i]);
    	}
    }
    usort($users,"cpm");
    file_put_contents($file, json_encode($users));

    echo json_encode($users);exit;
}

?>