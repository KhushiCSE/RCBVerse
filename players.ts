import type { Player } from '@/types/auction';

export const PLAYERS: Player[] = [
  // ── Men's Squad ──
  { id: 'virat-kohli', name: 'Virat Kohli', role: 'BAT', nationality: 'Indian', country: 'IND', gender: 'M', basePrice: 2.0, batting: 9.5, bowling: 0.5, death: 8.5, spin: 7.5, fielding: 9.0, chemistry: 9.5 },
  { id: 'rajat-patidar', name: 'Rajat Patidar', role: 'BAT', nationality: 'Indian', country: 'IND', gender: 'M', basePrice: 1.0, batting: 8.0, bowling: 0.5, death: 7.5, spin: 7.0, fielding: 7.5, chemistry: 8.0 },
  { id: 'devdutt-padikkal', name: 'Devdutt Padikkal', role: 'BAT', nationality: 'Indian', country: 'IND', gender: 'M', basePrice: 0.75, batting: 7.5, bowling: 0.5, death: 7.0, spin: 6.5, fielding: 7.0, chemistry: 7.5 },
  { id: 'phil-salt', name: 'Phil Salt', role: 'WK', nationality: 'Overseas', country: 'ENG', gender: 'M', basePrice: 1.5, batting: 8.5, bowling: 0.5, death: 8.0, spin: 7.0, fielding: 8.5, chemistry: 7.5 },
  { id: 'jitesh-sharma', name: 'Jitesh Sharma', role: 'WK', nationality: 'Indian', country: 'IND', gender: 'M', basePrice: 0.75, batting: 7.5, bowling: 0.5, death: 7.5, spin: 6.5, fielding: 8.0, chemistry: 7.5 },
  { id: 'liam-livingstone', name: 'Liam Livingstone', role: 'AR', nationality: 'Overseas', country: 'ENG', gender: 'M', basePrice: 1.25, batting: 7.5, bowling: 6.5, death: 7.5, spin: 7.0, fielding: 8.0, chemistry: 7.0 },
  { id: 'tim-david', name: 'Tim David', role: 'BAT', nationality: 'Overseas', country: 'AUS', gender: 'M', basePrice: 0.75, batting: 7.5, bowling: 0.5, death: 8.5, spin: 6.0, fielding: 7.5, chemistry: 6.5 },
  { id: 'krunal-pandya', name: 'Krunal Pandya', role: 'AR', nationality: 'Indian', country: 'IND', gender: 'M', basePrice: 1.0, batting: 6.5, bowling: 7.0, death: 7.0, spin: 7.5, fielding: 7.5, chemistry: 8.0 },
  { id: 'bhuvneshwar-kumar', name: 'Bhuvneshwar Kumar', role: 'BOWL', nationality: 'Indian', country: 'IND', gender: 'M', basePrice: 0.75, batting: 1.0, bowling: 8.5, death: 9.0, spin: 3.0, fielding: 7.0, chemistry: 8.5 },
  { id: 'josh-hazlewood', name: 'Josh Hazlewood', role: 'BOWL', nationality: 'Overseas', country: 'AUS', gender: 'M', basePrice: 1.5, batting: 0.5, bowling: 9.0, death: 9.0, spin: 2.0, fielding: 6.5, chemistry: 8.0 },
  { id: 'yash-dayal', name: 'Yash Dayal', role: 'BOWL', nationality: 'Indian', country: 'IND', gender: 'M', basePrice: 0.5, batting: 1.0, bowling: 7.0, death: 7.5, spin: 3.0, fielding: 6.5, chemistry: 7.0 },
  { id: 'suyash-sharma', name: 'Suyash Sharma', role: 'BOWL', nationality: 'Indian', country: 'IND', gender: 'M', basePrice: 0.5, batting: 0.5, bowling: 7.5, death: 6.5, spin: 9.0, fielding: 6.5, chemistry: 7.0 },
  { id: 'ab-devilliers', name: 'AB de Villiers', role: 'WK', nationality: 'Overseas', country: 'SA', gender: 'M', basePrice: 2.0, batting: 9.5, bowling: 0.5, death: 9.5, spin: 8.0, fielding: 9.5, chemistry: 9.0 },
  { id: 'romario-shepherd', name: 'Romario Shepherd', role: 'AR', nationality: 'Overseas', country: 'WI', gender: 'M', basePrice: 0.75, batting: 7.0, bowling: 7.0, death: 8.0, spin: 5.0, fielding: 7.5, chemistry: 6.5 },
  { id: 'glenn-maxwell', name: 'Glenn Maxwell', role: 'AR', nationality: 'Overseas', country: 'AUS', gender: 'M', basePrice: 1.5, batting: 8.0, bowling: 7.0, death: 8.5, spin: 7.0, fielding: 9.0, chemistry: 8.0 },
  { id: 'mohammed-siraj', name: 'Mohammed Siraj', role: 'BOWL', nationality: 'Indian', country: 'IND', gender: 'M', basePrice: 1.0, batting: 1.0, bowling: 8.5, death: 8.0, spin: 3.0, fielding: 6.5, chemistry: 8.0 },
  { id: 'faf-du-plessis', name: 'Faf du Plessis', role: 'BAT', nationality: 'Overseas', country: 'SA', gender: 'M', basePrice: 1.25, batting: 8.5, bowling: 0.5, death: 8.0, spin: 7.0, fielding: 9.0, chemistry: 8.5 },
  { id: 'dinesh-karthik', name: 'Dinesh Karthik', role: 'WK', nationality: 'Indian', country: 'IND', gender: 'M', basePrice: 0.5, batting: 7.0, bowling: 0.5, death: 8.5, spin: 6.5, fielding: 8.5, chemistry: 8.5 },

  // ── Women's Squad ──
  { id: 'smriti-mandhana', name: 'Smriti Mandhana', role: 'BAT', nationality: 'Indian', country: 'IND', gender: 'W', basePrice: 1.5, batting: 9.0, bowling: 0.5, death: 8.0, spin: 7.0, fielding: 8.5, chemistry: 9.0 },
  { id: 'ellyse-perry', name: 'Ellyse Perry', role: 'AR', nationality: 'Overseas', country: 'AUS', gender: 'W', basePrice: 1.5, batting: 8.5, bowling: 8.0, death: 7.5, spin: 6.5, fielding: 8.5, chemistry: 9.0 },
  { id: 'richa-ghosh', name: 'Richa Ghosh', role: 'WK', nationality: 'Indian', country: 'IND', gender: 'W', basePrice: 0.75, batting: 8.0, bowling: 0.5, death: 8.5, spin: 7.0, fielding: 8.5, chemistry: 8.0 },
  { id: 'sophie-devine', name: 'Sophie Devine', role: 'AR', nationality: 'Overseas', country: 'NZ', gender: 'W', basePrice: 1.25, batting: 8.0, bowling: 7.5, death: 8.0, spin: 6.0, fielding: 8.0, chemistry: 8.0 },
  { id: 'shreyanka-patil', name: 'Shreyanka Patil', role: 'BOWL', nationality: 'Indian', country: 'IND', gender: 'W', basePrice: 0.5, batting: 3.0, bowling: 7.5, death: 7.0, spin: 8.5, fielding: 7.5, chemistry: 7.5 },
  { id: 'renuka-singh', name: 'Renuka Singh', role: 'BOWL', nationality: 'Indian', country: 'IND', gender: 'W', basePrice: 0.5, batting: 1.0, bowling: 8.0, death: 8.0, spin: 3.5, fielding: 7.0, chemistry: 7.5 },
  { id: 'asha-sobhana', name: 'Asha Sobhana', role: 'BOWL', nationality: 'Indian', country: 'IND', gender: 'W', basePrice: 0.4, batting: 1.0, bowling: 7.5, death: 6.5, spin: 9.0, fielding: 6.5, chemistry: 7.5 },
  { id: 'georgia-wareham', name: 'Georgia Wareham', role: 'BOWL', nationality: 'Overseas', country: 'AUS', gender: 'W', basePrice: 0.75, batting: 4.0, bowling: 7.5, death: 7.0, spin: 8.0, fielding: 7.5, chemistry: 7.0 },
  { id: 'dani-wyatt', name: 'Dani Wyatt-Hodge', role: 'BAT', nationality: 'Overseas', country: 'ENG', gender: 'W', basePrice: 0.75, batting: 8.0, bowling: 3.0, death: 7.5, spin: 6.0, fielding: 7.5, chemistry: 7.0 },
  { id: 'kanika-ahuja', name: 'Kanika Ahuja', role: 'AR', nationality: 'Indian', country: 'IND', gender: 'W', basePrice: 0.4, batting: 6.5, bowling: 6.0, death: 6.5, spin: 6.5, fielding: 7.0, chemistry: 7.0 },
];
