export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  accent: 'red' | 'gold' | 'cyan';
  trophy?: boolean;
}

export const TIMELINE: TimelineMilestone[] = [
  {
    year: '2008',
    title: 'The Beginning of Play Bold',
    description:
      'Royal Challengers Bangalore is born as a founding IPL franchise. The red and gold colours take the field for the first time, ushering in a new era of fearless cricket.',
    accent: 'red',
  },
  {
    year: '2009',
    title: 'IPL Finalists',
    description:
      "Under Anil Kumble's leadership, RCB charges into their first IPL final in South Africa. The bowler-heavy unit defies expectations and announces RCB as a serious contender.",
    accent: 'gold',
  },
  {
    year: '2011',
    title: 'Champion Runs & IPL Final',
    description:
      "Chris Gayle's explosive arrival powers RCB to a second IPL final. The Universe Boss smashes a record-breaking season as the home crowd at Chinnaswamy roars with every six.",
    accent: 'cyan',
  },
  {
    year: '2016',
    title: "Kohli's Legendary 973 Runs Season",
    description:
      'Virat Kohli rewrites cricket history with 973 runs in a single IPL season — four centuries and an average of 81. A record that may never be broken. RCB reach their third final.',
    accent: 'red',
  },
  {
    year: '2024',
    title: 'Royal Challengers Bengaluru WPL Champions',
    description:
      'The Royal Challengers Women lift the WPL trophy! Smriti Mandhana leads a fearless squad as RCB clinch their first-ever franchise title. Bengaluru erupts in red and gold celebrations.',
    accent: 'gold',
    trophy: true,
  },
  {
    year: '2025',
    title: 'Ee Sala Cup Namduuu!!!',
    description:
      'After 18 years of wait, the Royal Men of RCB finally bring the trophy home. Fans are elated all over the nation as this goes down in history!',
    accent: 'red',
    trophy: true,
  },
  {
    year: '2026',
    title: 'WPL Back-to-Back Champions',
    description:
      "The Royal Challengers Women lift the WPL trophy again! Smriti Mandhana's fearless squad defend their crown in dominant fashion, proving that the women in red and gold are a dynasty in the making.",
    accent: 'gold',
    trophy: true,
  },
  {
    year: '2026',
    title: 'IPL Back-to-Back Champions',
    description:
      'The Royal Men create history as the first IPL team to win the trophy twice in a row! A consecutive championship cements RCB as the undisputed kings of Indian cricket, and the Chinnaswamy erupts in a sea of red and gold.',
    accent: 'cyan',
    trophy: true,
  },
];
