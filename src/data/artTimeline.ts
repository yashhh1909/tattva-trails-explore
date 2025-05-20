
export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  artForm: string;
  category: 'Origin' | 'Revival' | 'Recognition' | 'Funding' | 'Technological Adaptation';
  impactScore: number; // 1-10 scale
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    year: '~200 BCE',
    title: 'Origin of Bharatanatyam',
    description: 'One of India\'s oldest classical dance forms, Bharatanatyam originated in Tamil Nadu temples. Its foundations were codified in Natya Shastra by Sage Bharata.',
    artForm: 'Bharatanatyam',
    category: 'Origin',
    impactScore: 9
  },
  {
    id: '2',
    year: '~12th century',
    title: 'Madhubani Painting Evolution',
    description: 'Madhubani paintings began to flourish in the Mithila region of Bihar. These were traditionally created by women on the walls of their homes using natural dyes and pigments.',
    artForm: 'Madhubani Painting',
    category: 'Origin',
    impactScore: 8
  },
  {
    id: '3',
    year: '1930s',
    title: 'Kalamkari Revival',
    description: 'The traditional art of Kalamkari (pen craft) saw a revival during India\'s swadeshi movement when local artisans were encouraged to revive indigenous crafts.',
    artForm: 'Kalamkari',
    category: 'Revival',
    impactScore: 7
  },
  {
    id: '4',
    year: '1950',
    title: 'Formation of Sangeet Natak Akademi',
    description: 'India\'s national academy for music, dance, and drama was established, providing institutional support to classical art forms.',
    artForm: 'Multiple Classical Arts',
    category: 'Funding',
    impactScore: 8
  },
  {
    id: '5',
    year: '1975',
    title: 'Discovery of Madhubani Painting by Outside World',
    description: 'After a severe drought in Bihar, the government encouraged artists to paint on paper instead of walls to provide income. This brought Madhubani to the world stage.',
    artForm: 'Madhubani Painting',
    category: 'Revival',
    impactScore: 9
  },
  {
    id: '6',
    year: '1982',
    title: 'Establishment of NIFT',
    description: 'National Institute of Fashion Technology was established, creating a bridge between traditional textile arts and contemporary fashion.',
    artForm: 'Textile Arts',
    category: 'Technological Adaptation',
    impactScore: 7
  },
  {
    id: '7',
    year: '1990',
    title: 'GI Tag Framework Development',
    description: 'India began developing its framework for Geographical Indication protection, which would later benefit many traditional art forms.',
    artForm: 'Multiple Art Forms',
    category: 'Recognition',
    impactScore: 8
  },
  {
    id: '8',
    year: '2003',
    title: 'First GI Tags for Art Forms',
    description: 'The first set of Indian handicrafts received Geographical Indication tags, protecting their unique identity and regional specificity.',
    artForm: 'Various Handicrafts',
    category: 'Recognition',
    impactScore: 9
  },
  {
    id: '9',
    year: '2010',
    title: 'Digital Documentation Initiative',
    description: 'Major initiative launched to digitally document traditional art forms, creating archives for future generations.',
    artForm: 'Multiple Art Forms',
    category: 'Technological Adaptation',
    impactScore: 7
  },
  {
    id: '10',
    year: '2015',
    title: 'Madhubani Railway Station Transformation',
    description: 'Madhubani Railway Station in Bihar was transformed with traditional Madhubani paintings, creating awareness and providing employment to local artists.',
    artForm: 'Madhubani Painting',
    category: 'Revival',
    impactScore: 8
  },
  {
    id: '11',
    year: '2018',
    title: 'Doubling of Cultural Budget',
    description: 'The government announced a significant increase in the budget allocation for art and cultural promotion.',
    artForm: 'All Art Forms',
    category: 'Funding',
    impactScore: 8
  },
  {
    id: '12',
    year: '2020',
    title: 'COVID Impact & Digital Shift',
    description: 'The pandemic forced artisans to adapt to online marketplaces, leading to wider reach but challenges in production and traditional teaching methods.',
    artForm: 'All Art Forms',
    category: 'Technological Adaptation',
    impactScore: 9
  },
  {
    id: '13',
    year: '2023',
    title: 'AI Integration in Art Preservation',
    description: 'AI technologies began to be used for digital preservation, restoration, and teaching of traditional art forms.',
    artForm: 'Multiple Art Forms',
    category: 'Technological Adaptation',
    impactScore: 7
  }
];
