CREATE TABLE data(
	question_id INTEGER NOT NULL,
	start_time INTEGER NOT NULL,
	end_time INTEGER NOT NULL,
	user_id TEXT NOT NULL,
	question_index INTEGER NOT NULL,
	answer TEXT NOT NULL,
	justification TEXT NOT NULL,
	did_change_answer INTEGER NOT NULL,
	PRIMARY KEY(
		question_id,
		user_id,
		question_index,
		answer,
		justification,
		did_change_answer
	)
);
