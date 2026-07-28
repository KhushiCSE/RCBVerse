export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

export interface QuizTier {
  id: 'rookie' | 'superfan' | 'ultimate';
  label: string;
  emoji: string;
  description: string;
  questions: QuizQuestion[];
}

export const QUIZ_TIERS: QuizTier[] = [
  {
    id: 'rookie',
    label: 'Rookie Level',
    emoji: '🏏',
    description: 'Warm-up questions for the new fan',
    questions: [
      {
        q: 'What do the letters RCB stand for?',
        options: ['Royal Challengers Bengaluru', 'Royal Cricket Bengal', 'Red Challengers Bangalore', 'Royal City Batsmen'],
        answer: 0,
      },
      {
        q: 'Which city is RCB home to?',
        options: ['Mumbai', 'Bengaluru', 'Chennai', 'Delhi'],
        answer: 1,
      },
      {
        q: 'What are RCB\'s primary team colours?',
        options: ['Blue and Gold', 'Red and Black', 'Yellow and Purple', 'Pink and Blue'],
        answer: 1,
      },
      {
        q: 'Which stadium is RCB\'s home ground?',
        options: ['Wankhede Stadium', 'Eden Gardens', 'M. Chinnaswamy Stadium', 'Narendra Modi Stadium'],
        answer: 2,
      },
      {
        q: 'RCB is part of which cricket league?',
        options: ['BBL', 'PSL', 'IPL', 'CPL'],
        answer: 2,
      },
    ],
  },
  {
    id: 'superfan',
    label: 'Super Fan',
    emoji: '🔥',
    description: 'For the one who never misses a match',
    questions: [
      {
        q: 'Who has scored the most runs for RCB in IPL history?',
        options: ['AB de Villiers', 'Chris Gayle', 'Virat Kohli', 'Glenn Maxwell'],
        answer: 2,
      },
      {
        q: 'Which RCB player hit 175* in a single IPL innings?',
        options: ['Virat Kohli', 'Chris Gayle', 'AB de Villiers', 'Faf du Plessis'],
        answer: 1,
      },
      {
        q: 'How many runs did Kohli score in the 2016 IPL season?',
        options: ['865', '973', '731', '1052'],
        answer: 1,
      },
      {
        q: 'Who captained RCB to the 2009 IPL final?',
        options: ['Rahul Dravid', 'Anil Kumble', 'Daniel Vettori', 'Virat Kohli'],
        answer: 1,
      },
      {
        q: 'Which RCB leg-spinner took 5/5 vs Rajasthan in 2009?',
        options: ['Anil Kumble', 'Yuzvendra Chahal', 'Amit Mishra', 'Wanindu Hasaranga'],
        answer: 0,
      },
      {
        q: 'Who led Royal Challengers Bengaluru to the 2024 WPL title?',
        options: ['Ellyse Perry', 'Smriti Mandhana', 'Richa Ghosh', 'Sophie Devine'],
        answer: 1,
      },
      {
        q: 'Which overseas star is known as "Mr. 360" at RCB?',
        options: ['Chris Gayle', 'Glenn Maxwell', 'AB de Villiers', 'Faf du Plessis'],
        answer: 2,
      },
    ],
  },
  {
    id: 'ultimate',
    label: 'Ultimate 12th Man',
    emoji: '👑',
    description: 'Only the truest die-hard survives this',
    questions: [
      {
        q: 'In which year did RCB reach their first IPL final?',
        options: ['2008', '2009', '2010', '2011'],
        answer: 1,
      },
      {
        q: 'Rajat Patidar\'s famous unbeaten century came in which playoff?',
        options: ['2022 Final', '2022 Eliminator', '2023 Qualifier 1', '2021 Eliminator'],
        answer: 1,
      },
      {
        q: 'What is Ellyse Perry\'s best bowling figure in the WPL?',
        options: ['3/16', '4/12', '5/22', '6/15'],
        answer: 3,
      },
      {
        q: 'Who took the first five-wicket haul by an Indian in WPL history for RCB?',
        options: ['Shreyanka Patil', 'Asha Sobhana', 'Renuka Singh', 'Sophie Molineux'],
        answer: 1,
      },
      {
        q: 'How many centuries did Kohli score in the 2016 IPL season?',
        options: ['3', '4', '5', '2'],
        answer: 1,
      },
      {
        q: 'Chris Gayle\'s record 175* was scored against which team?',
        options: ['Mumbai Indians', 'Pune Warriors', 'Delhi Daredevils', 'Kings XI Punjab'],
        answer: 1,
      },
      {
        q: 'Which RCB all-rounder is regarded as the greatest female cricketer ever?',
        options: ['Smriti Mandhana', 'Richa Ghosh', 'Ellyse Perry', 'Sophie Devine'],
        answer: 2,
      },
      {
        q: 'Anil Kumble\'s 5/5 spell in 2009 conceded how many runs?',
        options: ['5 runs', '11 runs', '15 runs', '21 runs'],
        answer: 0,
      },
    ],
  },
];

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  condition: (score: number, total: number, tierId: string) => boolean;
}

export const BADGES: Badge[] = [
  {
    id: 'bold-believer',
    name: 'Bold Believer',
    emoji: '❤️',
    description: 'Finish a quiz with at least 50% correct',
    condition: (score, total) => total > 0 && score / total >= 0.5,
  },
  {
    id: 'chinnaswamy-master',
    name: 'Chinnaswamy Master',
    emoji: '🏟️',
    description: 'Score perfect on the Rookie tier',
    condition: (score, total, tierId) => tierId === 'rookie' && score === total,
  },
  {
    id: 'bold-believer-super',
    name: 'Bold Believer',
    emoji: '🔥',
    description: 'Score 70%+ on the Super Fan tier',
    condition: (score, total, tierId) => tierId === 'superfan' && score / total >= 0.7,
  },
  {
    id: 'ultimate-12th-man',
    name: 'Ultimate 12th Man',
    emoji: '👑',
    description: 'Score perfect on the Ultimate tier',
    condition: (score, total, tierId) => tierId === 'ultimate' && score === total,
  },
];
