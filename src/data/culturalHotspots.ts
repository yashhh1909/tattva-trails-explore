
export interface CulturalHotspot {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  description: string;
  popularityRating: number; // 1-10
  artForms: string[];
  festivals: Festival[];
  bestTimeToVisit: string[];
  isUnderVisited: boolean;
}

export interface Festival {
  name: string;
  month: string;
  description: string;
}

export const culturalHotspots: CulturalHotspot[] = [
  {
    id: '1',
    name: 'Jaipur',
    state: 'Rajasthan',
    lat: 26.9124,
    lng: 75.7873,
    description: 'Known as the Pink City, Jaipur is home to numerous artisans who practice traditional Rajasthani art forms including block printing, blue pottery, and miniature painting.',
    popularityRating: 9,
    artForms: ['Blue Pottery', 'Block Printing', 'Miniature Painting'],
    festivals: [
      {
        name: 'Jaipur Literature Festival',
        month: 'January',
        description: 'World\'s largest free literary festival bringing together writers, speakers, thinkers, and artists.'
      },
      {
        name: 'Teej Festival',
        month: 'July/August',
        description: 'Celebration of the onset of monsoon with processions, swings, and traditional songs.'
      }
    ],
    bestTimeToVisit: ['October', 'November', 'February', 'March'],
    isUnderVisited: false
  },
  {
    id: '2',
    name: 'Mysuru',
    state: 'Karnataka',
    lat: 12.2958,
    lng: 76.6394,
    description: 'Mysuru is renowned for its Mysore style of painting, sandalwood carving, and the traditional Mysore Pak sweet. The city hosts the famous Dasara festival.',
    popularityRating: 8,
    artForms: ['Mysore Painting', 'Sandalwood Carving', 'Mysore Silk'],
    festivals: [
      {
        name: 'Mysuru Dasara',
        month: 'September/October',
        description: 'Royal festival featuring processions, cultural shows, and a decorated elephant parade.'
      }
    ],
    bestTimeToVisit: ['September', 'October', 'November', 'December'],
    isUnderVisited: false
  },
  {
    id: '3',
    name: 'Kutch',
    state: 'Gujarat',
    lat: 23.7337,
    lng: 69.8597,
    description: 'The Kutch region is famous for its vibrant embroidery, mirror work, and rogan art. The vast white salt desert transforms during the Rann Utsav festival.',
    popularityRating: 7,
    artForms: ['Kutch Embroidery', 'Rogan Art', 'Ajrakh Printing'],
    festivals: [
      {
        name: 'Rann Utsav',
        month: 'November-February',
        description: 'Festival celebrating the culture and heritage of Kutch with music, dance, and crafts.'
      }
    ],
    bestTimeToVisit: ['November', 'December', 'January', 'February'],
    isUnderVisited: false
  },
  {
    id: '4',
    name: 'Raghurajpur',
    state: 'Odisha',
    lat: 19.8876,
    lng: 85.5521,
    description: 'A heritage crafts village where nearly every household is involved in creating Pattachitra paintings, palm leaf engravings, or stone carvings.',
    popularityRating: 5,
    artForms: ['Pattachitra', 'Palm Leaf Engraving', 'Stone Carving'],
    festivals: [
      {
        name: 'Craft Festival',
        month: 'January',
        description: 'Annual festival showcasing the traditional crafts of the village.'
      }
    ],
    bestTimeToVisit: ['October', 'November', 'December', 'January'],
    isUnderVisited: true
  },
  {
    id: '5',
    name: 'Thanjavur',
    state: 'Tamil Nadu',
    lat: 10.7870,
    lng: 79.1378,
    description: 'Thanjavur is known for bronze sculpture making, the unique Thanjavur painting style with gold foil overlay, and classical Carnatic music.',
    popularityRating: 6,
    artForms: ['Thanjavur Painting', 'Bronze Sculpture', 'Carnatic Music'],
    festivals: [
      {
        name: 'Thyagaraja Aradhana',
        month: 'January/February',
        description: 'Music festival honoring the Carnatic music composer Saint Thyagaraja.'
      }
    ],
    bestTimeToVisit: ['November', 'December', 'January', 'February'],
    isUnderVisited: true
  },
  {
    id: '6',
    name: 'Banaras (Varanasi)',
    state: 'Uttar Pradesh',
    lat: 25.3176,
    lng: 82.9739,
    description: 'A spiritual and cultural hub, Varanasi is famous for its Banarasi silk weaving, classical music traditions, and traditional dance forms.',
    popularityRating: 9,
    artForms: ['Banarasi Silk Weaving', 'Hindustani Classical Music', 'Kathak Dance'],
    festivals: [
      {
        name: 'Dev Deepawali',
        month: 'November',
        description: 'Festival of lights celebrating the return of Lord Shiva to Kashi/Varanasi.'
      },
      {
        name: 'Ganga Mahotsav',
        month: 'November',
        description: 'Cultural festival showcasing the art, craft, and music of the region.'
      }
    ],
    bestTimeToVisit: ['October', 'November', 'February', 'March'],
    isUnderVisited: false
  },
  {
    id: '7',
    name: 'Shillong',
    state: 'Meghalaya',
    lat: 25.5788,
    lng: 91.8933,
    description: 'Known as the "Scotland of the East," Shillong has a rich tradition of folk music, bamboo crafts, and weaving traditions of the Khasi tribe.',
    popularityRating: 6,
    artForms: ['Khasi Weaving', 'Bamboo Craft', 'Folk Music'],
    festivals: [
      {
        name: 'Autumn Festival',
        month: 'October/November',
        description: 'Celebration of the rich cultural heritage of Meghalaya with music, dance, and food.'
      }
    ],
    bestTimeToVisit: ['September', 'October', 'April', 'May'],
    isUnderVisited: true
  },
  {
    id: '8',
    name: 'Pushkar',
    state: 'Rajasthan',
    lat: 26.4895,
    lng: 74.5503,
    description: 'This holy town is known for its annual camel fair, traditional Rajasthani tie-dye textiles, and spiritual atmosphere around the sacred lake.',
    popularityRating: 7,
    artForms: ['Tie-Dye Textiles', 'Camel Bone Craft', 'Folk Music'],
    festivals: [
      {
        name: 'Pushkar Camel Fair',
        month: 'November',
        description: 'One of India\'s most highly-rated travel experiences - a spectacle of camels, horses, folk music, and crafts.'
      }
    ],
    bestTimeToVisit: ['October', 'November', 'February', 'March'],
    isUnderVisited: false
  },
  {
    id: '9',
    name: 'Cheriyal',
    state: 'Telangana',
    lat: 18.4414,
    lng: 79.5535,
    description: 'A small village known for the distinctive Cheriyal scroll painting tradition that narrates mythological stories through vibrant visuals.',
    popularityRating: 4,
    artForms: ['Cheriyal Scroll Painting', 'Wooden Dolls', 'Mask Making'],
    festivals: [
      {
        name: 'Local Craft Fair',
        month: 'January',
        description: 'Annual exhibition of local crafts and art forms.'
      }
    ],
    bestTimeToVisit: ['October', 'November', 'December', 'January'],
    isUnderVisited: true
  },
  {
    id: '10',
    name: 'Moradabad',
    state: 'Uttar Pradesh',
    lat: 28.8398,
    lng: 78.7717,
    description: 'Known as the "Brass City," Moradabad is famous for its brass handicrafts and metal engraving work that dates back several centuries.',
    popularityRating: 5,
    artForms: ['Brass Work', 'Metal Engraving', 'Electroplating'],
    festivals: [
      {
        name: 'Craft Exhibition',
        month: 'October',
        description: 'Annual showcase of brass crafts and metalwork.'
      }
    ],
    bestTimeToVisit: ['October', 'November', 'February', 'March'],
    isUnderVisited: true
  }
];
