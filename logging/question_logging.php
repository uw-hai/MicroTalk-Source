<?php
header('Access-Control-Allow-Origin: *');
if (
	!isset($_POST['experiment']) ||
	!isset($_POST['start_time']) ||
	!isset($_POST['end_time']) ||
	!isset($_POST['user_id']) ||
	!isset($_POST['question_id']) ||
	!isset($_POST['question_index']) ||
	!isset($_POST['answer']) ||
	!isset($_POST['justification']) ||
	!isset($_POST['did_change_answer']) ||
	!isset($_POST['app_token'])
) {
	die('no.');
}

$SECRET_KEY = "4JKIOVTZWEK57G2THZ8X2TPA697PAKKG";

$experiment = $_POST['experiment'];
$start_time = $_POST['start_time'];
$end_time = $_POST['end_time'];
$user_id = $_POST['user_id'];
$question_id = $_POST['question_id'];
$question_index = $_POST['question_index'];
$answer = $_POST['answer'];
$justification = $_POST['justification'];
$did_change_answer = $_POST['did_change_answer'];
$app_token = $_POST['app_token'];

$hash = md5($SECRET_KEY . $user_id . $start_time);

if ($app_token != $hash) {
	die('Bad.');
}

$question_id = (int) $question_id;
$fp = sprintf('%s/question_%d.db', $experiment, $question_id);
$db = new SqLite3($fp);
$db->busyTimeout(25000);

$start_time = "'" . $db->escapeString($start_time) . "'";
$end_time = "'" . $db->escapeString($end_time) . "'";
$user_id = "'" . $db->escapeString($user_id) . "'";
$question_index = "'" . $db->escapeString($question_index) . "'";
$answer = "'" . $db->escapeString($answer) . "'";
$justification = "'" . $db->escapeString($justification) . "'";
$did_change_answer = "'" . $db->escapeString($did_change_answer) . "'";

$data = implode(',', array(
	$start_time,
	$end_time,
	$user_id,
	$question_index,
	$answer,
	$justification,
	$did_change_answer
));

$query = "INSERT INTO data (start_time, end_time, user_id, question_index, answer, justification, did_change_answer) VALUES  (" . $data . ");";
$sql_return = $db->query($query);
$db->close();
unset($db);
exit();
?>
