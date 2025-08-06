export const mariposas = [
  {
    id: '1',
    nombre: 'Monarca',
    cientifico: 'Danaus plexippus',
    colores: ['#FFA500', '#000000'],
    descripcion:
      'Famosa por su migración masiva desde Norteamérica hasta México.',
    imagen: 'https://via.placeholder.com/60',
    // Nuevo: vida total en días
    lifespan: 30,
    // Nuevo: etapas de metamorfosis
    stages: [
      { name: 'Egg', duration: 4 },
      { name: 'Larva (Oruga)', duration: 14 },
      { name: 'Pupa (Crisálida)', duration: 10 },
      { name: 'Adulto', duration: 2 }
    ]
  },
  {
    id: '2',
    nombre: 'Longwing de Cebra',
    cientifico: 'Heliconius charithonia',
    colores: ['#FFFFFF', '#000000', '#FFD700'],
    descripcion:
      'Alas estrechas con franjas negras y blancas, vive en hábitats tropicales.',
    imagen: 'https://via.placeholder.com/60',
    lifespan: 45,
    stages: [
      { name: 'Egg', duration: 5 },
      { name: 'Larva', duration: 16 },
      { name: 'Pupa', duration: 12 },
      { name: 'Adulto', duration: 12 }
    ]
  },
  {
    id: '3',
    nombre: 'Morpho Azul',
    cientifico: 'Morpho menelaus',
    colores: ['#00AEEF', '#304FFE'],
    descripcion:
      'Brillo iridiscente azul metálico en las alas, común en selvas húmedas.',
    imagen: 'https://via.placeholder.com/60',
    lifespan: 25,
    stages: [
      { name: 'Egg', duration: 3 },
      { name: 'Larva', duration: 12 },
      { name: 'Pupa', duration: 8 },
      { name: 'Adulto', duration: 2 }
    ]
  },
  {
    id: '4',
    nombre: 'Mariposa de Cristal',
    cientifico: 'Greta oto',
    colores: ['#CCCCCC', '#000000'],
    descripcion: 'Sus alas transparentes la camuflan, evitando a depredadores.',
    imagen: 'https://via.placeholder.com/60',
    lifespan: 20,
    stages: [
      { name: 'Egg', duration: 4 },
      { name: 'Larva', duration: 10 },
      { name: 'Pupa', duration: 6 },
      { name: 'Adulto', duration: 0 }  // Las adultas pueden vivir solo unos días sin alimentarse
    ]
  },
  {
    id: '5',
    nombre: 'Colibrí Esfinge',
    cientifico: 'Macroglossum stellatarum',
    colores: ['#A0522D', '#FFD700'],
    descripcion:
      'Vuelo rápido y aleteo continuo, poliniza flores como un colibrí.',
    imagen: 'https://via.placeholder.com/60',
    lifespan: 25,
    stages: [
      { name: 'Egg', duration: 3 },
      { name: 'Larva', duration: 14 },
      { name: 'Pupa', duration: 7 },
      { name: 'Adulto', duration: 1 }
    ]
  },
  {
    id: '6',
    nombre: 'Cola de Golondrina Negra',
    cientifico: 'Papilio polyxenes',
    colores: ['#000000', '#00FF00', '#FF0000'],
    descripcion:
      'Mariposa de zonas templadas con cola característica en las alas posteriores.',
    imagen: 'https://via.placeholder.com/60',
    lifespan: 35,
    stages: [
      { name: 'Egg', duration: 5 },
      { name: 'Larva', duration: 18 },
      { name: 'Pupa', duration: 10 },
      { name: 'Adulto', duration: 2 }
    ]
  },
  {
    id: '7',
    nombre: 'Búho Nocturno',
    cientifico: 'Caligo memnon',
    colores: ['#6B4226', '#FFE4B5'],
    descripcion:
      'Ojos grandes impresos en las alas para ahuyentar a los enemigos.',
    imagen: 'https://via.placeholder.com/60',
    lifespan: 30,
    stages: [
      { name: 'Egg', duration: 6 },
      { name: 'Larva', duration: 15 },
      { name: 'Pupa', duration: 9 },
      { name: 'Adulto', duration: 0 }
    ]
  },
  {
    id: '8',
    nombre: 'Alas de Madera',
    cientifico: 'Kallima inachus',
    colores: ['#8B4513', '#DEB887'],
    descripcion: 'Simula hojas secas al cerrar las alas, perfecto camuflaje.',
    imagen: 'https://via.placeholder.com/60',
    lifespan: 28,
    stages: [
      { name: 'Egg', duration: 5 },
      { name: 'Larva', duration: 13 },
      { name: 'Pupa', duration: 8 },
      { name: 'Adulto', duration: 2 }
    ]
  },
  {
    id: '9',
    nombre: 'Rayo de Luna',
    cientifico: 'Actias luna',
    colores: ['#E0FFFF', '#4B0082'],
    descripcion:
      'Alas amplias con largas colas y colores verde pálido, nocturna.',
    imagen: 'https://via.placeholder.com/60',
    lifespan: 14,
    stages: [
      { name: 'Egg', duration: 7 },
      { name: 'Larva', duration: 20 },
      { name: 'Pupa', duration: 14 },
      { name: 'Adulto', duration: 0 }
    ]
  },
  {
    id: '10',
    nombre: 'Calipso',
    cientifico: 'Caligo eurilochus',
    colores: ['#483D8B', '#D3D3D3'],
    descripcion:
      'Ojos grandes en tono azul oscuro, vista en bosques tropicales.',
    imagen: 'https://via.placeholder.com/60',
    lifespan: 32,
    stages: [
      { name: 'Egg', duration: 5 },
      { name: 'Larva', duration: 16 },
      { name: 'Pupa', duration: 10 },
      { name: 'Adulto', duration: 1 }
    ]
  },
  {
    id: '11',
    nombre: 'Héroe Amarillo',
    cientifico: 'Papilio machaon',
    colores: ['#FFD700', '#000000'],
    descripcion:
      'Patrón brillante amarillo y negro, muy apreciada por coleccionistas.',
    imagen: 'https://via.placeholder.com/60',
    lifespan: 40,
    stages: [
      { name: 'Egg', duration: 4 },
      { name: 'Larva', duration: 17 },
      { name: 'Pupa', duration: 12 },
      { name: 'Adulto', duration: 7 }
    ]
  },
  {
    id: '12',
    nombre: 'Telares de Oro',
    cientifico: 'Argema mittrei',
    colores: ['#FFDEAD', '#CD853F'],
    descripcion:
      'Mariposa gigante de Madagascar, cola larga en alas posteriores.',
    imagen: 'https://via.placeholder.com/60',
    lifespan: 60,
    stages: [
      { name: 'Egg', duration: 6 },
      { name: 'Larva', duration: 30 },
      { name: 'Pupa', duration: 20 },
      { name: 'Adulto', duration: 4 }
    ]
  },
  {
    id: '13',
    nombre: 'Polilla Emperador',
    cientifico: 'Saturnia pyri',
    colores: ['#F4A460', '#2F4F4F'],
    descripcion: 'La polilla más grande de Europa, con ocelo en cada ala.',
    imagen: 'https://via.placeholder.com/60',
    lifespan: 10,
    stages: [
      { name: 'Egg', duration: 8 },
      { name: 'Larva', duration: 40 },
      { name: 'Pupa', duration: 20 },
      { name: 'Adulto', duration: 0 }
    ]
  },
  {
    id: '14',
    nombre: 'Frijolero',
    cientifico: 'Lycaena phlaeas',
    colores: ['#FF4500', '#8B0000'],
    descripcion:
      'Pequeña y de colores anaranjados, frecuenta jardines y praderas.',
    imagen: 'https://via.placeholder.com/60',
    lifespan: 20,
    stages: [
      { name: 'Egg', duration: 4 },
      { name: 'Larva', duration: 14 },
      { name: 'Pupa', duration: 8 },
      { name: 'Adulto', duration: 2 }
    ]
  },
  {
    id: '15',
    nombre: 'Jardinera de la Rosa',
    cientifico: 'Vanessa cardui',
    colores: ['#FF6347', '#1E90FF', '#FFD700'],
    descripcion:
      'También llamada “Ortiga Vagonera”, migratoria y muy resistente.',
    imagen: 'https://via.placeholder.com/60',
    lifespan: 50,
    stages: [
      { name: 'Egg', duration: 5 },
      { name: 'Larva', duration: 18 },
      { name: 'Pupa', duration: 12 },
      { name: 'Adulto', duration: 15 }
    ]
  }
];
