/// <reference path="./def/jquery.d.ts" />
import JQuery = require('jquery');
import {Md5} from 'ts-md5/dist/md5';

class Logging {
	public static EXPERIMENT: string = 'IterativeImprovement';
	private static SECRET_KEY: string = '4JKIOVTZWEK57G2THZ8X2TPA697PAKKG';
	private static EVENT_URL: string = 'https://students.washington.edu/drapeau/MicroTalk/question_logging.php';
	private static USER_URL: string = 'https://students.washington.edu/drapeau/MicroTalk/user_logging.php';

	public static logEvent(
		userId : string,
		startTime : Number,
		endTime : Number,
		questionId : Number,
		questionIndex: Number,
		answer : boolean,
		justification : string,
		didChangeAnswer : boolean,
		callback : any
	) {
		var logData = {
			experiment: Logging.EXPERIMENT,
			start_time: startTime,
			end_time: endTime,
			user_id: userId,
			question_id: questionId,
			question_index: questionIndex,
			answer: answer,
			justification: justification,
			did_change_answer: didChangeAnswer,
			app_token: Logging.md5Hash(userId, startTime)
		};

		JQuery.post(Logging.EVENT_URL, logData, callback);
	}

	public static logUser(userId: string, time_stamp: Number, mTurkId: string) {
		var logData = {
			experiment: Logging.EXPERIMENT,
			time_stamp: time_stamp,
			user_id: userId,
			mturk_id: mTurkId,
			app_token: Logging.md5Hash(userId, time_stamp)
		};

		JQuery.post(Logging.USER_URL, logData, function(m) {
			// TODO: Handle db insertion failure? Probably ok.
			return;
		});
	}

	public static logUserBonus(userId: string, time_stamp: Number, mTurkId: string, bonus: Number) {
		var logData = {
			experiment: Logging.EXPERIMENT,
			time_stamp: time_stamp,
			user_id: userId,
			mturk_id: mTurkId,
			bonus: bonus,
			app_token: Logging.md5Hash(userId, time_stamp)
		};

		JQuery.post(Logging.USER_URL, logData, function(m) {
			// TODO: Handle db insertion failure?
			return;
		});
	}

    private static md5Hash(userId : string, startTime : Number): any {
		return Md5.hashStr(Logging.SECRET_KEY + userId + startTime);
    }
}

export = Logging;
