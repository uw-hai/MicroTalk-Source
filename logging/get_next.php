<?php
header('Access-Control-Allow-Origin:*');
if (
	!isset($_GET['experiment']) ||
	!isset($_GET['question_id']) ||
	!isset($_GET['answer'])
) {
	die('no.');
}

$experiment = $_GET['experiment'];
$question_id = $_GET['question_id'];
$answer = filter_var($_GET['answer'], FILTER_VALIDATE_BOOLEAN);

// Given a question number and assessment / justification: determine if we need to get a justification or a reassessment from the worker
$fp = sprintf('%s/question_%d.db', $experiment, $question_id);
$db = new SqLite3($fp);
$db->busyTimeout(25000);
$result = $db->query('SELECT answer, justification FROM data WHERE justification != "";');

// Process result
$counterarguments = array();
$i = 0;
$found_counter_argument = false;
$found_justification = false;
while($res = $result->fetchArray(SQLITE3_ASSOC)) {
	$db_answer = filter_var($res['answer'], FILTER_VALIDATE_BOOLEAN);
	if ($answer == $db_answer) {
		$found_justification = true;
	} else {
		$found_counter_argument = true;
		$counterarguments[$i++] = '"' . $res['justification'] . '"';
	}
}

$db->close();
unset($db);

// Check if we should grab a justification for this question
if (!$found_counter_argument && !$found_justification) {
	die('{"action": "collectJustification"}');
}

// Check if we should present a counterargument for this question
if ($found_counter_argument && $found_justification) {
	die('{"action": "collectReconsider", "arguments": [' . implode(',', $counterarguments) . ']}');
}

// Check if we should present a counterargument for this question and collect justification
if ($found_counter_argument && !$found_justification) {
	die('{"action": "both", "arguments": [' . implode(',', $counterarguments) . ']}');
}

// Otherwise the worker should move onto the next question
die('{"action": "moveOn"}');
?>
