
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
  keywords?: string[]; // Adding optional keywords property
  videoUrl?: string; // Adding optional video URL property
}

export const artForms: ArtForm[] = [
  {
    id: '1',
    name: 'Madhubani',
    state: 'Bihar',
    region: 'North',
    category: 'Painting',
    description: 'Madhubani painting, also known as Mithila painting, is characterized by geometric patterns, mythological motifs, and the use of natural dyes. This ancient art form has been practiced by women in the Mithila region of Bihar for centuries.',
    image: '/lovable-uploads/c0cc730f-5d75-40f7-96ae-ac0439ccff9a.png',
    popularity: 8,
    giTagged: true,
    origin: '12th century CE',
    keywords: ['Geometric', 'Mythological', 'Traditional'],
    videoUrl: 'https://www.youtube.com/shorts/xL5wyTW7nTU'
  },
  {
    id: '2',
    name: 'Bharatanatyam',
    state: 'Tamil Nadu',
    region: 'South',
    category: 'Dance',
    description: 'Bharatanatyam is one of the oldest classical dance forms of India. It originated in Tamil Nadu and has a rich history spanning over 2000 years. The dance form is known for its grace, precision, and expressiveness.',
    image: '/lovable-uploads/31ad09b4-aaf6-41c1-b1a3-d603a349674b.png',
    popularity: 9,
    giTagged: false,
    origin: 'c. 200 BCE',
    keywords: ['Classical', 'Expressive', 'Ancient'],
    videoUrl: 'https://www.youtube.com/shorts/tX4lxfe45Yg'
  },
  {
    id: '3',
    name: 'Pashmina',
    state: 'Jammu & Kashmir',
    region: 'North',
    category: 'Textile',
    description: 'Pashmina is a fine type of cashmere wool, known for its softness and warmth. The skilled artisans of Kashmir convert this wool into exquisite shawls, scarves, and other garments using traditional techniques.',
    image: '/lovable-uploads/204cda12-2bb6-430f-8349-4345f62cf4f1.png',
    popularity: 8,
    giTagged: true,
    origin: '15th century CE',
    keywords: ['Wool', 'Cashmere', 'Luxury'],
    videoUrl: 'https://www.youtube.com/shorts/Gnp1Kyk_QUg'
  },
  {
    id: '4',
    name: 'Dhokra',
    state: 'West Bengal',
    region: 'East',
    category: 'Craft',
    description: 'Dhokra is an ancient metal casting technique using the lost-wax process. The tribal artisans create intricate figurines, jewelry, and other decorative items with distinctive primitive simplicity.',
    image: '/lovable-uploads/ab2fc5d9-f703-4770-8a75-481ac5f0f754.png',
    popularity: 6,
    giTagged: true,
    origin: 'c. 4000 BCE',
    keywords: ['Metalwork', 'Tribal', 'Casting'],
    videoUrl: 'https://www.youtube.com/shorts/zZb2dXCLgc0'
  },
  {
    id: '5',
    name: 'Carnatic Music',
    state: 'Karnataka',
    region: 'South',
    category: 'Music',
    description: 'Carnatic music is a system of music commonly associated with South India. It has a rich culture of improvisation and is known for its elaborate melodic patterns and rhythmic structures.',
    image: '/lovable-uploads/6d3497e7-acec-4382-99b8-4371f6f7ae10.png',
    popularity: 7,
    giTagged: false,
    origin: '15th century CE',
    keywords: ['Melody', 'Rhythmic', 'Classical'],
    videoUrl: 'https://www.youtube.com/shorts/0BDWFvJamHY'
  },
  {
    id: '6',
    name: 'Phulkari',
    state: 'Punjab',
    region: 'North',
    category: 'Textile',
    description: 'Phulkari is an embroidery technique that creates geometric patterns using brightly colored threads on coarse cotton cloth. It literally means "flower work" and is an integral part of Punjabi cultural heritage.',
    image: '/lovable-uploads/e9b1fe7d-c0dd-41f2-bcb7-6a9a7b5c5f53.png',
    popularity: 7,
    giTagged: true,
    origin: '15th century CE',
    keywords: ['Embroidery', 'Colorful', 'Heritage'],
    videoUrl: 'https://www.youtube.com/shorts/Pg-Qdr30eXM'
  },
  {
    id: '7',
    name: 'Kathakali',
    state: 'Kerala',
    region: 'South',
    category: 'Dance',
    description: 'Kathakali is a highly stylized classical Indian dance-drama known for its elaborate costumes, makeup, and facial expressions. It portrays stories from Hindu epics and is a unique blend of dance, music, and acting.',
    image: '/lovable-uploads/6769dd67-6745-4b28-8562-d21ef74a91e9.png',
    popularity: 8,
    giTagged: false,
    origin: '17th century CE',
    keywords: ['Dramatic', 'Costume', 'Storytelling'],
    videoUrl: 'https://www.youtube.com/shorts/ywwUBWL-eTg'
  },
  {
    id: '8',
    name: 'Banarasi Silk',
    state: 'Uttar Pradesh',
    region: 'North',
    category: 'Textile',
    description: 'Banarasi silk is known for its gold and silver brocade or zari, fine silk, and opulent designs. These exquisite sarees are among the finest in India and are an essential part of Indian weddings.',
    image: '/lovable-uploads/22d02f99-cd29-4390-9567-029168766db4.png',
    popularity: 9,
    giTagged: true,
    origin: '14th century CE',
    keywords: ['Silk', 'Brocade', 'Wedding'],
    videoUrl: 'https://www.youtube.com/shorts/4oP6x3wro5I'
  },
  {
    id: '9',
    name: 'Gond Art',
    state: 'Madhya Pradesh',
    region: 'Central',
    category: 'Painting',
    description: 'Gond paintings reflect the Gond tribe\'s close connection with nature. This art form uses vibrant colors, distinctive patterns, and intricate detailing to depict flora, fauna, and daily life.',
    image: '/lovable-uploads/092f6792-9551-4dac-9a6a-84de633ef2db.png',
    popularity: 6,
    giTagged: true,
    origin: 'Ancient',
    keywords: ['Tribal', 'Nature', 'Colorful'],
    videoUrl: 'https://www.youtube.com/shorts/JBtUJR7ZwDM'
  },
  {
    id: '10',
    name: 'Odissi',
    state: 'Odisha',
    region: 'East',
    category: 'Dance',
    description: 'Odissi is one of the oldest surviving dance forms of India. Known for its fluid movements, sculpturesque poses, and intricate footwork, it represents a rich cultural heritage of Odisha.',
    image: '/lovable-uploads/1a7d5648-b9cc-4b55-873c-ca7f9c98cca3.png',
    popularity: 8,
    giTagged: false,
    origin: '2nd century BCE',
    keywords: ['Fluid', 'Sculptural', 'Classical'],
    videoUrl: 'https://www.youtube.com/shorts/rJrThf2gJto'
  },
  {
    id: '11',
    name: 'Pattachitra',
    state: 'Odisha',
    region: 'East',
    category: 'Painting',
    description: 'Pattachitra is a cloth-based scroll painting that depicts stories of Hindu deities, especially Jagannath and Vaishnava themes. This intricate art form uses natural colors and fine brushwork.',
    image: '/lovable-uploads/cf748f91-6ca3-46d0-8da2-429c030d7d5e.png',
    popularity: 7,
    giTagged: true,
    origin: '12th century CE',
    keywords: ['Scroll', 'Religious', 'Intricate'],
    videoUrl: 'https://www.youtube.com/shorts/bdDuvCHeTcY'
  },
  {
    id: '12',
    name: 'Kuchipudi',
    state: 'Andhra Pradesh',
    region: 'South',
    category: 'Dance',
    description: 'Kuchipudi combines dance, drama, and music to tell stories, primarily from Hindu mythology. It features fast rhythmic footwork, dramatic expressions, and fluid movements.',
    image: '/lovable-uploads/26c7ddba-c403-455b-82f8-fb7ce8861eea.png',
    popularity: 7,
    giTagged: false,
    origin: '17th century CE',
    keywords: ['Rhythmic', 'Storytelling', 'Dramatic'],
    videoUrl: 'https://www.youtube.com/shorts/IGRU66Za1z0'
  }
];
