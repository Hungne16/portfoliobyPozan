export type CaseStudyProject = {
  slug: 'u-life' | 'herculis' | 'beetools';
  projectName: string;
  status: 'published' | 'draft';
  index: string;
  title: string;
  positioning: string;
  summary: string;
  year?: string;
  role?: string;
  platform?: string;
  tools?: string[];
  liveUrl?: string;
  repositoryUrl?: string;
  heroImage?: string;
  heroAlt?: string;
  problem?: {
    audience: string;
    statement: string;
    opportunity: string;
  };
  evidenceLabel?: string;
  insights?: Array<{ label: string; title: string; body: string }>;
  flow?: string[];
  architecture?: Array<{ group: string; items: string[] }>;
  principles?: Array<{ word: string; body: string }>;
  visualSystem?: {
    note: string;
    colors: Array<{ name: string; value: string }>;
    components: string[];
  };
  interactions?: Array<{ name: string; body: string }>;
  delivery?: Array<{ label: string; value: string }>;
  outcome?: string;
  missingContent?: string[];
};

export const caseStudies: CaseStudyProject[] = [
  {
    slug: 'u-life',
    projectName: 'U-Life',
    status: 'published',
    index: '01',
    title: 'U-Life',
    positioning: 'UX RESEARCH · PRODUCT THINKING · UI/UX DESIGN',
    summary:
      'U-Life is a digital wellness concept designed to help university students care for their physical and mental wellbeing.',
    year: '2026',
    role: 'Product research, UI/UX design and website delivery',
    platform: 'Responsive web concept',
    tools: ['Framer', 'Prototyping', 'Responsive UI'],
    liveUrl: 'https://ulife.framer.website/',
    heroImage: '/projects/ulife.png',
    heroAlt:
      'U-Life published homepage with a teal wordmark and university wellness positioning',
    problem: {
      audience: 'University students balancing study, daily routines and personal wellbeing.',
      statement:
        'Wellness support can feel fragmented across physical health, mental health and habit-building. The concept explores a clearer, student-focused entry point.',
      opportunity:
        'Connect tracking, supportive content and healthier routines inside one calm, approachable experience.',
    },
    evidenceLabel: 'DOCUMENTED DESIGN ASSUMPTIONS — NOT USER-RESEARCH RESULTS',
    insights: [
      {
        label: 'NEED / 01',
        title: 'Make wellbeing easier to scan.',
        body: 'Physical and mental wellbeing need a shared structure without feeling clinical or overwhelming.',
      },
      {
        label: 'NEED / 02',
        title: 'Turn awareness into routine.',
        body: 'Tracking becomes more useful when it connects to repeatable habits and visible progress.',
      },
      {
        label: 'NEED / 03',
        title: 'Keep support within reach.',
        body: 'The published concept foregrounds accessible guidance, community and a direct support contact.',
      },
    ],
    flow: [
      'Discover U-Life',
      'Understand wellbeing areas',
      'Track health',
      'Build habits',
      'Access support',
    ],
    architecture: [
      { group: 'DISCOVER', items: ['Introduction', 'Features'] },
      { group: 'WELLBEING', items: ['Physical health', 'Mental health'] },
      { group: 'ROUTINE', items: ['Tracking', 'Habits', 'Progress'] },
      { group: 'SUPPORT', items: ['Community', 'Contact'] },
    ],
    visualSystem: {
      note: 'Observed from the published interface and supplied project visual.',
      colors: [
        { name: 'WELLNESS TEAL', value: '#1FA3A7' },
        { name: 'SUPPORT BLUE', value: '#678FE1' },
        { name: 'SOFT SKY', value: '#DDEFF8' },
        { name: 'HABIT LIME', value: '#DFF3A8' },
      ],
      components: [
        'Primary navigation',
        'Feature sections',
        'Wellness content blocks',
        'Support call to action',
      ],
    },
    outcome:
      'A responsive product concept and published website that brings physical wellbeing, mental wellbeing and supportive habit-building into one visual direction.',
    missingContent: [
      'Research plan, methods and source notes',
      'Persona evidence',
      'Wireframes and iteration history',
      'Prototype recording',
      'Usability findings',
      'Personal reflection',
    ],
  },
  {
    slug: 'herculis',
    projectName: 'Herculis',
    status: 'draft',
    index: '02',
    title: 'Herculis',
    positioning: 'COMPLEX PRODUCT UX · MULTI-ROLE SYSTEM · DESIGN SYSTEM',
    summary: 'Educational platform case study awaiting verified project source and assets.',
    missingContent: [
      'Project repository or live URL',
      'Confirmed user roles and permissions',
      'Confirmed feature inventory and user flows',
      'Technology stack',
      'Product screenshots and responsive designs',
      'Design-system foundations and components',
      'Role/feature matrix',
      'Personal reflection',
    ],
  },
  {
    slug: 'beetools',
    projectName: 'BeeTools',
    status: 'published',
    index: '03',
    title: 'BeeTools',
    positioning: 'UI DESIGN · INTERACTION DESIGN · CREATIVE FRONTEND',
    summary:
      'A shipped discovery product for finding, filtering, comparing and saving AI tools and digital utilities.',
    year: '2026',
    role: 'Product design and frontend development',
    platform: 'Responsive web application',
    tools: ['React', 'Vite', 'Firebase', 'Framer Motion', 'Vercel'],
    liveUrl: 'https://beetls.vercel.app/',
    repositoryUrl: 'https://github.com/Hungne16/quanlitool',
    heroImage: '/projects/beetls.png',
    heroAlt:
      'BeeTools application showing dark navigation, discovery categories and a prominent search interface',
    problem: {
      audience: 'People looking for useful AI tools and digital utilities for everyday work.',
      statement:
        'Large tool collections become difficult to navigate when search, categories and decision criteria are disconnected.',
      opportunity:
        'Create a focused discovery interface that helps people narrow choices, compare options and keep useful tools close.',
    },
    principles: [
      {
        word: 'FAST',
        body: 'Search and filtering reduce the distance between a need and a relevant tool.',
      },
      {
        word: 'FOCUSED',
        body: 'Category, tag and pricing controls keep discovery structured.',
      },
      {
        word: 'CLEAR',
        body: 'Reusable tool cards expose consistent information and actions.',
      },
      {
        word: 'USEFUL',
        body: 'Favorites and comparison support decisions beyond the first visit.',
      },
    ],
    flow: [
      'Enter discovery',
      'Search or browse',
      'Filter choices',
      'Compare or save',
      'Open a tool',
    ],
    visualSystem: {
      note: 'Mapped from the shipped interface and reusable frontend patterns.',
      colors: [
        { name: 'CANVAS', value: '#050506' },
        { name: 'SURFACE', value: '#101014' },
        { name: 'BRAND YELLOW', value: '#F9C62E' },
        { name: 'ACTION VIOLET', value: '#6156F5' },
      ],
      components: [
        'Tool card',
        'Search field',
        'Category navigation',
        'Tag and pricing filters',
        'Comparison tray',
        'Authentication modal',
        'AI assistant',
        'Admin data views',
      ],
    },
    interactions: [
      {
        name: 'SEARCH + FILTER',
        body: 'Search query, category, tags and pricing combine to narrow the same collection.',
      },
      {
        name: 'FAVORITES',
        body: 'Signed-in users can save tools and return to a focused collection.',
      },
      {
        name: 'COMPARE',
        body: 'A persistent comparison tray supports evaluating selected tools side by side.',
      },
      {
        name: 'ASYNC STATES',
        body: 'Authentication and AI assistance expose loading, disabled and error feedback.',
      },
    ],
    delivery: [
      { label: 'DESIGN', value: 'Discovery hierarchy and interaction states' },
      { label: 'COMPONENTS', value: 'Reusable cards, filters, modals and navigation' },
      { label: 'FRONTEND', value: 'React + Vite + Framer Motion' },
      { label: 'DATA', value: 'Firebase-backed content and user state' },
      { label: 'SHIP', value: 'Production deployment on Vercel' },
    ],
    outcome:
      'A deployed responsive application with structured discovery, compound filtering, favorites, comparison and administrative content management.',
    missingContent: [
      'Early UI explorations and rejected directions',
      'Interaction recordings or GIFs',
      'Responsive screen set beyond the supplied overview image',
      'Accessibility audit notes',
      'Personal reflection',
    ],
  },
];

export const publishedCaseStudies = caseStudies.filter(
  (project) => project.status === 'published',
);

export function getCaseStudy(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}

export function getPublishedCaseStudyForProject(projectName: string) {
  return publishedCaseStudies.find((project) => project.projectName === projectName);
}

export function getNextPublishedCaseStudy(slug: string) {
  const index = publishedCaseStudies.findIndex((project) => project.slug === slug);
  if (index < 0) return publishedCaseStudies[0];
  return publishedCaseStudies[(index + 1) % publishedCaseStudies.length];
}
