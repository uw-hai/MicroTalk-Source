class Constants {
	public static IS_BASELINE: boolean = false;

	public static SHOW_RANDOM_ARG: boolean = true;
	public static EXPERIMENTS: any = ['Perfect', 'Worker'];

	public static GET_NEXT_URL: string = 'https://students.washington.edu/drapeau/MicroTalk/get_next.php';
	public static WELCOME_SCREEN: Number = 0;
	public static INSTRUCTIONS_SCREEN: Number = 1;
	public static INSTRUCTIONS_SCREEN_ARGS: Number = 2;
	public static QUESTION_START_SCREEN: Number = 3;
	public static QUESTIONS_SCREEN: Number = 4;
	public static THANK_YOU_SCREEN: Number = 5;

	public static INSTRUCTIONS_TIME: Number = 25000;
	public static JUSTIFICATION_BONUS: string = "$0.05";
	public static CHANGE_BONUS: string = "$0.05";
	public static BASE_PAY: string = "$1.75";
	public static BONUS_AMOUNT: Number = 0.05;

	public static MIN_ARG_LENGTH: Number = 35;
	public static NUM_QUESTIONS: Number = 10;

	public static FILTERING_QUESTION_IDS: Array<Number> = [6, 7, 8, 9, 10];

	public static SURVEY_CODE: Number = 234029;

	public static QUESTION_IDS = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10
	];

	public static getRand(min, max) {
	    return Math.floor(Math.random() * (max - min)) + min;
	}

	public static ORDER = null;

	public static ENTITY_TYPES = {
		'Pakistan' : 'Country',
		'Gaza' : 'Territory',
		'Iraq' : 'Country',
		'Saudi Arabia' : 'Country',
		'Mexico City' : 'City',
		'Lebanon' : 'Sovereign State',
		'Vienna' : 'City',
		'western Moscow' : 'Region',
		'Karachi' : 'City',
		'Kenya' : 'Country',
		'Uganda' : 'Country',
		'Israel' : 'Country',
		'Brazil' : 'Country',
		'Yangon' : 'City',
		'United States' : 'Country',
		'U.S.' : 'Country',
		'Italy' : 'Country',
		'France' : 'Country',
		'Bangkok' : 'City',
		'Staten Island' : 'City',
		'Mosul' : 'City'
	};

	public static ENTITIES: any = {
		1: ['Antel', 'Vienna'],
		2: ['Bhutto', 'Karachi'],
		3: ['Vincent Otti', 'Uganda'],
		4: ['George W. Bush', 'United States'],
		5: ['Samak Sundaravej', 'Bangkok'],
		6: ['Samak Sundaravej', 'Bangkok'],
		7: ['Hassan', 'Iraq'],
		8: ['Michael McMahon', 'Staten Island'],
		9: ['Snowden', 'United States'],
		10: ['Paulos Faraj Rahho', 'Mosul']
	};

	public static SENTENCES: any = {
		1: "\"Mrs. Antel wishes us simply to announce that the film director gently slipped away,\" a spokesperson for the old persons\' home in Vienna where Antel was staying also said.",
		2: "All were anxious to avoid a repeat of the double suicide bombing that targeted Bhutto\'s homecoming last month in her port city stronghold of Karachi, killing 139 people.",
		3: 'An outbreak of cholera has swept a camp housing Uganda\'s rebel Lord\'s Resistance Army, infecting its leader Joseph Kony, his deputy Vincent Otti, and scores of fighters, a spokesman said Friday.',
		4: "Sarkozy heads for the United States on Saturday where he will meet his US counterpart George W. Bush at Camp David, outside Washington.",
		5: "About 13,000 protesters are currently barricaded in Bangkok\'s main government compound, demanding that Prime Minister Samak Sundaravej resign and accusing him of being a puppet of ousted premier Thaksin Shinawatra.",

		// Gold Standard
		6: "Bangkok, Thailand -- Samak Sundaravej -- the man likely to become Thailand's next prime minister -- is known for his sharp tongue and short temper.",
		7: 'Hassan, the director of CARE international in Iraq, was abducted in Baghdad in October 2004 and shown on a video pleading for her life, calling on British Prime Minister Tony Blair to withdraw troops from Iraq.',
		8: "And on Staten Island, Democrat Michael McMahon beat GOP contender Robert Straniere for a seat that became vacant after Representative Vito Fossella, who in May was charged with drunken driving and acknowledged having a child from an extramarital affair, decided not to run for reelection.",
		9: 'Mr. Snowden flew to Russia after leaving the United States.',
		10: "The body of the Chaldean Catholic archbishop of Mosul, Paulos Faraj Rahho, who was kidnapped by gunmen in Mosul in northern Iraq late last month as he drove home after afternoon Mass, was discovered Thursday in an area south of the city, church officials and the Iraqi police said.",
	};

	private static shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	public static getQuestionID(questionIndex) {
		if (!Constants.ORDER) {
			var possibleOrder = Constants.shuffle(Constants.QUESTION_IDS);
			Constants.ORDER = []
			for (var i = 0; i < Constants.FILTERING_QUESTION_IDS.length; i++) {
				Constants.ORDER.push(Constants.FILTERING_QUESTION_IDS[i]);
			}

			for (var i = 0; i < possibleOrder.length; i++) {
				if (Constants.ORDER.indexOf(possibleOrder[i]) === -1) {
					Constants.ORDER.push(possibleOrder[i]);
				}
			}
		}

		return Constants.ORDER[questionIndex];
	}

	public static getEntities(questionIndex) {
		return Constants.ENTITIES[Constants.getQuestionID(questionIndex)];
	}

	public static getSentence(questionIndex) {
		return Constants.SENTENCES[Constants.getQuestionID(questionIndex)];
	}
}

export = Constants;
