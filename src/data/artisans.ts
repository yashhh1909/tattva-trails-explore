
export interface Artisan {
  id: string;
  name: string;
  artForm: string;
  location: string;
  state: string;
  experience: number; // years
  contact: string;
  offeringsAndWorkshops: string[];
  awards?: string[];
  sustainabilityRating: number; // 1-5
  imagePath: string;
  shopLink?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

export const artisans: Artisan[] = [
  {
    id: '1',
    name: 'Rajesh Kumar Soni',
    artForm: 'Blue Pottery',
    location: 'Jaipur',
    state: 'Rajasthan',
    experience: 35,
    contact: 'rajeshsoni@example.com',
    offeringsAndWorkshops: [
      'Blue Pottery Masterclass (3-hour workshop)',
      'Traditional Design Patterns Course',
      'Customized pottery items'
    ],
    awards: ['National Crafts Award', 'State Merit Certificate'],
    sustainabilityRating: 4,
    imagePath: '/public/placeholder.svg',
    shopLink: 'https://example.com/rajeshsoni',
    socialMedia: {
      instagram: '@rajeshsonipottery',
      facebook: 'RajeshSoniCrafts'
    }
  },
  {
    id: '2',
    name: 'Lakshmi Devi',
    artForm: 'Madhubani Painting',
    location: 'Madhubani',
    state: 'Bihar',
    experience: 40,
    contact: 'lakshmidevi@example.com',
    offeringsAndWorkshops: [
      'Traditional Madhubani Techniques (5-day course)',
      'Natural Colors Workshop',
      'Custom painting commissions'
    ],
    awards: ['Padma Shri', 'National Crafts Award'],
    sustainabilityRating: 5,
    imagePath: '/public/placeholder.svg',
    socialMedia: {
      instagram: '@lakshmimadhubani',
      youtube: 'LakshmiMadhubaniArt'
    }
  },
  {
    id: '3',
    name: 'Mohammed Ismail',
    artForm: 'Bidri Work',
    location: 'Bidar',
    state: 'Karnataka',
    experience: 28,
    contact: 'ismail.bidri@example.com',
    offeringsAndWorkshops: [
      'Bidri Craft Introduction (1-day workshop)',
      'Metal Inlay Techniques',
      'Custom home decor items'
    ],
    sustainabilityRating: 4,
    imagePath: '/public/placeholder.svg',
    shopLink: 'https://example.com/ismailbidri',
    socialMedia: {
      instagram: '@ismailbidricraft'
    }
  },
  {
    id: '4',
    name: 'Sunita Prajapati',
    artForm: 'Terracotta Pottery',
    location: 'Khurja',
    state: 'Uttar Pradesh',
    experience: 22,
    contact: 'sunitaprajapati@example.com',
    offeringsAndWorkshops: [
      'Terracotta Pottery Basics (Weekend workshop)',
      'Eco-friendly Home Decor Making',
      'Pottery wheel techniques'
    ],
    sustainabilityRating: 5,
    imagePath: '/public/placeholder.svg',
    socialMedia: {
      instagram: '@sunitaterracotta',
      facebook: 'SunitaPrajapatiCrafts'
    }
  },
  {
    id: '5',
    name: 'Anand Vergese',
    artForm: 'Aranmula Kannadi (Metal Mirror)',
    location: 'Aranmula',
    state: 'Kerala',
    experience: 30,
    contact: 'anandvergese@example.com',
    offeringsAndWorkshops: [
      'Traditional Mirror Making Demonstration',
      'Metal Alloy Techniques Workshop',
      'Custom mirrors and artifacts'
    ],
    awards: ['State Crafts Excellence Award'],
    sustainabilityRating: 4,
    imagePath: '/public/placeholder.svg',
    shopLink: 'https://example.com/aranmulakannadi',
    socialMedia: {
      facebook: 'AranmulaKannadi'
    }
  },
  {
    id: '6',
    name: 'Rupali Sharma',
    artForm: 'Phulkari Embroidery',
    location: 'Patiala',
    state: 'Punjab',
    experience: 25,
    contact: 'rupalisharma@example.com',
    offeringsAndWorkshops: [
      'Traditional Phulkari Stitch (2-day workshop)',
      'Contemporary Phulkari Applications',
      'Custom embroidered garments'
    ],
    sustainabilityRating: 4,
    imagePath: '/public/placeholder.svg',
    shopLink: 'https://example.com/rupaliphulkari',
    socialMedia: {
      instagram: '@rupaliphulkari',
      facebook: 'RupaliPhulkariArt'
    }
  },
  {
    id: '7',
    name: 'Dilip Mahapatra',
    artForm: 'Pattachitra',
    location: 'Raghurajpur',
    state: 'Odisha',
    experience: 35,
    contact: 'dilipmahapatra@example.com',
    offeringsAndWorkshops: [
      'Traditional Pattachitra Painting Course (5 days)',
      'Natural Color Preparation Workshop',
      'Storytelling through Pattachitra'
    ],
    awards: ['National Merit Award', 'State Excellence Recognition'],
    sustainabilityRating: 5,
    imagePath: '/public/placeholder.svg',
    socialMedia: {
      instagram: '@dilippattachitra',
      youtube: 'DilipPatraOdishaArt'
    }
  },
  {
    id: '8',
    name: 'Jabbar Khatri',
    artForm: 'Rogan Art',
    location: 'Kutch',
    state: 'Gujarat',
    experience: 32,
    contact: 'jabbarkhatri@example.com',
    offeringsAndWorkshops: [
      'Rogan Art Introduction (1-day workshop)',
      'Traditional Design Patterns',
      'Custom textiles and wall hangings'
    ],
    awards: ['President\'s Award for Master Craftsperson'],
    sustainabilityRating: 5,
    imagePath: '/public/placeholder.svg',
    shopLink: 'https://example.com/jabbarkhatri',
    socialMedia: {
      instagram: '@jabbarroganart',
      facebook: 'KhatriRoganArt'
    }
  }
];
