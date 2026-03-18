export const defaultYogaTypes = [
  {
    id: 1,
    title: "Résultats rapides et durables",
    description: "Entraînement haute intensité qui sculpte le corps et améliore la force en peu de temps.",
    image: "/img/icon/chrono.png",
    animation: "flip-left",
    duration: 500
  },
  {
    id: 2,
    title: "Travail complet du corps",
    description: "Chaque séance engage simultanément force, endurance, équilibre et mobilité : tous les muscles sont sollicités, même les plus profonds.",
    image: "/img/icon/biceps.png",
    animation: "flip-right",
    duration: 600
  },
  {
    id: 3,
    title: "Sans impact pour les articulations",
    description: "Mouvement lent et contrôlé, idéal pour protéger le dos et les genoux.",
    image: "/img/icon/shield.png",
    animation: "flip-left",
    duration: 600
  },
  {
    id: 4,
    title: "Cardio + Endurance",
    description: "Le rythme soutenu et l’absence de repos stimulent le cœur et améliorent la condition cardiovasculaire.",
    image: "/img/icon/heart.gif",
    animation: "flip-right",
    duration: 600
  },
  {
    id: 5,
    title: "Brûle des calories même après la séance",
    description: "Grâce à l’intensité, le métabolisme reste stimulé plusieurs heures après.",
    image: "/img/icon/fire.png",
    animation: "flip-left",
    duration: 600
  },
  {
    id: 6,
    title: "Adapté à tous les niveaux",
    description: "Les exercices se modulent facilement : débutants comme athlètes confirmés.",
    image: "/img/icon/filter.png",
    animation: "flip-right",
    duration: 600
  }
];

export const VideoSection = [
  {
    videoThumbnail: '/img/video.png',
    videoUrl: 'https://youtu.be/_y39T5jQfFM?si=fsKAo5scI_USGhzo', // Remplacez par votre URL vidéo
    videoTitle: 'Yoga Session Video',
    altText: 'Video thumbnail'
  }
];

export const popularClasses = [
  {
    id: 1,
    title: "FULL MOON",
    subtitle: "Focus : Full Body",
    description: "La séance signature du studio. Chaque muscle est sollicité pour une expérience complète et équilibrée. Force, endurance et contrôle s’unissent pour sculpter le corps entier, avec une intensité maîtrisée qui transforme en profondeur.",
    image: "/img/new/IMG_3631.jpeg",
    link: "/public/session-details",
    category: "Intermédiaire",
    duration: "60 min",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 142,
    price: "25€",
    tags: ["Dynamique", "Énergisant"],
    level: "Tous niveaux",
    animationDuration: 600
  },
  {
    id: 2,
    title: "MOON ABS & BOOTY",
    subtitle: "Focus : Abdos et Fessiers",
    description: "Chaque séance engage le corps entier mais met un accent particulier sur la sangle abdominale et les fessiers. Les mouvements sont précis et profonds pour tonifier, lifter et renforcer les zones clés, tout en gardant un équilibre global. ",
    image: "/img/new/PHOTO-2025-10-07-10-52-35 3.jpg",
    link: "/public/session-details",
    category: "Avancé",
    duration: "60 min",
    instructor: "David Kumar",
    rating: 4.6,
    students: 87,
    price: "30€",
    tags: ["Flexibilité", "Relaxant"],
    level: "Tous niveaux",
    animationDuration: 900
  },
  {
    id: 3,
    title: "MOON FLOW",
    subtitle: "Focus : Debutant et Stretching",
    description: "Une approche fluide et consciente du mouvement. On renforce tout le corps en douceur, avec un accent sur la posture, la mobilité et le relâchement. Idéal pour débuter, se reconnecter ou récupérer activement sans perdre en efficacité.",
    image: "/img/new/classe8.JPG",
    link: "/public/session-details",
    category: "Débutant",
    duration: "60 min",
    instructor: "Emma Wilson",
    rating: 4.7,
    students: 98,
    price: "15€",
    tags: ["Matinal", "Court"],
    level: "Débutant",
    animationDuration: 800
  },

  {
    id: 4,
    title: "UPPER MOON",
    subtitle: "Focus : Haut du corps",
    description: "Un entraînement complet du corps avec un focus particulier sur les bras, le dos et les épaules. Les transitions et le gainage sollicitent aussi les abdos et les jambes, pour un résultat harmonieux. ",
    image: "/img/new/PHOTO-2025-10-07-10-52-33 5.jpg",
    link: "/public/session-details",
    category: "Avancé",
    duration: "60 min",
    instructor: "David Kumar",
    rating: 4.6,
    students: 87,
    price: "30€",
    tags: ["Flexibilité", "Relaxant"],
    level: "Intermediare",
    animationDuration: 900
  },
  {
    id: 5,
    title: "MOON BURN",
    subtitle: "Focus : Cardio et Perte de gras",
    description: "Un entraînement total du corps avec un accent sur le rythme, la dépense énergétique et la puissance. On travaille tout : jambes, tronc, bras, avec un rythme soutenu, pour une seance qui brûle en profondeur. Ideal pour depasser ses limites et travailler son endurance cardiovasculaire. ",
    image: "/img/new/14.jpeg",
    link: "/public/session-details",
    category: "Avancé",
    duration: "60 min",
    instructor: "Mike Chen",
    rating: 4.9,
    students: 203,
    price: "20€",
    tags: ["Bases", "Débutant"],
    level: "Avancé",
    animationDuration: 700
  },
  {
    id: 6,
    title: "MOON ALIGN : HATHA YOGA",
    subtitle: "",
    description: "Un cours doux et profond pour ralentir, respirer et se recentrer.À travers des postures tenues et un travail de mobilité, vous améliorez souplesse, équilibre et posture. Idéal pour réduire le stress et compléter vos séances plus intenses.Un moment d’ancrage, phase après phase. ",
    image: "/img/yoga.jpeg",
    link: "/public/session-details",
    category: "Avancé",
    duration: "60 min",
    instructor: "Mike Chen",
    rating: 4.9,
    students: 203,
    price: "20€",
    tags: ["Bases", "Débutant"],
    level: "Tous niveaux",
    animationDuration: 700
  },
  {
    id: 7,
    title: "MOON BALANCE : PILATES MAT",
    subtitle: "",
    description: "Renforcement musculaire au sol centré sur le contrôle et l’alignement.Chaque mouvement est exécuté lentement pour activer les muscles profonds et sculpter le corps. Un travail précis, efficace et sans impact. La force dans la maîtrise.",
    image: "/img/pilates-mat.jpeg",
    link: "/public/session-details",
    category: "Avancé",
    duration: "60 min",
    instructor: "Mike Chen",
    rating: 4.9,
    students: 203,
    price: "20€",
    tags: ["Bases", "Débutant"],
    level: "Tous niveaux",
    animationDuration: 700
  },
];

