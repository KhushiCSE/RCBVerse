export interface LegendStats {
  matches: string;
  runs?: string;
  highest?: string;
  wickets?: string;
  best?: string;
  average?: string;
  strikeRate?: string;
  economy?: string;
}

export interface LegendInning {
  label: string;
  detail: string;
}

export interface Legend {
  id: string;
  name: string;
  role: string;
  image?: string;
  category: 'men' | 'women';
  initials: string;
  accent: 'red' | 'gold' | 'cyan';
  tagline: string;
  bio: string;
  stats: LegendStats;
  bestInnings: LegendInning[];
  iconicMoment: string;
  years: string;
}

export const LEGENDS: Legend[] = [
  // ── Men's Stars ──
  {
    id: 'virat-kohli',
    name: 'Virat Kohli',
    role: 'Right-hand Batter',
    category: 'men',
    initials: 'VK',
    image: 'https://pngfre.com/wp-content/uploads/virat-kohli-58-1633x2048.png',
    accent: 'red',
    tagline: 'The Run Machine',
    bio: "RCB's soul and most loyal son. The only player to represent a single IPL franchise for 18 seasons. Captained the side with relentless intensity and rewrote batting records.",
    stats: { matches: '252', runs: '8,004', highest: '113', average: '38.7', strikeRate: '131.9' },
    bestInnings: [
      { label: '113 vs Punjab, 2016', detail: 'Century in a chase — pure artistry under pressure at the Chinnaswamy.' },
      { label: '109 vs Gujarat, 2016', detail: "A captain's ton that carried RCB into the playoffs." },
    ],
    iconicMoment: '973 runs in IPL 2016 — the greatest single-season tally in league history, with four centuries.',
    years: '2008 – Present',
  },
  {
    id: 'ab-devilliers',
    name: 'AB de Villiers',
    role: 'Wicketkeeper-Batter',
    category: 'men',
    initials: 'AB',
    image: 'https://wallpaperaccess.com/full/5015378.jpg',
    accent: 'cyan',
    tagline: 'Mr. 360',
    bio: 'The most loved overseas player in RCB history. AB redefined finishing with his 360-degree shot-making and Superman fielding. A crowd favourite who made the impossible look routine.',
    stats: { matches: '157', runs: '4,491', highest: '133*', average: '41.2', strikeRate: '158.6' },
    bestInnings: [
      { label: '133* vs Mumbai, 2015', detail: 'Demolished the Mumbai attack in a 59-ball masterclass.' },
      { label: '129* vs Gujarat, 2016', detail: 'A brutal partnership with Kohli — 229 runs in 14 overs.' },
    ],
    iconicMoment: 'The 2015 innings vs Mumbai where he hit a 360-degree barrage of boundaries, bringing the Chinnaswamy to its feet.',
    years: '2011 – 2021',
  },
  {
    id: 'chris-gayle',
    name: 'Chris Gayle',
    role: 'Opening Batter',
    category: 'men',
    initials: 'CG',
    image: 'https://www.financialexpress.com/wp-content/uploads/2017/05/Gayle-BCCI_L.jpg',
    accent: 'gold',
    tagline: 'The Universe Boss',
    bio: 'When Gayle strode out, the crowd held its breath. The tallest six-hitter in IPL history and the man who turned RCB into a boundary-hitting spectacle. Records tumbled in his wake.',
    stats: { matches: '91', runs: '3,420', highest: '175*', average: '43.3', strikeRate: '154.4' },
    bestInnings: [
      { label: '175* vs Pune, 2013', detail: 'The highest individual score in IPL history — 17 sixes in one innings.' },
      { label: '117 vs Punjab, 2011', detail: 'A statement century that announced the Gayle era at RCB.' },
    ],
    iconicMoment: '175 not out vs Pune Warriors in 2013 — a record that still stands as the highest IPL score ever.',
    years: '2011 – 2017',
  },
  {
    id: 'devdutt-padikkal',
    name: 'Devdutt Padikkal',
    role: 'Top-order Batter',
    category: 'men',
    initials: 'DDP',
    image: 'https://documents.iplt20.com/ipl/IPLHeadshot2025/200.png',
    accent: 'cyan',
    tagline: 'The Elegant Left-hander',
    bio: 'A silky left-handed opener who announced himself with the Emerging Player of the Tournament award. His timing and grace at the top of the order gave RCB flying starts.',
    stats: { matches: '57', runs: '1,524', highest: '101', average: '27.7', strikeRate: '131.5' },
    bestInnings: [
      { label: '101 vs Rajasthan, 2021', detail: 'A maiden IPL century — an unbeaten knock finishing the chase in style.' },
    ],
    iconicMoment: 'Becoming only the third uncapped player to score an IPL century for RCB in 2021.',
    years: '2020 – 2021',
  },
  {
    id: 'rajat-patidar',
    name: 'Rajat Patidar',
    role: 'Middle-order Batter',
    category: 'men',
    initials: 'RP',
    image: 'https://documents.iplt20.com/ipl/IPLHeadshot2025/597.png',
    accent: 'red',
    tagline: 'The Eliminator Hero',
    bio: "A composed, big-match player who rose from relative obscurity to deliver one of the greatest IPL playoff knocks. Patidar became RCB's reliable middle-order anchor.",
    stats: { matches: '27', runs: '769', highest: '112*', average: '31.9', strikeRate: '141.9' },
    bestInnings: [
      { label: '112* vs Lucknow, 2022 Eliminator', detail: 'An iconic unbeaten century in a playoff — only uncapped player to do so.' },
    ],
    iconicMoment: 'The 2022 Eliminator century that carried RCB into Qualifier 2 — a knock etched in franchise folklore.',
    years: '2022 – Present',
  },
  {
    id: 'anil-kumble',
    name: 'Anil Kumble',
    role: 'Leg Spinner',
    category: 'men',
    initials: 'AK',
    image: 'https://static.toiimg.com/photo/7218053.cms?imgsize=24610',
    accent: 'gold',
    tagline: 'The Warrior Leader',
    bio: "India's greatest match-winner brought his fierce competitiveness to RCB. Led the side to the 2009 final with a disciplined bowling unit and led by sheer example.",
    stats: { matches: '42', wickets: '45', best: '5/5', average: '24.1', economy: '6.6' },
    bestInnings: [
      { label: '5/5 vs Rajasthan, 2009', detail: "A legendary five-wicket haul for just five runs — one of IPL's greatest spells." },
    ],
    iconicMoment: 'Captaining RCB to the 2009 IPL final and delivering the 5/5 spell that defined his leadership.',
    years: '2008 – 2010',
  },
  {
    id: 'rahul-dravid',
    name: 'Rahul Dravid',
    role: 'Top-order Batter',
    category: 'men',
    initials: 'RD',
    image: 'https://i0.wp.com/brokencricketdreams.com/wp-content/uploads/2020/09/Rahul_dravid_Bangalore_Royal_Challengers_cropped.jpg?ssl=1',
    accent: 'cyan',
    tagline: 'The Wall',
    bio: "The epitome of class and resilience. Dravid anchored RCB's early years with his trademark technique and calm temperament, lending the franchise instant credibility.",
    stats: { matches: '14', runs: '217', highest: '66', average: '21.7', strikeRate: '112.0' },
    bestInnings: [
      { label: '66 vs Mumbai, 2008', detail: 'A measured, classy knock that anchored a tricky chase.' },
    ],
    iconicMoment: 'Lending his legendary stature to RCB in the inaugural season — the Wall in red and gold.',
    years: '2008 – 2010',
  },

  // ── Women's Stars ──
  {
    id: 'smriti-mandhana',
    name: 'Smriti Mandhana',
    role: 'Opening Batter',
    category: 'women',
    initials: 'SM',
    image: 'https://www.royalchallengers.com/PRRCB01/public/2025-02/smriti%20mandhana%20(1).png',
    accent: 'red',
    tagline: 'The Captain Elegant',
    bio: "RCB's WPL captain and India's batting superstar. A graceful left-hander who combines elegance with explosive power. Led Royal Challengers Bengaluru to their first WPL title.",
    stats: { matches: '25', runs: '857', highest: '74', average: '38.9', strikeRate: '131.0' },
    bestInnings: [
      { label: '74 vs Delhi, 2024 WPL', detail: "A captain's innings to set up a crucial win on the title run." },
    ],
    iconicMoment: "Lifting the 2024 WPL trophy as captain — RCB's first-ever franchise championship.",
    years: '2023 – Present',
  },
  {
    id: 'ellyse-perry',
    name: 'Ellyse Perry',
    role: 'All-rounder',
    category: 'women',
    initials: 'EP',
    image: 'https://femalecricket.com/wp-content/uploads/2024/02/Ellyse-Perry-RCB.jpg',
    accent: 'gold',
    tagline: 'The Complete Cricketer',
    bio: 'Arguably the greatest female cricketer of all time. Perry brings world-class batting, genuine pace bowling, and unmatched cricket IQ to RCB. A match-winner in every discipline.',
    stats: { matches: '24', runs: '598', highest: '76', wickets: '15', best: '3/16', average: '42.7', economy: '6.5' },
    bestInnings: [
      { label: '6 Wickets vs Mumbai, 2024', detail: 'A jaw-dropping spell of 6/15 — dismantling the defending champions.' },
    ],
    iconicMoment: "The 6/15 spell vs Mumbai in WPL 2024 — one of the greatest bowling figures in women's T20 history.",
    years: '2023 – Present',
  },
  {
    id: 'shreyanka-patil',
    name: 'Shreyanka Patil',
    role: 'Off-spinner',
    category: 'women',
    initials: 'SP',
    image: 'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2024/03/18/2629168-1200900-75.jpg',
    accent: 'cyan',
    tagline: 'The Wrecker-in-Chief',
    bio: "A fearless young spinner who burst onto the WPL scene. Shreyanka's wicket-taking ability in the middle overs made her an RCB fan favourite and a key title-winner.",
    stats: { matches: '15', wickets: '13', best: '4/12', average: '20.8', economy: '7.4' },
    bestInnings: [
      { label: '4/12 vs Delhi, 2024 WPL Final', detail: 'A match-winning spell in the title-clinching final.' },
    ],
    iconicMoment: 'Taking 4/12 in the 2024 WPL Final — securing the championship and the Emerging Player award.',
    years: '2023 – Present',
  },
  {
    id: 'asha-sobhana',
    name: 'Asha Sobhana',
    role: 'Leg Spinner',
    category: 'women',
    initials: 'AS',
    image: 'https://img.etimg.com/thumb/msid-108564666,width-640,height-480,resizemode-75,imgsize-39932/asha-sobhana-rcb.jpg',
    accent: 'red',
    tagline: 'The Mystery Spinner',
    bio: "A late-blooming leg spinner whose variations bamboozled the best batters in the WPL. Asha became RCB's secret weapon with her guile and control.",
    stats: { matches: '11', wickets: '11', best: '5/22', average: '19.5', economy: '7.1' },
    bestInnings: [
      { label: '5/22 vs UP, 2024 WPL', detail: 'A sensational five-wicket haul — the first by an Indian in WPL.' },
    ],
    iconicMoment: 'The 5/22 vs UP Warriorz — a historic five-fer that announced her on the big stage.',
    years: '2024 – Present',
  },
  {
    id: 'richa-ghosh',
    name: 'Richa Ghosh',
    role: 'Wicketkeeper-Batter',
    category: 'women',
    initials: 'RG',
    image: 'https://femalecricket.com/wp-content/uploads/2024/02/Richa-Ghosh-WPL-2024-RCB.jpg',
    accent: 'gold',
    tagline: 'The Finisher',
    bio: 'A dynamic young wicketkeeper-batter with explosive finishing power. Richa can clear the ropes at will and has pulled off improbable chases for RCB.',
    stats: { matches: '21', runs: '381', highest: '62*', average: '31.7', strikeRate: '143.2' },
    bestInnings: [
      { label: '62* vs Gujarat, 2024', detail: 'A blazing unbeaten finish to clinch a last-over thriller.' },
    ],
    iconicMoment: 'Last-over heroics in WPL 2024 — finishing games with ice-cool composure under pressure.',
    years: '2023 – Present',
  },
];
