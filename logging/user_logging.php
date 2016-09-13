<?php
header('Access-Control-Allow-Origin: *');
if (
	!isset($_POST['experiment']) ||
	!isset($_POST['time_stamp']) ||
	!isset($_POST['user_id']) ||
	!isset($_POST['mturk_id']) ||
	!isset($_POST['app_token'])
) {
	print_r($_POST);
	die('no.');
}

$SECRET_KEY = "4JKIOVTZWEK57G2THZ8X2TPA697PAKKG";

$experiment = $_POST['experiment'];
$time_stamp = $_POST['time_stamp'];
$user_id = $_POST['user_id'];
$mturk_id = $_POST['mturk_id'];
$app_token = $_POST['app_token'];

$hash = md5($SECRET_KEY . $user_id . $time_stamp);

if ($app_token != $hash) {
	die('Bad.');
}

$fp = sprintf('%s/users.db', $experiment);
$db = new SqLite3($fp);
$db->busyTimeout(25000);

$time_stamp = "'" . $db->escapeString($time_stamp) . "'";
$user_id = "'" . $db->escapeString($user_id) . "'";
$mturk_id = "'" . $db->escapeString($mturk_id) . "'";

if (isset($_POST['bonus'])) {
	$bonus = "'" . $db->escapeString($_POST['bonus']) . "'";
	$data = implode(',', array(
		$time_stamp,
		$user_id,
		$mturk_id,
		$bonus
	));

	$query = "INSERT INTO bonuses (time_stamp, user_id, mturk_id, bonus) VALUES  (" . $data . ");";
	$sql_return = $db->query($query);
	$db->close();
	unset($db);
	die();
}

$data = implode(',', array(
	$time_stamp,
	$user_id,
	$mturk_id,
));

$query = "INSERT INTO users (time_stamp, user_id, mturk_id) VALUES  (" . $data . ");";
$sql_return = $db->query($query);
$db->close();
unset($db);
exit();
?>
