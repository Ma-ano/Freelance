export const profile = {
  name: 'Peter Gil T. Ma-año',
  roles: ['Full-Stack Developer', 'Software Developer', 'Web & Mobile Developer'],
  location: 'Las Piñas City, Philippines',
  phone: '0961 317 6898',
  email: 'manopetergil@gmail.com',
  github: 'https://github.com/ma-ano',
  linkedin: 'https://linkedin.com/in/peter-gil-maaño-28364a2b4',
  viber: 'viber://chat?number=%2B639755569789',
  viberDisplay: '+63 975 556 9789',
} as const

export interface Project {
  name: string
  type: string
  overview: string
  role: string
  built: string[]
  features: string[]
  technicalAreas: string[]
  integrations?: string[]
  liveUrl?: string
  technologies: string[]
}

export const projects: Project[] = [
  {
    name: 'Pinay Victorious Beauty Australia',
    type: 'E-Commerce Platform — Production Client Project',
    overview:
      'A production full-stack e-commerce website and administrator dashboard for an Australian beauty business, built with Next.js, React, TypeScript, Tailwind CSS, and Firebase, with PayPal and Afterpay payments.',
    role: 'Full-Stack Developer — requirements gathering through deployment',
    built: [
      'Complete storefront with product catalog, categories, search, product details, variants, and stock availability',
      'Cart, checkout, customer accounts, and end-to-end order workflows',
      'Administrator dashboard covering products, orders, users, promotions, settings, and business statistics',
    ],
    features: [
      'Product catalog & categories',
      'Search & product details',
      'Product variants & stock availability',
      'Cart & checkout',
      'Customer accounts',
      'Order workflows',
      'Admin dashboard',
      'Product management',
      'Order management',
      'User management',
      'Promotions',
      'Settings & business statistics',
    ],
    technicalAreas: [
      'Responsive customer interface (desktop, tablet, mobile)',
      'Responsive admin interface',
      'Next.js 16 App Router & Route Handlers',
      'Firebase Firestore database design',
      'Firebase Authentication with server-side Firebase Admin verification',
      'Firebase Storage for file storage',
      'Framer Motion animations',
      'Image processing with Next.js Image & Sharp',
      'Performance monitoring with Vercel Speed Insights',
      'Structured for Vercel hosting, with Firebase rules deployed separately',
      'Client collaboration — gathering requirements, troubleshooting, iterating on feedback',
    ],
    integrations: ['PayPal', 'Afterpay', 'Nodemailer / SMTP email'],
    liveUrl: 'https://pinayvictoriousbeauty.com.au/',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Firebase'],
  },
  {
    name: 'Everbright International Academy Inc.',
    type: 'School Management System — Production Client Project',
    overview:
      'A school management system hosted on Hostinger, built with Laravel 11, PHP 8.2+, and MySQL. Server-rendered Blade pages support teachers, students, batches, subjects, grades, academic records, and day-to-day academic and financial operations.',
    role: 'Full-Stack Developer — database design through delivery',
    built: [
      'Multi-role authentication with role-based access control across administrative workflows',
      'Grade tracking with PDF export for academic records using Laravel Dompdf',
      'Database structures and application logic supporting academic and financial operations',
    ],
    features: [
      'School management',
      'Teachers, students & batches',
      'Subjects & grades',
      'Academic records',
      'Multi-role authentication',
      'Role-based access control (RBAC)',
      'Grade tracking',
      'PDF export',
      'Administrative workflows',
      'Financial operations',
    ],
    technicalAreas: [
      'Traditional Laravel MVC architecture with server-rendered Blade templates',
      'HTML, CSS, and JavaScript with Bootstrap 5.3 & Bootstrap Icons',
      'MySQL database design',
      'Application logic for academic operations',
      'Security & access control',
      'HTTP requests with Axios',
      'PDF generation with Laravel Dompdf',
      'Spreadsheet handling with PhpSpreadsheet',
      'Frontend asset builds with Vite 5 & npm',
      'Testing with PHPUnit 10.5',
      'Hostinger hosting with Apache-compatible .htaccess configuration',
    ],
    liveUrl: 'https://everbrightinternationalacademyinc.online/',
    technologies: ['Laravel 11', 'PHP 8.2+', 'Blade', 'MySQL', 'Bootstrap 5.3', 'Hostinger'],
  },
  {
    name: 'Luxury Fashion E-Commerce UI',
    type: 'Personal Frontend Project',
    overview:
      'A modern luxury fashion e-commerce frontend exploring curated product presentation and refined visual design.',
    role: 'Designer & Frontend Developer',
    built: [
      'Modern luxury aesthetic with responsive layouts',
      'Reusable component architecture',
      'Curated product presentation with smooth animations',
    ],
    features: [
      'Modern luxury aesthetic',
      'Responsive design',
      'Reusable components',
      'Product presentation',
      'Frontend architecture',
      'Smooth animations',
    ],
    technicalAreas: ['Component architecture', 'Responsive layouts', 'Motion design'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Motion.dev', 'Vite'],
  },
]

export interface SkillCategory {
  label: string
  skills: readonly string[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Next.js 16', 'React 19', 'Blade Templates', 'Vue 3', 'Tailwind CSS 4', 'Bootstrap 5.3', 'Bootstrap Icons', 'Ionic', 'Framer Motion', 'Motion.dev'],
  },
  {
    label: 'Backend',
    skills: ['Next.js App Router & Route Handlers', 'Firebase Admin', 'Firebase Authentication', 'Laravel 11', 'PHP 8.2+', 'MVC Architecture', 'Python', 'REST APIs', 'Authentication', 'Authorization', 'RBAC'],
  },
  {
    label: 'Data',
    skills: ['Firebase Firestore', 'Firebase Storage', 'Firebase Security Rules', 'MySQL', 'MongoDB', 'Database Design', 'Database Optimization'],
  },
  {
    label: 'Mobile',
    skills: ['Flutter', 'Ionic'],
  },
  {
    label: 'Integrations',
    skills: ['PayPal', 'Afterpay', 'Nodemailer / SMTP', 'Axios', 'Laravel Dompdf', 'PhpSpreadsheet', 'Next.js Image', 'Sharp', 'Vercel Speed Insights', 'REST APIs', 'Third-Party Services'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'npm', 'Vite', 'PHPUnit 10.5', 'Hostinger', 'Apache .htaccess', 'Vercel', 'Firebase', 'AI-Assisted Development Tools'],
  },
]

export const coreStrengths = [
  'Problem Solving',
  'Debugging & Root-Cause Analysis',
  'Critical Thinking',
  'System Design',
  'Requirements Gathering',
  'Client Communication',
  'Independent Work',
  'Project Planning',
  'Technical Communication',
  'Adaptability',
] as const

export const education = {
  degree: 'Bachelor of Science in Information Technology',
  school: 'Cavite State University – Imus Campus',
  graduated: 'September 29, 2025',
} as const