export const categories = ["Tous", "Débutant", "Intermédiaire", "Avancé"];

export const sectionConfig = {
  popularClasses: {
    title: "Cours Populaires",
    subtitle: "Découvrez nos cours les plus appréciés",
    viewAllText: "Voir tous les cours",
    viewAllLink: "/classes"
  },
  yogaTypes: {
    title: "Nos Types de Yoga",
    subtitle: "Découvrez les différents styles de yoga que nous proposons",
    viewMoreText: "Voir plus",
    viewMoreLink: "/classes"
  }
};

export const instructors = [
  {
    name: "Amber Murphy",
    image: "/img/instructors/1.png",
    animation: "fade-right",
    socials: [
      { platform: "facebook", icon: "ri-facebook-fill", url: "#" },
      { platform: "twitter", icon: "ri-twitter-fill", url: "#" },
      { platform: "linkedin", icon: "ri-linkedin-box-fill", url: "#" },
    ],
  },
  {
    name: "Beatrice Carpenter",
    image: "/img/instructors/2.jpg",
    animation: "flip-left",
    socials: [
      { platform: "facebook", icon: "ri-facebook-fill", url: "#" },
      { platform: "twitter", icon: "ri-twitter-fill", url: "#" },
      { platform: "linkedin", icon: "ri-linkedin-box-fill", url: "#" },
    ],
  },
  {
    name: "Kathryn Patel",
    image: "/img/instructors/3.jpg",
    animation: "fade-left",
    socials: [
      { platform: "facebook", icon: "ri-facebook-fill", url: "#" },
      { platform: "twitter", icon: "ri-twitter-fill", url: "#" },
      { platform: "linkedin", icon: "ri-linkedin-box-fill", url: "#" },
    ],
  },
];

export const subscribe = {
  title: "Abonnez vous à notre newsletter",
  description:
    "Abonnez-vous pour ne rien manquer : actualités, astuces et contenus inspirants.",
  image: "/img/suscribee.png",
  placeholder: "Votre adresse mail",
  buttonText: "S'enregistrer",
};

export const heroHeaders = {
  about: {
    title: "About",
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "A Propos", href: "/public/a-propos", active: true },
    ],
  },
  contact: {
    title: "Contact",
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Contact", href: "/public/contact", active: true },
    ],
  },
  tarifs: {
    title: "Achat crédits",
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Achat crédits", href: "/public/tarifs", active: true },
    ],
  },
  planning: {
    title: "Planning",
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Planning", href: "/public/planning", active: true },
    ],
  },
  session_details: {
    title: "Details de Session",
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Details de Session", href: "/public/session-details", active: true },
    ],
  },
};

export const aboutYoga = {
  title: "Moon Lagre Studio",
  button: {
    label: "Contactez Nous",
    href: "/public/contact",
  },
  lead: "Découvrez une nouvelle façon de vous entraîner, où l’efficacité rencontre l’élégance. Le studio Lagree, c’est bien plus qu’une salle de sport : c’est un espace dédié à la transformation du corps et de l’esprit, dans une ambiance moderne et inspirante.",
  description:
    "Chaque séance est pensée pour réveiller tous vos muscles en profondeur, renforcer votre posture et booster votre énergie, le tout dans un cadre chic,lumineux et motivant.",
};


