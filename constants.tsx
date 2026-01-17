
import { Service } from './types';

export const SERVICES: Service[] = [
  // Permanent Makeup
  {
    id: 'pm-1',
    name: 'Tailor Made Brows',
    description: 'Bespoke permanent eyebrow enhancement tailored to your facial structure and preferences.',
    price: 300,
    duration: 60,
    category: 'Permanent Makeup',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/e4adc6eb-bf2f-4357-8096-456f49ec2b07/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.jpg?format=1500w'
  },
  {
    id: 'pm-2',
    name: 'Gloss & Glo Lips',
    description: 'Enhance your natural lip colour and shape with our signature permanent blush technique.',
    price: 290,
    duration: 60,
    category: 'Permanent Makeup',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1584522314699-VUR0EU2XMQ3X14LWIAZS/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.JPG?format=1500w'
  },
  {
    id: 'pm-3',
    name: 'Gloss & Glo Lips Colour Boost',
    description: 'Refresh and intensify your permanent lip colour for long-lasting vibrancy.',
    price: 200,
    duration: 60,
    category: 'Permanent Makeup',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1584522314830-0S59JPTK70NFI1XRZIPU/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.JPG?format=1500w'
  },
  {
    id: 'pm-4',
    name: 'Tailor Made Brows Colour Boost',
    description: 'Maintain the definition and colour of your permanent brows with a professional touch-up.',
    price: 150,
    duration: 60,
    category: 'Permanent Makeup',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/0a16c496-4528-42eb-8b09-01c48f87a514/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.jpg?format=1500w'
  },
  // Bridal Services
  {
    id: 'br-1',
    name: 'Bridal Make-up',
    description: 'Exquisite, long-lasting make-up application for your special day.',
    price: 120,
    duration: 60,
    category: 'Bridal Services',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1737379266231-CD5XLDTJO7O5W1I5CNJM/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.jpg?format=1500w'
  },
  {
    id: 'br-2',
    name: 'Bridesmaid Make-up',
    description: 'Coordinated glam for the bridal party to ensure a cohesive, beautiful look.',
    price: 70,
    duration: 60,
    category: 'Bridal Services',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1737379267205-N7ATLLFKHO54D1JJQY8P/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.jpg?format=1500w'
  },
  {
    id: 'br-3',
    name: 'Mother Of The Bride Make-up',
    description: 'Elegant and sophisticated make-up designed for the mother of the bride.',
    price: 70,
    duration: 60,
    category: 'Bridal Services',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1737379269340-YI5394249XEXL0SV8T6I/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.jpg?format=1500w'
  },
  {
    id: 'br-4',
    name: 'Trial Bridal Make-up',
    description: 'A pre-wedding session to perfect and finalise your dream bridal look.',
    price: 70,
    duration: 60,
    category: 'Bridal Services',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1763973463408-X11G8TR58MN5YGA3P7AJ/464273567_18370504519111050_1420922940435426332_n.jpg?format=1500w'
  },
  // Make Up
  {
    id: 'mu-1',
    name: 'Natural Glam Make-up Lesson',
    description: 'Learn the techniques to achieve a professional natural glam look at home.',
    price: 75,
    duration: 60,
    category: 'Make-up',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1763816885376-6V3P5JWIF8K6563HNTLN/558192852_18420138679111050_5947353239240958794_n.jpg?format=1500w'
  },
  {
    id: 'mu-2',
    name: 'Special Occasion Make-up',
    description: 'Professional make-up application for parties, events, or a night out.',
    price: 40,
    duration: 60,
    category: 'Make-up',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1763816192497-GK443CD7UDH0LL0QZZ1C/553006270_18418150360111050_5143739186265393559_n.jpg?format=1500w'
  },
  // Lash Services
  {
    id: 'la-1',
    name: 'Russian Lash Extensions',
    description: 'Handmade fans for a multi-dimensional, dramatic lash look.',
    price: 65,
    duration: 60,
    category: 'Lash Services',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1584522241255-D5K0LC7FO2CZEEG9HUFO/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.JPG?format=1500w'
  },
  {
    id: 'la-2',
    name: 'Russian Lash Extensions Infills',
    description: 'Maintain your volume and fullness with a professional lash infill.',
    price: 40,
    duration: 60,
    category: 'Lash Services',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1660661472774-7OUW634AW3T9OKJE0ISY/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.jpg?format=1500w'
  },
  {
    id: 'la-3',
    name: 'Classic Lash Extensions',
    description: 'One-to-one application for a natural, length-enhancing effect.',
    price: 45,
    duration: 60,
    category: 'Lash Services',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1718025980741-M41VEMGHNUBONC9SY74J/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.jpg?format=1500w'
  },
  {
    id: 'la-4',
    name: 'LVL Lashes',
    description: 'Length, Volume, and Lift for your natural lashes without extensions.',
    price: 49,
    duration: 60,
    category: 'Lash Services',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/87b0f806-a98f-47e1-929e-9aadaaa254c7/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.jpg?format=1500w'
  },
  {
    id: 'la-5',
    name: 'Lash Unfills',
    description: 'Safe and gentle removal of partial lash extensions.',
    price: 30,
    duration: 60,
    category: 'Lash Services',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1660661438731-856MGHTNK94IVVMLR99D/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.jpg?format=1500w'
  },
  {
    id: 'la-6',
    name: 'Russian Lash Extensions Removals',
    description: 'Professional removal process to protect the health of your natural lashes.',
    price: 20,
    duration: 60,
    category: 'Lash Services',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1660661438731-856MGHTNK94IVVMLR99D/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.jpg?format=1500w'
  },
  // Brow Services
  {
    id: 'bs-1',
    name: 'Brow Lamination',
    description: 'Straightens and sets brow hairs for a fuller, more defined look.',
    price: 30,
    duration: 60,
    category: 'Brow Services',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/87b0f806-a98f-47e1-929e-9aadaaa254c7/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.jpg?format=1500w'
  },
  {
    id: 'bs-2',
    name: 'Brow Wax & Tint',
    description: 'Precision shaping and colour enhancement for perfectly groomed brows.',
    price: 15,
    duration: 60,
    category: 'Brow Services',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1583151125826-KLRXQ3C0Q6BG9UTSMJDK/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.jpeg?format=1500w'
  },
  {
    id: 'bs-3',
    name: 'Brow Wax',
    description: 'Quick and professional eyebrow shaping with high-quality wax.',
    price: 10,
    duration: 60,
    category: 'Brow Services',
    image: 'https://images.squarespace-cdn.com/content/v1/5a5cfa119f8dce1d7c777297/1584522241255-D5K0LC7FO2CZEEG9HUFO/Krissma%2C+professional+permanent+makeup+and+bridal+artist+in+Peterborough.JPG?format=1500w'
  },
  // Tattooing
  {
    id: 't-1',
    name: 'Fine Line Tattoo',
    description: 'Delicate and precise fine line tattooing for subtle, meaningful body art.',
    price: 50,
    duration: 60,
    category: 'Tattooing',
    image: 'https://images.squarespace-cdn.com/content/5a5cfa119f8dce1d7c777297/a68ddcce-f8a5-4e62-958d-d0762da72926/FLT.png?content-type=image%2Fpng'
  }
];

export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

export const BUSINESS_HOURS = {
  start: 9,
  end: 18
};
