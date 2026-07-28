export interface StandAmenity {
  icon: string;
  label: string;
  detail: string;
}

export interface Stand {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  seatView: string;
  priceRange: string;
  gateInfo: string;
  metroInfo: string;
  parking: string;
  foodStalls: string[];
  washrooms: string;
  firstAid: string;
  merchandise: string;
  vibe: string;
}

export const STANDS: Stand[] = [
  {
    id: 'executive-lounge',
    name: 'Executive Lounge & Corporate Boxes',
    shortName: 'Executive Lounge',
    tagline: 'Premium hospitality meets the best view in the house',
    description:
      "Climate-controlled luxury boxes with plush seating, gourmet catering, and an unobstructed sightline of the pitch. The ultimate VIP cricket experience at Chinnaswamy.",
    seatView:
      'https://images.pexels.com/photos/36741130/pexels-photo-36741130/free-photo-of-vibrant-night-cricket-match-in-ahmedabad-stadium.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    priceRange: '₹15,000 – ₹40,000',
    gateInfo: 'Gate 1 (VIP Entrance)',
    metroInfo: 'Cubbon Park Metro — 8 min walk',
    parking: 'Dedicated VIP parking (Lot A)',
    foodStalls: ['Gourmet Buffet (included)', 'Fine Dining Lounge', 'Premium Bar'],
    washrooms: 'Private washrooms inside each box',
    firstAid: 'Medical team stationed on Floor 3',
    merchandise: 'Exclusive VIP merchandise counter at the lounge entrance',
    vibe: 'Luxury',
  },
  {
    id: 'pavilion-terrace',
    name: 'Royal Challenge Pavilion Terrace',
    shortName: 'Pavilion Terrace',
    tagline: 'Where RCB royalty watches the game',
    description:
      "The premium members-only pavilion with covered seating, excellent elevation, and the best panoramic view of the entire ground. Home to RCB's most passionate season-ticket holders.",
    seatView:
      'https://images.pexels.com/photos/31739439/pexels-photo-31739439.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    priceRange: '₹5,000 – ₹12,000',
    gateInfo: 'Gate 2 (Members Entrance)',
    metroInfo: 'Cubbon Park Metro — 5 min walk',
    parking: 'Members parking (Lot B)',
    foodStalls: ['Donne Biryani Counter', 'Filter Coffee Stall', 'Premium Snacks Bar'],
    washrooms: 'Washrooms on every level (Floors 1–3)',
    firstAid: 'First Aid room near Gate 2 entrance',
    merchandise: 'RCB merchandise kiosk at Pavilion Ground Floor',
    vibe: 'Premium',
  },
  {
    id: 'p1-fan-zone',
    name: 'P1 Stand (Fan Zone)',
    shortName: 'P1 Fan Zone',
    tagline: 'The heartbeat of Chinnaswamy — where the noise lives',
    description:
      "The loudest, most electric stand in the stadium. P1 is where the die-hard RCB faithful create the wall of sound that echoes across the ground. Be ready to chant, dance, and lose your voice.",
    seatView:
      'https://images.pexels.com/photos/31852382/pexels-photo-31852382/free-photo-of-vibrant-cricket-stadium-packed-with-enthusiastic-fans.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    priceRange: '₹1,500 – ₹3,500',
    gateInfo: 'Gate 12',
    metroInfo: 'MG Road Metro — 10 min walk',
    parking: 'General parking (Lot D, limited)',
    foodStalls: ['Donne Biryani', 'Filter Coffee', 'Masala Fries', 'Samosa & Chai'],
    washrooms: 'Public washrooms behind Blocks P1-A through P1-D',
    firstAid: 'First Aid station at Block P1-B',
    merchandise: 'RCB fan merchandise cart near Gate 12',
    vibe: 'Electric',
  },
  {
    id: 'b-stand-grand-terrace',
    name: 'B Stand / Grand Terrace',
    shortName: 'B Stand',
    tagline: 'Classic views, classic atmosphere',
    description:
      "The iconic B Stand offers a straight-on view of the pitch with great elevation. A favorite among cricket purists who want a balanced sightline and a lively but comfortable match-day vibe.",
    seatView:
      'https://images.pexels.com/photos/6959888/pexels-photo-6959888.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    priceRange: '₹2,000 – ₹6,000',
    gateInfo: 'Gate 7',
    metroInfo: 'Cubbon Park Metro — 7 min walk',
    parking: 'General parking (Lot C)',
    foodStalls: ['Donne Biryani', 'Filter Coffee', 'Hot Dogs', 'Ice Cream Cart'],
    washrooms: 'Washrooms at Block B-1 and B-2 concourses',
    firstAid: 'First Aid post at Block B-1 concourse',
    merchandise: 'Merchandise kiosk at B Stand concourse entry',
    vibe: 'Classic',
  },
  {
    id: 'boat-club-stand',
    name: 'Boat Club Stand',
    shortName: 'Boat Club',
    tagline: "Breezy views behind the bowler's arm",
    description:
      "Located at the northern end of the stadium, the Boat Club Stand offers a unique behind-the-bowler perspective. Great for watching spin and pace bowling up close, with a relaxed open-air atmosphere.",
    seatView:
      'https://images.pexels.com/photos/31126411/pexels-photo-31126411.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    priceRange: '₹1,800 – ₹4,500',
    gateInfo: 'Gate 9',
    metroInfo: 'MG Road Metro — 12 min walk',
    parking: 'General parking (Lot E)',
    foodStalls: ['Donne Biryani', 'Filter Coffee', 'Popcorn & Snacks', 'Soft Drinks'],
    washrooms: 'Washrooms at Boat Club concourse',
    firstAid: 'First Aid station near Gate 9',
    merchandise: 'Merchandise stall at Boat Club entry gate',
    vibe: 'Relaxed',
  },
];
