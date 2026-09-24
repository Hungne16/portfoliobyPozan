export type VisualExperiment = {
  id: string;
  index: string;
  title: string;
  discipline: string;
  year: string;
  status: 'LIVE' | 'PROTOTYPE';
  description: { vi: string; en: string };
  stack: string[];
  specimen: 'field' | 'type' | 'orbit' | 'interface';
  size: 'wide' | 'compact' | 'medium' | 'large';
};

export const visualLab: VisualExperiment[] = [
  {
    id: 'signal-field',
    index: 'L/01',
    title: 'Signal Field',
    discipline: 'GENERATIVE DESIGN',
    year: '2026',
    status: 'LIVE',
    description: {
      vi: 'Một trường tín hiệu được tạo bằng các biến CSS và nhịp chuyển động có kiểm soát. Mỗi lần tái tạo sẽ mở ra một cấu hình không gian mới.',
      en: 'A signal field built from CSS variables and controlled motion. Every regeneration reveals a new spatial configuration.',
    },
    stack: ['CSS', 'REACT', 'GENERATIVE LOGIC'],
    specimen: 'field',
    size: 'wide',
  },
  {
    id: 'type-reactor',
    index: 'L/02',
    title: 'Type Reactor',
    discipline: 'TYPOGRAPHY',
    year: '2026',
    status: 'LIVE',
    description: {
      vi: 'Thử nghiệm typography như một vật thể có nhịp, khối lượng và phản hồi thay vì chỉ là nội dung để đọc.',
      en: 'An experiment that treats typography as an object with rhythm, weight and response instead of static copy.',
    },
    stack: ['TYPE SYSTEM', 'MOTION', 'ART DIRECTION'],
    specimen: 'type',
    size: 'compact',
  },
  {
    id: 'orbital-form',
    index: 'L/03',
    title: 'Orbital Form',
    discipline: '3D / INTERACTIVE',
    year: '2026',
    status: 'PROTOTYPE',
    description: {
      vi: 'Một vật thể không gian dựng hoàn toàn bằng CSS 3D, phản ứng theo vị trí con trỏ để kiểm tra chiều sâu và cảm giác vật lý.',
      en: 'A spatial object built entirely with CSS 3D, responding to pointer position to study depth and physical presence.',
    },
    stack: ['CSS 3D', 'POINTER INPUT', 'PERSPECTIVE'],
    specimen: 'orbit',
    size: 'medium',
  },
  {
    id: 'interface-pulse',
    index: 'L/04',
    title: 'Interface Pulse',
    discipline: 'MOTION',
    year: '2026',
    status: 'LIVE',
    description: {
      vi: 'Một giao diện nhỏ chuyển đổi giữa trạng thái tập trung và khám phá để thử nghiệm hierarchy, phản hồi và nhịp điệu sản phẩm.',
      en: 'A compact interface shifting between focus and explore modes to test hierarchy, feedback and product rhythm.',
    },
    stack: ['UI SYSTEM', 'STATE', 'MICRO MOTION'],
    specimen: 'interface',
    size: 'large',
  },
];