export const testimonials = [
  {
    description:
      "Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.",
    title: "Super Studio",
    author: "— SARA PARKER",
  },
  {
    description:
      "Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.",
    title: "Incroyable Expérience",
    author: "— JOE GUERRERO",
  },
];

export const classes = [
  { id: 1, title: "Pilates au sol (Matwork)", img: "/img/popular-classes/cours1.jpg" },
  { id: 2, title: "Pilates sur machines", img: "/img/popular-classes/cours2.jpg" },
  { id: 3, title: "Pilates doux / thérapeutique", img: "/img/popular-classes/cours3.jpg" },
  { id: 4, title: "Pilates dynamique / cardio-pilates", img: "/img/popular-classes/cours4.jpg" },
  { id: 5, title: "Pilates prénatal", img: "/img/popular-classes/cours5.jpg" },
  { id: 6, title: "Pilates postnatal", img: "/img/popular-classes/cours6.jpg" },
  { id: 7, title: "Pilates pour sportifs", img: "/img/popular-classes/cours7.jpg" },
  { id: 8, title: "Pilates Yoga (PiYo ou Yogalates)", img: "/img/popular-classes/cours8.jpg" },
  { id: 9, title: "Pilates Ball / Swiss Ball", img: "/img/popular-classes/cours9.jpg" },
];

export const faqData = {

  about: {
    image: "/img/new/6.jpeg",
    title: "FAQ - À propos de nous",
    description: "Découvrez plus d’informations sur notre entreprise.",
    questions: [
      {
        question: "Depuis quand existez-vous ?",
        answers: [
          {
            r1: "Reponse 1",
          },
          {
            r2: "Reponse 2"
          }
        ]
      },
      {
        question: "Où se trouvent vos studios ?",
        answers: [
          {
            r1: "Reponse 1",
          },
          {
            r2: "Reponse 2"
          }
        ]
      }
    ]
  },

  credits: {
    image: "/img/new/7.jpeg",
    title: "FAQ - En savoir plus sur les crédits et leurs utilités",
    description: "Quelques réponses avant de nous joindre directement.",
    questions: [
      {
        question: "Comment fonctionne le système de crédits ?",
        answers: [
          {
            r1: "Chaque crédit correspond à une séance sur Microformer. Vous achetez un pack de credits (1, 5, 10, 20…), directement en ligne sur la page achat de credits ou sur place au studio,  puis vous utilisez vos crédits pour réserver vos cours librement, selon votre planning.",
          },
        ]
      },
      {
        question: "Les crédits ont-ils une date d’expiration ?",
        answers: [
          {
            r1: "Oui. Chaque pack a une durée de validité (ex : 30, 60 ou 90 jours). La validité commence au moment de l’achat et les crédits expirés ne sont pas remboursables.",
          }
        ]
      },
      {
        question: "Comment réserver une séance avec mes crédits ? ",
        answers: [
          {
            r1: "Après avoir acheté un pack, connectez-vous à votre espace, consultez le planning, choisissez votre créneau et votre machine. Le crédit est automatiquement déduit au moment de la réservation.",
          }
        ]
      },
      {
        question: "Peut-on partager des crédits ? ",
        answers: [
          {
            r1: "Non, les crédits sont nominatifs et liés à votre compte personnel. Ils ne peuvent pas être partagés, transférés ou utilisés pour réserver la place d’une autre personne.",
          }
        ]
      },
      {
        question: "À quoi servent mes points de fidélité ?",
        answers: [
          {
            r1: "À chaque achat de credit  vous cumulez des points de fidélité. 1 credit = 100 Points de fidélité. Ces points peuvent etre échanger en credits par la suite, 6.000 points de fidélité = 1 seance offerte. Votre solde de points de fidélité est visible directement dans votre compte.",
          }
        ]
      }
    ]
  }
};

export const transactions = [
  {
    id: 1,
    type: 'Votre conmpte à été crédité',
    transactionId: '50919487',
    date: 'Le 23 Oct 18, 03:13 PM',
    amount: '+7 cr',
    isPositive: true
  },
  {
    id: 2,
    type: 'Votre conmpte à été débité',
    transactionId: '50919487',
    date: 'Le 23 Oct 18, 03:13 PM',
    amount: '-75 cr',
    isPositive: false
  },
  {
    id: 3,
    type: 'Votre conmpte à été crédité',
    transactionId: '50919487',
    date: 'Le 23 Oct 18, 03:13 PM',
    amount: '+75 cr',
    isPositive: true
  }
];

export const points = [
  {
    id: 1,
    type: 'Points crédités',
    transactionId: '50919487',
    date: 'Le 23 Oct 18, 03:13 PM',
    amount: '+7 cr',
    isPositive: true
  },
  {
    id: 2,
    type: 'Points débités',
    transactionId: '50919487',
    date: 'Le 23 Oct 18, 03:13 PM',
    amount: '-75 cr',
    isPositive: false
  },
  {
    id: 3,
    type: 'Points crédités',
    transactionId: '50919487',
    date: 'Le 23 Oct 18, 03:13 PM',
    amount: '+75 cr',
    isPositive: true
  }
];