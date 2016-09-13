CREATE TABLE users(
	time_stamp INTEGER NOT NULL,
	user_id TEXT NOT NULL,
	mturk_id TEXT NOT NULL,
	PRIMARY KEY(
		user_id,
		mturk_id
	)
);

CREATE TABLE bonuses(
	time_stamp INTEGER NOT NULL,
	user_id TEXT NOT NULL,
	mturk_id TEXT NOT NULL,
	bonus DECIMAL NOT NULL,
	PRIMARY KEY(
		user_id,
		mturk_id
	)
);
