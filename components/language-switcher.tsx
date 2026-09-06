'use client';

import { useLayoutEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Language = 'vi' | 'en';

const translations: Record<string, string> = {
  'Đến nội dung chính': 'Skip to main content',
  'Bạn mang đến một ý tưởng.': 'You bring an idea.',
  'Mình xây thế giới để nó': 'I build the world that makes it',
  'sống.': 'come alive.',
  'Đây là câu chuyện về cách tò mò trở thành ý tưởng, ý tưởng thành sản phẩm, và sản phẩm trở thành trải nghiệm khiến người ta muốn ở lại.':
    'This is the story of how curiosity becomes an idea, an idea becomes a product, and a product becomes an experience people want to stay with.',
  'Bắt đầu câu chuyện': 'Begin the story',
  'Trước khi viết code,': 'Before writing code,',
  'mình tìm điều cần': 'I find what needs to',
  'thay đổi.': 'change.',
  'Mình là Pozan, hiện theo học ngành Công nghệ Phần mềm tại Trường Đại học Xây dựng Hà Nội — HUCE. Mình quan tâm đến cách một hệ thống được thiết kế, xây dựng và vận hành trọn vẹn.':
    'I’m Pozan, a Software Engineering student at Hanoi University of Civil Engineering — HUCE. I care about how complete systems are designed, built, and operated.',
  'Thế mạnh của mình nằm ở giao điểm giữa kỹ thuật và sáng tạo: kiến trúc giao diện rõ ràng, code có cấu trúc, trải nghiệm dễ dùng và chuyển động có chủ đích.':
    'My strength lies where engineering meets creativity: clear interface architecture, structured code, intuitive experiences, and purposeful motion.',
  'Học bằng cách': 'Learning by',
  'xây thật.': 'building for real.',
  'Kinh nghiệm của mình được tích lũy qua chu trình hoàn chỉnh: tìm vấn đề, thiết kế giải pháp, phát triển, kiểm thử và đưa sản phẩm lên môi trường thực tế.':
    'I build experience through the complete product cycle: finding the problem, designing the solution, developing, testing, and shipping to production.',
  'BeeTools · Temsy · Arcade Học Đường': 'BeeTools · Temsy · Classroom Arcade',
  'Xây dựng ứng dụng web từ luồng người dùng đến giao diện hoạt động, bao gồm tìm kiếm, phân loại, phòng tương tác và trạng thái dữ liệu.':
    'Built web applications from user flows to working interfaces, including search, categorization, interactive rooms, and data states.',
  'Chuyển các vấn đề trong đời sống sinh viên thành nền tảng có cấu trúc nội dung rõ ràng, hành trình sử dụng dễ hiểu và bản sắc thị giác riêng.':
    'Turned student-life problems into platforms with clear information architecture, intuitive journeys, and distinct visual identities.',
  'Thiết kế và phát triển website responsive, kết hợp animation, hệ thống component và tối ưu trải nghiệm trên nhiều thiết bị.':
    'Designed and developed responsive websites with animation, component systems, and optimized experiences across devices.',
  'Những tín hiệu': 'The signals',
  'mình đã': 'I have',
  'gửi đi.': 'sent out.',
  'Mỗi dự án là một thế giới riêng. Cuộn để tiến sâu hơn.':
    'Every project is a world of its own. Scroll to travel deeper.',
  'Mở dự án thật': 'Visit live project',
  'Xem case study': 'View case study',
  'Bối cảnh': 'Context',
  'Vai trò': 'Role',
  'Quá trình': 'Process',
  'Kết quả': 'Outcome',
  'Viết code để': 'Writing code to',
  'giải quyết vấn đề.': 'solve real problems.',
  'Từ nền tảng khoa học máy tính đến sản phẩm chạy ổn định ngoài thực tế.':
    'From computer science foundations to reliable products running in the real world.',
  '1+ NĂM': '1+ YEARS',
  'Xây dựng sản phẩm web thực tế · 2025 — nay':
    'Building real web products · 2025 — present',
  'Sản phẩm đã đưa lên môi trường thật': 'Products shipped to production',
  'Từ bài toán, UI đến triển khai': 'From problem and UI to deployment',
  'Một quy trình, hai góc nhìn': 'One process, two perspectives',
  '1+ năm Frontend & Product Development':
    '1+ years in Frontend & Product Development',
  '10 sản phẩm thực tế · Community · EdTech · Web App · Web3':
    '10 real products · Community · EdTech · Web App · Web3',
  'Chuyển bài toán thành đặc tả và kiến trúc rõ ràng':
    'Turn problems into clear specifications and architecture',
  'Xây dựng frontend, API và luồng dữ liệu end-to-end':
    'Build frontend, APIs, and end-to-end data flows',
  'Kiểm soát lỗi, accessibility và security basics':
    'Handle defects, accessibility, and security fundamentals',
  'Làm việc theo vòng đời phát triển phần mềm':
    'Work across the software development lifecycle',
  'Trường Đại học Xây dựng Hà Nội': 'Hanoi University of Civil Engineering',
  'Kỹ sư Công nghệ Phần mềm · Đang theo học':
    'B.Eng. Software Engineering · In progress',
  'Ứng dụng web · Khám phá công cụ AI': 'Web application · AI tool discovery',
  'EdTech · Trải nghiệm học tập tương tác':
    'EdTech · Interactive learning experience',
  'Nền tảng cộng đồng · Thiết kế sản phẩm':
    'Community platform · Product design',
  'Cấu trúc dữ liệu & giải thuật': 'Data structures & algorithms',
  'Lập trình hướng đối tượng': 'Object-oriented programming',
  'Cơ sở dữ liệu & thiết kế hệ thống': 'Databases & system design',
  'Mạng máy tính & hệ điều hành': 'Computer networks & operating systems',
  'Phân tích yêu cầu & vòng đời phần mềm':
    'Requirements analysis & software lifecycle',
  'Làm việc nhóm, Git workflow & giao tiếp kỹ thuật':
    'Teamwork, Git workflows & technical communication',
  'TRAO ĐỔI CƠ HỘI': 'DISCUSS AN OPPORTUNITY',
  'Gửi một': 'Send a',
  'tín hiệu.': 'signal.',
  'Mình sẽ biến nó thành chuyển động.': 'I’ll turn it into motion.',
  'Thực tập, dự án nghiên cứu sinh viên, sản phẩm web hoặc một ý tưởng chưa có tên — hãy bắt đầu bằng một lời chào.':
    'An internship, student research, a web product, or an idea without a name yet — it can all begin with hello.',
  'HÀ NỘI, VIỆT NAM': 'HANOI, VIETNAM',
  'Khởi hành': 'Prologue',
  'Tín hiệu': 'Signal',
  'Kinh nghiệm': 'Experience',
  'Tác phẩm': 'Projects',
  'Năng lực': 'Skills',
  'Kết nối': 'Contact',
  'Bỏ qua phần mở đầu ↗': 'Skip intro ↗',
  'Nhìn điều quen thuộc, bằng một góc nhìn mới.':
    'See the familiar from a new perspective.',
  'Sống xanh bắt đầu từ những thay đổi nhỏ trong cộng đồng sinh viên.':
    'Sustainable living begins with small changes in the student community.',
  'Một nền tảng giúp sinh viên ULIS chia sẻ mẹo tái chế, trao đổi đồ dùng cũ và kết nối quanh lối sống bền vững.':
    'A platform where ULIS students share recycling tips, exchange used items, and connect through sustainable living.',
  'Thiết kế UI/UX, định hướng hình ảnh và phát triển website.':
    'UI/UX design, visual direction, and website development.',
  'Phân tích vấn đề lãng phí trong trường học → xây dựng kiến trúc nội dung → thiết kế giao diện → hoàn thiện trải nghiệm responsive.':
    'Analyze campus waste → shape information architecture → design the interface → refine the responsive experience.',
  'Website truyền tải rõ câu chuyện sống xanh và tạo điểm chạm trực quan cho hoạt động cộng đồng.':
    'A website that tells a clear sustainability story and creates an engaging touchpoint for community action.',
  'Đường đua số dành riêng cho cộng đồng sinh viên ULIS.':
    'A digital race built for the ULIS student community.',
  'Xây dựng điểm đến số cho giải chạy sinh viên, giúp người tham gia hiểu chương trình và đăng ký nhanh.':
    'A digital destination that explains the student race and makes registration effortless.',
  'Thiết kế trải nghiệm, giao diện và phát triển website.':
    'Experience design, interface design, and website development.',
  'Xác định hành trình đăng ký → xây dựng visual direction năng động → thiết kế responsive → triển khai.':
    'Map the registration journey → establish an energetic visual direction → design responsively → launch.',
  'Một landing page giàu năng lượng, giúp thông tin giải chạy dễ tiếp cận và thúc đẩy đăng ký.':
    'An energetic landing page that makes race information accessible and encourages registration.',
  'Chăm sóc sức khỏe thể chất và tinh thần cho sinh viên ĐHQGHN.':
    'Supporting the physical and mental wellbeing of VNU students.',
  'Concept nền tảng giúp sinh viên theo dõi sức khỏe, xây dựng thói quen và tiếp cận nội dung hỗ trợ phù hợp.':
    'A platform concept for tracking wellbeing, building habits, and finding relevant support.',
  'Nghiên cứu sản phẩm, thiết kế UI/UX và phát triển website giới thiệu.':
    'Product research, UI/UX design, and landing-page development.',
  'Nghiên cứu nhu cầu → xác định nhóm tính năng → user flow → prototype → landing page.':
    'Research needs → define feature groups → map user flows → prototype → build the landing page.',
  'Concept sản phẩm kết nối theo dõi thể chất, tinh thần và hỗ trợ xây dựng thói quen tích cực.':
    'A product concept connecting physical and mental tracking with positive habit building.',
  'Một điểm đến tập trung cho workshop và sự kiện học thuật.':
    'One destination for workshops and academic events.',
  'Giải quyết tình trạng thông tin workshop phân tán bằng một nền tảng tập trung, dễ tìm kiếm và khám phá.':
    'A centralized platform that makes scattered workshop information easy to search and discover.',
  'Thiết kế sản phẩm, UI/UX và phát triển giao diện.':
    'Product design, UI/UX, and frontend development.',
  'Phân nhóm nội dung → thiết kế kiến trúc thông tin → component system → responsive implementation.':
    'Group content → design information architecture → build a component system → implement responsively.',
  'Nền tảng tổng hợp workshop theo khoa và chủ đề, giúp sinh viên tìm cơ hội phát triển nhanh hơn.':
    'A workshop platform organized by faculty and topic, helping students find opportunities faster.',
  'Cầu nối giáo trình đáng tin cậy cho cộng đồng ULIS.':
    'A trusted textbook bridge for the ULIS community.',
  'Tạo không gian kết nối sách cũ với sinh viên đang cần, giảm chi phí và kéo dài vòng đời tài liệu.':
    'A space connecting used books with students who need them, reducing cost and extending each book’s life.',
  'Xây dựng concept, thiết kế visual và phát triển website.':
    'Concept development, visual design, and website development.',
  'Xác định giá trị cộng đồng → content flow → visual storytelling → responsive build.':
    'Define community value → shape the content flow → create visual storytelling → build responsively.',
  'Một nền tảng kể câu chuyện rõ ràng về việc kết nối sách cũ với người đang cần chúng.':
    'A platform with a clear story about connecting used books to the people who need them.',
  'Nơi đồ thất lạc tìm đường về, đồ cũ bắt đầu hành trình mới.':
    'Where lost belongings find their way home and used items begin a new journey.',
  'Kết nối nhu cầu tìm đồ thất lạc và trao đổi đồ cũ trong một hành trình cộng đồng thống nhất.':
    'Unifying lost-and-found and used-item exchange in one community journey.',
  'Thiết kế trải nghiệm, art direction và phát triển website.':
    'Experience design, art direction, and website development.',
  'Phân tích tình huống sử dụng → phân luồng nội dung → thiết kế visual → triển khai.':
    'Analyze use cases → structure content paths → design the visuals → launch.',
  'Một trải nghiệm kết nối hoạt động tìm đồ, trao đổi đồ cũ và tinh thần chia sẻ bền vững.':
    'An experience joining lost-and-found, item exchange, and a culture of sustainable sharing.',
  'Cánh cửa trực quan bước vào tài chính phi tập trung.':
    'A visual gateway into decentralized finance.',
  'Biến một sản phẩm DeFi phức tạp thành câu chuyện số dễ tiếp cận và có định hướng chuyển đổi.':
    'Turn a complex DeFi product into an accessible digital story designed for conversion.',
  'Thiết kế UI, motion direction và phát triển landing page.':
    'UI design, motion direction, and landing-page development.',
  'Xây dựng narrative → dark visual system → motion prototype → responsive implementation.':
    'Shape the narrative → create a dark visual system → prototype motion → implement responsively.',
  'Landing page đậm chất công nghệ với hệ màu tối, ánh sáng và nhịp chuyển động tập trung vào chuyển đổi.':
    'A technology-forward landing page with a dark palette, atmospheric light, and conversion-led motion.',
  'Kho công cụ AI và tiện ích được tuyển chọn cho công việc hằng ngày.':
    'A curated library of AI tools and utilities for everyday work.',
  'Thiết kế một thư viện giúp người dùng tìm, lọc và lưu các công cụ số phù hợp với công việc.':
    'A library that helps people find, filter, and save the right digital tools for their work.',
  'Thiết kế sản phẩm và phát triển ứng dụng web.':
    'Product design and web application development.',
  'Data model → search & category flow → component architecture → deployment.':
    'Data model → search and category flow → component architecture → deployment.',
  'Ứng dụng thư viện công cụ với tìm kiếm nhanh, danh mục, yêu thích và giao diện tối nhất quán.':
    'A tool library with fast search, categories, favorites, and a consistent dark interface.',
  'Biến từng khoảnh khắc thành một con tem kỷ niệm.':
    'Turn every moment into a collectible stamp.',
  'Tạo trải nghiệm sưu tầm kỹ thuật số mang cảm giác gần gũi thay vì kỹ thuật và xa cách.':
    'A digital collecting experience that feels warm and familiar rather than technical and distant.',
  'Thiết kế sản phẩm, giao diện và phát triển ứng dụng.':
    'Product design, interface design, and application development.',
  'Concept exploration → collection flow → UI system → responsive development.':
    'Concept exploration → collection flow → UI system → responsive development.',
  'Ứng dụng sưu tầm tem kỹ thuật số với không gian khám phá tối giản và gần gũi.':
    'A digital stamp collection app with a simple, welcoming space for discovery.',
  'Biến tiết học thành một sân chơi tương tác kiểu arcade.':
    'Turn lessons into an interactive arcade playground.',
  'Tạo công cụ giúp giáo viên biến hoạt động trên lớp thành trò chơi có nhịp độ và phản hồi trực tiếp.':
    'A tool that turns classroom activities into fast-paced games with live feedback.',
  'Thiết kế trải nghiệm trò chơi và phát triển ứng dụng web.':
    'Game experience design and web application development.',
  'Classroom flow → game mechanics → realtime room states → responsive interface.':
    'Classroom flow → game mechanics → real-time room states → responsive interface.',
  'Một lớp học tương tác theo thời gian thực với mã phòng, vòng quay may mắn và ngôn ngữ arcade vui nhộn.':
    'A real-time interactive classroom with room codes, a lucky wheel, and playful arcade language.',
};

const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Record<string, string>>();

function replaceText(node: Text, language: Language) {
  const base = originalText.get(node) ?? node.data;
  if (!originalText.has(node)) originalText.set(node, base);
  const normalized = base.trim().replace(/\s+/g, ' ');
  const translated = translations[normalized];
  if (!translated || language === 'vi') {
    node.data = base;
    return;
  }
  const leading = base.match(/^\s*/)?.[0] ?? '';
  const trailing = base.match(/\s*$/)?.[0] ?? '';
  node.data = `${leading}${translated}${trailing}`;
}

function translatePage(language: Language) {
  const content = document.querySelector<HTMLElement>('.scroll-story');
  if (!content) return;

  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      return parent?.closest('[data-language-control]') ||
        parent?.closest('script, style')
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    },
  });
  let node = walker.nextNode();
  while (node) {
    replaceText(node as Text, language);
    node = walker.nextNode();
  }

  content
    .querySelectorAll<HTMLElement>('[aria-label], [alt], [title]')
    .forEach((element) => {
      const saved = originalAttributes.get(element) ?? {};
      for (const attribute of ['aria-label', 'alt', 'title']) {
        const current = element.getAttribute(attribute);
        if (current !== null && saved[attribute] === undefined)
          saved[attribute] = current;
        const base = saved[attribute];
        if (!base) continue;
        let value = language === 'en' ? (translations[base] ?? base) : base;
        if (language === 'en') {
          value = value.replace(/^Ảnh dự án /, 'Project image: ');
          value = value.replace(/^Tín hiệu dự án /, 'Project signal ');
          value = value.replace(
            'Các chương của portfolio',
            'Portfolio chapters',
          );
          value = value.replace('Đang mở portfolio', 'Opening portfolio');
        }
        element.setAttribute(attribute, value);
      }
      originalAttributes.set(element, saved);
    });

  document.documentElement.lang = language;
  document.documentElement.dataset.language = language;
  document.title =
    language === 'en'
      ? 'Pozan — Software Engineer & Creative Developer'
      : 'Pozan — Kỹ sư phần mềm & Creative Developer';
  document
    .querySelector<HTMLMetaElement>('meta[name="description"]')
    ?.setAttribute(
      'content',
      language === 'en'
        ? 'Pozan’s portfolio — a Software Engineering student at HUCE, software engineer, and creative developer.'
        : 'Portfolio của Pozan — sinh viên Công nghệ Phần mềm tại HUCE, kỹ sư phần mềm và creative developer.',
    );
}

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>('vi');

  useLayoutEffect(() => {
    const saved = localStorage.getItem('pozan-language');
    const initial: Language = saved === 'en' ? 'en' : 'vi';
    translatePage(initial);
    if (initial === 'en') {
      requestAnimationFrame(() => setLanguage('en'));
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  const selectLanguage = (next: Language) => {
    if (next === language) return;
    const update = () => {
      setLanguage(next);
      localStorage.setItem('pozan-language', next);
      translatePage(next);
    };
    const transitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };
    if (transitionDocument.startViewTransition) {
      transitionDocument.startViewTransition(update);
    } else {
      update();
    }
    requestAnimationFrame(() =>
      requestAnimationFrame(() => ScrollTrigger.refresh()),
    );
  };

  return (
    <fieldset className="language-switcher" data-language-control>
      <legend>Language / Ngôn ngữ</legend>
      <button
        type="button"
        className={language === 'en' ? 'is-active' : ''}
        aria-pressed={language === 'en'}
        onClick={() => selectLanguage('en')}
      >
        EN
      </button>
      <span aria-hidden="true" />
      <button
        type="button"
        className={language === 'vi' ? 'is-active' : ''}
        aria-pressed={language === 'vi'}
        onClick={() => selectLanguage('vi')}
      >
        VIE
      </button>
    </fieldset>
  );
}
