export const systemNavigation = [
  {
    label: 'Start here',
    items: [
      {
        id: 'overview',
        label: 'Overview',
        keywords: 'mission introduction system',
      },
      {
        id: 'principles',
        label: 'Principles',
        keywords: 'values decisions craft clarity',
      },
      {
        id: 'architecture',
        label: 'Architecture',
        keywords: 'foundations components patterns experiences',
      },
    ],
  },
  {
    label: 'Foundations',
    items: [
      {
        id: 'color',
        label: 'Color',
        keywords: 'palette tokens contrast lime black gray',
      },
      {
        id: 'typography',
        label: 'Typography',
        keywords: 'manrope mono type scale headings',
      },
      {
        id: 'layout',
        label: 'Layout',
        keywords: 'grid spacing responsive columns gutter',
      },
      {
        id: 'shape',
        label: 'Shape & depth',
        keywords: 'radius border elevation surface',
      },
      {
        id: 'motion',
        label: 'Motion',
        keywords: 'animation duration easing reduced motion',
      },
      {
        id: 'accessibility',
        label: 'Accessibility',
        keywords: 'keyboard focus contrast touch target',
      },
      {
        id: 'iconography',
        label: 'Iconography',
        keywords: 'icons lucide stroke size label decorative',
      },
    ],
  },
  {
    label: 'Components',
    items: [
      {
        id: 'button',
        label: 'Button',
        keywords: 'action primary secondary states',
      },
      { id: 'tag', label: 'Tag', keywords: 'metadata category status' },
      { id: 'links', label: 'Links', keywords: 'navigation meta external' },
      {
        id: 'project-card',
        label: 'Project card',
        keywords: 'work image role case study',
      },
      {
        id: 'dialog',
        label: 'Dialog',
        keywords: 'modal case study escape focus',
      },
      {
        id: 'forms',
        label: 'Form controls',
        keywords: 'input field label error disabled focus validation',
      },
      {
        id: 'feedback',
        label: 'Feedback',
        keywords: 'status alert success warning error loading empty',
      },
    ],
  },
  {
    label: 'Patterns',
    items: [
      {
        id: 'storytelling',
        label: 'Scroll storytelling',
        keywords: 'narrative gsap chapters cinematic',
      },
      {
        id: 'case-study',
        label: 'Case study',
        keywords: 'problem role process outcome',
      },
      {
        id: 'localization',
        label: 'Localization',
        keywords: 'english vietnamese language translation',
      },
      {
        id: 'responsive',
        label: 'Responsive behavior',
        keywords: 'mobile tablet desktop',
      },
    ],
  },
  {
    label: 'Content',
    items: [
      {
        id: 'voice',
        label: 'Voice & tone',
        keywords: 'writing concise technical human',
      },
      {
        id: 'microcopy',
        label: 'Interface copy',
        keywords: 'labels calls to action metadata',
      },
    ],
  },
  {
    label: 'Resources',
    items: [
      {
        id: 'resources',
        label: 'Downloads',
        keywords: 'download tokens css json starter files assets',
      },
      {
        id: 'templates',
        label: 'Templates',
        keywords: 'case study component spec accessibility checklist markdown',
      },
    ],
  },
  {
    label: 'Contribute',
    items: [
      {
        id: 'governance',
        label: 'Governance',
        keywords: 'status lifecycle contribution version',
      },
      {
        id: 'release-checklist',
        label: 'Release checklist',
        keywords: 'quality testing review ship',
      },
    ],
  },
] as const;

export const colorTokens = [
  {
    name: 'ink',
    css: '--pozan-black',
    hex: '#0B0B0D',
    role: 'Page background',
    text: 'light',
  },
  {
    name: 'surface',
    css: '--pozan-surface',
    hex: '#111114',
    role: 'Raised regions',
    text: 'light',
  },
  {
    name: 'surface-2',
    css: '--pozan-surface-2',
    hex: '#18181C',
    role: 'Interactive hover',
    text: 'light',
  },
  {
    name: 'text',
    css: '--pozan-white',
    hex: '#FAFAFA',
    role: 'Primary content',
    text: 'dark',
  },
  {
    name: 'text-muted',
    css: '--pozan-gray-300',
    hex: '#B8B8BF',
    role: 'Supporting content',
    text: 'dark',
  },
  {
    name: 'border',
    css: '--pozan-gray-700',
    hex: '#34343A',
    role: 'Structure',
    text: 'light',
  },
  {
    name: 'signal',
    css: '--pozan-lime',
    hex: '#C7FF3D',
    role: 'Primary action',
    text: 'dark',
  },
  {
    name: 'info',
    css: '--pozan-blue',
    hex: '#5B7CFF',
    role: 'Information',
    text: 'light',
  },
  {
    name: 'experiment',
    css: '--pozan-violet',
    hex: '#9B7BFF',
    role: 'Visual Lab only',
    text: 'dark',
  },
] as const;

export const spacingTokens = [
  4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160,
] as const;

export const motionTokens = [
  { token: 'fast', value: '160ms', purpose: 'Hover and pressed feedback' },
  { token: 'base', value: '280ms', purpose: 'State changes and small reveals' },
  { token: 'slow', value: '480ms', purpose: 'Layout and object movement' },
  { token: 'reveal', value: '700ms', purpose: 'Large editorial entrances' },
] as const;

export const componentStatuses = [
  {
    name: 'Button',
    status: 'Stable',
    description: 'Primary and secondary actions',
  },
  {
    name: 'Tag',
    status: 'Stable',
    description: 'Discipline and metadata labels',
  },
  {
    name: 'Meta link',
    status: 'Stable',
    description: 'Navigation and external links',
  },
  {
    name: 'Project card',
    status: 'Stable',
    description: 'Featured work and archive variants',
  },
  {
    name: 'Case dialog',
    status: 'Stable',
    description: 'Accessible project detail overlay',
  },
  {
    name: 'Form field',
    status: 'Stable',
    description: 'Label, help, validation and disabled states',
  },
  {
    name: 'Feedback message',
    status: 'Stable',
    description: 'Info, success, warning and error communication',
  },
  {
    name: 'Motion scene',
    status: 'Experimental',
    description: 'Scroll-linked narrative composition',
  },
] as const;

export const allSystemItems = systemNavigation.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.label })),
);
