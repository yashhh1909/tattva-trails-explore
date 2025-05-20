
export interface ArtForm {
  id: string;
  name: string;
  state: string;
  region: string;
  category: 'Dance' | 'Music' | 'Craft' | 'Textile' | 'Painting';
  description: string;
  image: string;
  popularity: number; // 1-10 scale
  giTagged: boolean;
  origin: string;
}

export const artForms: ArtForm[] = [
  {
    id: '1',
    name: 'Madhubani',
    state: 'Bihar',
    region: 'North',
    category: 'Painting',
    description: 'Madhubani painting, also known as Mithila painting, is characterized by geometric patterns, mythological motifs, and the use of natural dyes. This ancient art form has been practiced by women in the Mithila region of Bihar for centuries.',
    image: '/public/placeholder.svg',
    popularity: 8,
    giTagged: true,
    origin: '12th century CE'
  },
  {
    id: '2',
    name: 'Bharatanatyam',
    state: 'Tamil Nadu',
    region: 'South',
    category: 'Dance',
    description: 'Bharatanatyam is one of the oldest classical dance forms of India. It originated in Tamil Nadu and has a rich history spanning over 2000 years. The dance form is known for its grace, precision, and expressiveness.',
    image: '/public/placeholder.svg',
    popularity: 9,
    giTagged: false,
    origin: 'c. 200 BCE'
  },
  {
    id: '3',
    name: 'Pashmina',
    state: 'Jammu & Kashmir',
    region: 'North',
    category: 'Textile',
    description: 'Pashmina is a fine type of cashmere wool, known for its softness and warmth. The skilled artisans of Kashmir convert this wool into exquisite shawls, scarves, and other garments using traditional techniques.',
    image: '/public/placeholder.svg',
    popularity: 8,
    giTagged: true,
    origin: '15th century CE'
  },
  {
    id: '4',
    name: 'Dhokra',
    state: 'West Bengal',
    region: 'East',
    category: 'Craft',
    description: 'Dhokra is an ancient metal casting technique using the lost-wax process. The tribal artisans create intricate figurines, jewelry, and other decorative items with distinctive primitive simplicity.',
    image: '/public/placeholder.svg',
    popularity: 6,
    giTagged: true,
    origin: 'c. 4000 BCE'
  },
  {
    id: '5',
    name: 'Carnatic Music',
    state: 'Karnataka',
    region: 'South',
    category: 'Music',
    description: 'Carnatic music is a system of music commonly associated with South India. It has a rich culture of improvisation and is known for its elaborate melodic patterns and rhythmic structures.',
    image: '/public/placeholder.svg',
    popularity: 7,
    giTagged: false,
    origin: '15th century CE'
  },
  {
    id: '6',
    name: 'Phulkari',
    state: 'Punjab',
    region: 'North',
    category: 'Textile',
    description: 'Phulkari is an embroidery technique that creates geometric patterns using brightly colored threads on coarse cotton cloth. It literally means "flower work" and is an integral part of Punjabi cultural heritage.',
    image: '/public/placeholder.svg',
    popularity: 7,
    giTagged: true,
    origin: '15th century CE'
  },
  {
    id: '7',
    name: 'Kathakali',
    state: 'Kerala',
    region: 'South',
    category: 'Dance',
    description: 'Kathakali is a highly stylized classical Indian dance-drama known for its elaborate costumes, makeup, and facial expressions. It portrays stories from Hindu epics and is a unique blend of dance, music, and acting.',
    image: '/public/placeholder.svg',
    popularity: 8,
    giTagged: false,
    origin: '17th century CE'
  },
  {
    id: '8',
    name: 'Banarasi Silk',
    state: 'Uttar Pradesh',
    region: 'North',
    category: 'Textile',
    description: 'Banarasi silk is known for its gold and silver brocade or zari, fine silk, and opulent designs. These exquisite sarees are among the finest in India and are an essential part of Indian weddings.',
    image: '/public/placeholder.svg',
    popularity: 9,
    giTagged: true,
    origin: '14th century CE'
  },
  {
    id: '9',
    name: 'Gond Art',
    state: 'Madhya Pradesh',
    region: 'Central',
    category: 'Painting',
    description: 'Gond paintings reflect the Gond tribe\'s close connection with nature. This art form uses vibrant colors, distinctive patterns, and intricate detailing to depict flora, fauna, and daily life.',
    image: '/public/placeholder.svg',
    popularity: 6,
    giTagged: true,
    origin: 'Ancient'
  },
  {
    id: '10',
    name: 'Odissi',
    state: 'Odisha',
    region: 'East',
    category: 'Dance',
    description: 'Odissi is one of the oldest surviving dance forms of India. Known for its fluid movements, sculpturesque poses, and intricate footwork, it represents a rich cultural heritage of Odisha.',
    image: '/public/placeholder.svg',
    popularity: 8,
    giTagged: false,
    origin: '2nd century BCE'
  },
  {
    id: '11',
    name: 'Pattachitra',
    state: 'Odisha',
    region: 'East',
    category: 'Painting',
    description: 'Pattachitra is a cloth-based scroll painting that depicts stories of Hindu deities, especially Jagannath and Vaishnava themes. This intricate art form uses natural colors and fine brushwork.',
    image: '/public/placeholder.svg',
    popularity: 7,
    giTagged: true,
    origin: '12th century CE'
  },
  {
    id: '12',
    name: 'Kuchipudi',
    state: 'Andhra Pradesh',
    region: 'South',
    category: 'Dance',
    description: 'Kuchipudi combines dance, drama, and music to tell stories, primarily from Hindu mythology. It features fast rhythmic footwork, dramatic expressions, and fluid movements.',
    image: '/public/placeholder.svg',
    popularity: 7,
    giTagged: false,
    origin: '17th century CE'
  }
];
