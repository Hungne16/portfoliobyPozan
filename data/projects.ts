export type PortfolioProject = {
  name: string;
  sub: string;
  type: string;
  brief: string;
  role: string;
  process: string;
  result: string;
  projectUrl: string | null;
  year: string;
  imageKey: string | null;
};

const authoredProjects: PortfolioProject[] = [
  {
    name: 'ULIS Eco',
    sub: 'Sống xanh bắt đầu từ những thay đổi nhỏ trong cộng đồng sinh viên.',
    type: 'COMMUNITY PLATFORM',
    brief:
      'Một nền tảng giúp sinh viên ULIS chia sẻ mẹo tái chế, trao đổi đồ dùng cũ và kết nối quanh lối sống bền vững.',
    role: 'Thiết kế UI/UX, định hướng hình ảnh và phát triển website.',
    process:
      'Phân tích vấn đề lãng phí trong trường học → xây dựng kiến trúc nội dung → thiết kế giao diện → hoàn thiện trải nghiệm responsive.',
    result:
      'Website truyền tải rõ câu chuyện sống xanh và tạo điểm chạm trực quan cho hoạt động cộng đồng.',
    projectUrl: 'https://uliseco.framer.website/about',
    year: '2026',
    imageKey: '/projects/ulis-eco.png',
  },
  {
    name: 'U-RUN — Be ULISer, Be Runner',
    sub: 'Đường đua số dành riêng cho cộng đồng sinh viên ULIS.',
    type: 'CAMPAIGN WEBSITE',
    brief:
      'Xây dựng điểm đến số cho giải chạy sinh viên, giúp người tham gia hiểu chương trình và đăng ký nhanh.',
    role: 'Thiết kế trải nghiệm, giao diện và phát triển website.',
    process:
      'Xác định hành trình đăng ký → xây dựng visual direction năng động → thiết kế responsive → triển khai.',
    result:
      'Một landing page giàu năng lượng, giúp thông tin giải chạy dễ tiếp cận và thúc đẩy đăng ký.',
    projectUrl: 'https://urunbeuliser.framer.website/',
    year: '2026',
    imageKey: '/projects/urun-be-uliser.png',
  },
  {
    name: 'U-Life',
    sub: 'Chăm sóc sức khỏe thể chất và tinh thần cho sinh viên ĐHQGHN.',
    type: 'HEALTH PRODUCT',
    brief:
      'Concept nền tảng giúp sinh viên theo dõi sức khỏe, xây dựng thói quen và tiếp cận nội dung hỗ trợ phù hợp.',
    role: 'Nghiên cứu sản phẩm, thiết kế UI/UX và phát triển website giới thiệu.',
    process:
      'Nghiên cứu nhu cầu → xác định nhóm tính năng → user flow → prototype → landing page.',
    result:
      'Concept sản phẩm kết nối theo dõi thể chất, tinh thần và hỗ trợ xây dựng thói quen tích cực.',
    projectUrl: 'https://ulife.framer.website/',
    year: '2026',
    imageKey: '/projects/ulife.png',
  },
  {
    name: 'WULIS — Workshop ULIS',
    sub: 'Một điểm đến tập trung cho workshop và sự kiện học thuật.',
    type: 'EDTECH PLATFORM',
    brief:
      'Giải quyết tình trạng thông tin workshop phân tán bằng một nền tảng tập trung, dễ tìm kiếm và khám phá.',
    role: 'Thiết kế sản phẩm, UI/UX và phát triển giao diện.',
    process:
      'Phân nhóm nội dung → thiết kế kiến trúc thông tin → component system → responsive implementation.',
    result:
      'Nền tảng tổng hợp workshop theo khoa và chủ đề, giúp sinh viên tìm cơ hội phát triển nhanh hơn.',
    projectUrl: 'https://wulis.framer.website/',
    year: '2026',
    imageKey: '/projects/wulis.png',
  },
  {
    name: 'The BookBridge',
    sub: 'Cầu nối giáo trình đáng tin cậy cho cộng đồng ULIS.',
    type: 'COMMUNITY MARKETPLACE',
    brief:
      'Tạo không gian kết nối sách cũ với sinh viên đang cần, giảm chi phí và kéo dài vòng đời tài liệu.',
    role: 'Xây dựng concept, thiết kế visual và phát triển website.',
    process:
      'Xác định giá trị cộng đồng → content flow → visual storytelling → responsive build.',
    result:
      'Một nền tảng kể câu chuyện rõ ràng về việc kết nối sách cũ với người đang cần chúng.',
    projectUrl: 'https://thebookbridge.framer.website/',
    year: '2025',
    imageKey: '/projects/the-book-bridge.png',
  },
  {
    name: 'ULIS Lost & Found',
    sub: 'Nơi đồ thất lạc tìm đường về, đồ cũ bắt đầu hành trình mới.',
    type: 'COMMUNITY SERVICE',
    brief:
      'Kết nối nhu cầu tìm đồ thất lạc và trao đổi đồ cũ trong một hành trình cộng đồng thống nhất.',
    role: 'Thiết kế trải nghiệm, art direction và phát triển website.',
    process:
      'Phân tích tình huống sử dụng → phân luồng nội dung → thiết kế visual → triển khai.',
    result:
      'Một trải nghiệm kết nối hoạt động tìm đồ, trao đổi đồ cũ và tinh thần chia sẻ bền vững.',
    projectUrl: 'https://ulislostandfound.framer.website/',
    year: '2026',
    imageKey: '/projects/ulis-lost-found.png',
  },
  {
    name: 'Orbits DeFi',
    sub: 'Cánh cửa trực quan bước vào tài chính phi tập trung.',
    type: 'FINTECH LANDING PAGE',
    brief:
      'Biến một sản phẩm DeFi phức tạp thành câu chuyện số dễ tiếp cận và có định hướng chuyển đổi.',
    role: 'Thiết kế UI, motion direction và phát triển landing page.',
    process:
      'Xây dựng narrative → dark visual system → motion prototype → responsive implementation.',
    result:
      'Landing page đậm chất công nghệ với hệ màu tối, ánh sáng và nhịp chuyển động tập trung vào chuyển đổi.',
    projectUrl: 'https://orbitsdefi.framer.website/',
    year: '2026',
    imageKey: '/projects/orbits-defi.png',
  },
  {
    name: 'BeeTools',
    sub: 'Kho công cụ AI và tiện ích được tuyển chọn cho công việc hằng ngày.',
    type: 'WEB APPLICATION',
    brief:
      'Thiết kế một thư viện giúp người dùng tìm, lọc và lưu các công cụ số phù hợp với công việc.',
    role: 'Thiết kế sản phẩm và phát triển ứng dụng web.',
    process:
      'Data model → search & category flow → component architecture → deployment.',
    result:
      'Ứng dụng thư viện công cụ với tìm kiếm nhanh, danh mục, yêu thích và giao diện tối nhất quán.',
    projectUrl: 'https://beetls.vercel.app/',
    year: '2026',
    imageKey: '/projects/beetls.png',
  },
  {
    name: 'Temsy',
    sub: 'Biến từng khoảnh khắc thành một con tem kỷ niệm.',
    type: 'DIGITAL COLLECTIBLES',
    brief:
      'Tạo trải nghiệm sưu tầm kỹ thuật số mang cảm giác gần gũi thay vì kỹ thuật và xa cách.',
    role: 'Thiết kế sản phẩm, giao diện và phát triển ứng dụng.',
    process:
      'Concept exploration → collection flow → UI system → responsive development.',
    result:
      'Ứng dụng sưu tầm tem kỹ thuật số với không gian khám phá tối giản và gần gũi.',
    projectUrl: 'https://temsy.vercel.app/',
    year: '2026',
    imageKey: '/projects/temsy.png',
  },
  {
    name: 'Arcade Học Đường',
    sub: 'Biến tiết học thành một sân chơi tương tác kiểu arcade.',
    type: 'EDTECH GAME',
    brief:
      'Tạo công cụ giúp giáo viên biến hoạt động trên lớp thành trò chơi có nhịp độ và phản hồi trực tiếp.',
    role: 'Thiết kế trải nghiệm trò chơi và phát triển ứng dụng web.',
    process:
      'Classroom flow → game mechanics → realtime room states → responsive interface.',
    result:
      'Một lớp học tương tác theo thời gian thực với mã phòng, vòng quay may mắn và ngôn ngữ arcade vui nhộn.',
    projectUrl: 'https://arcadeschool.vercel.app/index.html',
    year: '2026',
    imageKey: '/projects/arcade-school.png',
  },
];

export const featuredNames = [
  'Orbits DeFi',
  'U-Life',
  'U-RUN — Be ULISer, Be Runner',
  'ULIS Eco',
];
export const projectSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const sampleProjects = authoredProjects.map((project) => ({
  ...project,
  id: projectSlug(project.name),
  slug: projectSlug(project.name),
  featured: featuredNames.includes(project.name),
  disciplines: ['Design', 'Development'],
  caseStudy: {
    problem: project.brief,
    role: project.role,
    process: project.process,
    outcome: project.result,
  },
}));
