(function () {
  const i18n = {
    en: {
      allProjects: "All Projects",
      all: "All",
      backToPortfolio: "Back to Portfolio",
      category: "Category",
      contact: "Contact",
      designFocus: "Design focus",
      experience: "Experience",
      gallery: "Gallery",
      home: "Home",
      location: "Location",
      next: "Next",
      nextProject: "Next project",
      openProjectFiles: "Open project files",
      overview: "Overview",
      pdfDocuments: "PDF Documents",
      portfolio: "Portfolio",
      portfolioIndex: "Portfolio Index",
      portfolioHeroText: "Browse projects by space type, with detail pages and galleries for each project to see the overview, concept, role and scope of work.",
      portfolioHeroTitle: "Projects by category",
      process: "Process",
      profile: "Profile",
      projectImages: "Project images",
      projectNotFound: "Project not found",
      projectNotFoundText: "Back to the portfolio index to choose another project.",
      pdfPageTitle: "Aluminum Profile",
      pdfPageText: "PDF files for coffee shop and aluminum profile related work.",
      pdfPageBack: "Back to project",
      pdfPageAll: "All Projects",
      pdfPageOpen: "Open PDF files",
      resultAll: (count) => `${count} project${count === 1 ? "" : "s"}`,
      resultFilter: (count, label) => `${count} project${count === 1 ? "" : "s"} in ${label}`,
      role: "Role",
      scope: "Scope",
      status: "Status",
      viewGallery: "View Gallery",
      viewPdf: "View PDF",
      work: "Work",
      year: "Year"
    },
    th: {
      allProjects: "โปรเจกต์ทั้งหมด",
      all: "ทั้งหมด",
      backToPortfolio: "กลับไปหน้าผลงาน",
      category: "หมวดหมู่",
      contact: "ติดต่อ",
      designFocus: "แนวคิดการออกแบบ",
      experience: "ประสบการณ์",
      gallery: "แกลเลอรี",
      home: "หน้าแรก",
      location: "สถานที่",
      next: "ถัดไป",
      nextProject: "โปรเจกต์ถัดไป",
      openProjectFiles: "เปิดไฟล์โปรเจกต์",
      overview: "ภาพรวม",
      pdfDocuments: "เอกสาร PDF",
      portfolio: "ผลงาน",
      portfolioIndex: "รวมผลงาน",
      portfolioHeroText: "เลือกดูงานตามประเภทพื้นที่ พร้อมหน้ารายละเอียดและแกลเลอรีสำหรับแต่ละโปรเจกต์ เพื่อเห็นภาพรวม แนวคิด บทบาท และขอบเขตการทำงาน",
      portfolioHeroTitle: "ผลงานแยกตามหมวดหมู่",
      process: "กระบวนการ",
      profile: "โปรไฟล์",
      projectImages: "รูปภาพโปรเจกต์",
      projectNotFound: "ไม่พบโปรเจกต์",
      projectNotFoundText: "กลับไปหน้ารวมผลงานเพื่อเลือกโปรเจกต์ใหม่",
      pdfPageTitle: "เอกสาร Aluminum Profile",
      pdfPageText: "รวมไฟล์ PDF สำหรับงาน coffee shop และ aluminum profile ที่เกี่ยวข้อง",
      pdfPageBack: "กลับไปโปรเจกต์",
      pdfPageAll: "ดูผลงานทั้งหมด",
      pdfPageOpen: "เปิดไฟล์ PDF",
      resultAll: (count) => `${count} โปรเจกต์`,
      resultFilter: (count, label) => `${count} โปรเจกต์ใน ${label}`,
      role: "บทบาท",
      scope: "ขอบเขตงาน",
      status: "สถานะ",
      viewGallery: "ดูรูปภาพ",
      viewPdf: "ดู PDF",
      work: "ผลงาน",
      year: "ปี"
    }
  };

  const projectOrder = [
    "office-sukhumvit31",
    "one-bangkok-popup",
    "ramen-sukhumvit33",
    "chikura-hanoi",
    "tong-lor-bar",
    "condo-sukhumvit33",
    "condo-sukhumvit24",
    "resort",
    "hotel",
    "zen-japanese-restaurant",
    "pool-villa",
    "office-khan",
    "samsung-shop",
    "rental-house",
    "gallery-art",
    "learning-center",
    "office-rmutt",
    "presidents-office",
    "VIP RESIDENT ROOM",
    "landscape-rmutt",
    "aluminium-profile",
    "ai-render",
    "little-garden",
    "logo-design"
  ];
  const projects = (window.portfolioProjects || []).slice().sort((a, b) => {
    const aIndex = projectOrder.indexOf(a.id);
    const bIndex = projectOrder.indexOf(b.id);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });
  const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  const getLanguage = () => localStorage.getItem("portfolioLanguage") || "en";
  const t = (key, ...args) => {
    const value = i18n[getLanguage()]?.[key] || i18n.en[key] || key;
    return typeof value === "function" ? value(...args) : value;
  };
  const labelTranslations = {
    th: {
      category: {
        Education: "การศึกษา",
        Hospitality: "งานบริการ",
        Residential: "ที่อยู่อาศัย",
        Retail: "ร้านค้า",
        Visualization: "งานภาพและพรีเซนต์",
        Workplace: "สำนักงาน"
      },
      role: {
        Designer: "ผู้ออกแบบ",
        "Interior / Landscape Designer": "ออกแบบภายใน / ภูมิทัศน์",
        "Interior Designer": "ออกแบบภายใน"
      },
      status: {
        "AI Visualization": "ภาพทดลองด้วย AI",
        "Concept Design": "ออกแบบแนวคิด",
        Design: "ออกแบบ",
        "Design & Visualization": "ออกแบบและทำภาพ",
        "Graphic Design": "ออกแบบกราฟิก",
        "Renovation Design": "ออกแบบปรับปรุง"
      },
      tag: {
        Airbnb: "Airbnb",
        "AI render": "ภาพ AI",
        "Aluminum profile": "อลูมิเนียมโปรไฟล์",
        Amenity: "สิ่งอำนวยความสะดวก",
        Bar: "บาร์",
        "Brand presence": "ภาพลักษณ์แบรนด์",
        "Bright mood": "บรรยากาศสว่าง",
        Campus: "พื้นที่มหาวิทยาลัย",
        "Calm finishes": "วัสดุโทนสงบ",
        "Classic detail": "รายละเอียดคลาสสิก",
        Classroom: "ห้องเรียน",
        "Clean ceiling": "ฝ้าเรียบสะอาด",
        "Compact living": "อยู่อาศัยพื้นที่กระชับ",
        "Compact planning": "การวางผังพื้นที่กระชับ",
        "Compact shop": "ร้านขนาดเล็ก",
        "Composed mood": "บรรยากาศนิ่งและเรียบร้อย",
        Condo: "คอนโด",
        Counter: "เคาน์เตอร์",
        "Customer flow": "เส้นทางลูกค้า",
        "Customer path": "ทางเดินลูกค้า",
        Dining: "พื้นที่รับประทานอาหาร",
        Display: "พื้นที่แสดง",
        "Executive room": "ห้องผู้บริหาร",
        "Food retail": "ร้านอาหารขนาดเล็ก",
        "Formal seating": "ที่นั่งรับรอง",
        Furniture: "เฟอร์นิเจอร์",
        Gallery: "แกลเลอรี",
        "Garden tone": "โทนสวน",
        "Graphic identity": "ภาพลักษณ์กราฟิก",
        "Guest room": "ห้องพัก",
        Hanoi: "ฮานอย",
        House: "บ้าน",
        "Hospitality flow": "การใช้งานแบบงานบริการ",
        Identity: "อัตลักษณ์",
        "Informal meeting": "พื้นที่คุยงานไม่เป็นทางการ",
        "Japanese mood": "บรรยากาศญี่ปุ่น",
        Learning: "พื้นที่เรียนรู้",
        Logo: "โลโก้",
        "Marble feature": "ผนังหินอ่อน",
        "Material detail": "รายละเอียดวัสดุ",
        Meeting: "ประชุม",
        "Mood lighting": "แสงบรรยากาศ",
        "Mood study": "ทดลองบรรยากาศ",
        Movement: "การสัญจร",
        Office: "สำนักงาน",
        "One Bangkok": "One Bangkok",
        "Pool villa": "พูลวิลล่า",
        "Pop-up": "ป๊อปอัป",
        Presentation: "พรีเซนต์",
        "Premium surface": "วัสดุพรีเมียม",
        "Private office": "สำนักงานส่วนตัว",
        "Public space": "พื้นที่สาธารณะ",
        Reception: "ต้อนรับ",
        "Relaxed mood": "บรรยากาศผ่อนคลาย",
        "Ramen shop": "ร้านราเมน",
        "Rental living": "บ้านเช่า",
        Restaurant: "ร้านอาหาร",
        "Retail display": "ดิสเพลย์ร้านค้า",
        "Shared office": "สำนักงานร่วม",
        "Soft modern": "โมเดิร์นนุ่มนวล",
        Storage: "พื้นที่เก็บของ",
        "Track lighting": "ไฟราง",
        "Vacation living": "ที่พักผ่อน",
        "Warm interior": "ภายในโทนอุ่น",
        "Warm material": "วัสดุโทนอุ่น",
        "Warm modern": "โมเดิร์นโทนอุ่น"
      }
    }
  };
  const label = (type, value) => labelTranslations[getLanguage()]?.[type]?.[value] || value;
  const tags = (items) => (items || []).map((item) => label("tag", item));
  const projectTranslations = {
    en: {
      "resort": {
        highlight: "Designed the resort to feel warm and genuinely restful, with a soft connection between the interior atmosphere and the natural view."
      },
      "pool-villa": {
        highlight: "Shaped the pool villa around privacy, openness and a resort-like mood suited for short-stay relaxation."
      },
      "landscape-rmutt": {
        highlight: "Organized the outdoor areas for easy movement, practical resting points and shared daily use by students."
      },
      "VIP RESIDENT ROOM": {
        highlight: "Designed the reception room to feel refined and formal, using classic details to create a credible, dignified impression."
      },
      "office-rmutt": {
        highlight: "Designed a clean, professional office layout with a clear separation between working areas and reception functions."
      },
      "office-khan": {
        highlight: "Created a warm and orderly private office atmosphere that supports both focused work and meetings."
      },
      "presidents-office": {
        highlight: "Composed the executive office with a calm, substantial presence and a balanced use of premium materials."
      },
      "gallery-art": {
        highlight: "Designed the gallery and art classroom to feel open and bright, allowing the artwork to become the main focus."
      },
      "learning-center": {
        highlight: "Organized the learning space with clear reading, discussion and information-display zones that work together continuously."
      },
      "samsung-shop": {
        highlight: "Designed the retail area so products stand out, customers can browse comfortably and the brand image remains clear."
      },
      "little-garden": {
        highlight: "Designed the small shop to feel bright and approachable, using a garden-inspired tone to make the space friendlier."
      },
      "hotel": {
        highlight: "Developed the hotel so each function has its own identity while staying connected through a calm, premium atmosphere."
      },
      "zen-japanese-restaurant": {
        highlight: "Designed the Japanese restaurant with a simple, calm mood and warm materials that support a relaxed dining rhythm."
      },
      "one-bangkok-popup": {
        highlight: "Designed the pop-up shop to be memorable, compact and visually attractive from the storefront in a short amount of time."
      },
      "office-sukhumvit31": {
        highlight: "Sequenced the spaces from reception to private office so the workplace feels orderly, efficient and ready for real meetings."
      },
      "ramen-sukhumvit33": {
        highlight: "Designed the ramen shop to use space efficiently, keep circulation clear and create a warm mood for quick dining."
      },
      "chikura-hanoi": {
        highlight: "Arranged the images from the storefront identity into the facade, counter and interior seating areas to present the shop flow clearly."
      },
      "tong-lor-bar": {
        highlight: "Arranged the images from the main counter view into lighting, shelving and seating moments to show the bar character more completely."
      },
      "rental-house": {
        highlight: "Designed the rental house to feel warm, easy to maintain and functional for real everyday living."
      },
      "condo-sukhumvit33": {
        highlight: "Focused on storage, daily-use functions and details that make the city condo feel warm while remaining easy to maintain."
      },
      "condo-sukhumvit24": {
        highlight: "Designed the compact condo for smooth everyday use, with integrated storage and a calm atmosphere."
      },
      "aluminium-profile": {
        highlight: "Developed furniture and display pieces from aluminum profiles with clear expression of lines, materials and assembly details."
      },
      "ai-render": {
        highlight: "Used AI to quickly explore the mood of the space and define an overall direction before developing the detailed design."
      },
      "logo-design": {
        highlight: "Designed logos and visual identity elements to be memorable and clear for presentation and brand communication."
      }
    },
    th: {
      "resort": {
        summary: "งานออกแบบภายในรีสอร์ตที่เน้นบรรยากาศอบอุ่น ใช้วัสดุนุ่มนวล และจัดการสัญจรให้ผู้เข้าพักรู้สึกผ่อนคลาย",
        highlight: "ออกแบบรีสอร์ตให้รู้สึกอบอุ่น พักผ่อนได้จริง และเชื่อมบรรยากาศภายในกับวิวธรรมชาติอย่างนุ่มนวล"
      },
      "pool-villa": {
        summary: "งานศึกษาแนวทางพูลวิลล่าที่เน้นความเป็นส่วนตัว การเชื่อมต่อกับภายนอก และวัสดุภายในโทนอุ่น",
        highlight: "วางบรรยากาศพูลวิลล่าให้เป็นส่วนตัว โปร่งสบาย และเหมาะกับการพักผ่อนระยะสั้นแบบรีสอร์ต"
      },
      "landscape-rmutt": {
        summary: "งานออกแบบภูมิทัศน์สำหรับพื้นที่ใช้งานร่วมกันในมหาวิทยาลัย เน้นความสงบ การเดิน และพื้นที่พักกลางแจ้งที่ใช้ได้จริง",
        highlight: "จัดพื้นที่ภายนอกให้เดินง่าย พักได้ และรองรับการใช้งานร่วมกันของนักศึกษาในชีวิตประจำวัน"
      },
      "VIP RESIDENT ROOM": {
        summary: "ห้องรับรองภาพลักษณ์ทางการ ใช้รายละเอียดผนังคลาสสิก แสงโคม และการจัดเฟอร์นิเจอร์ที่สุภาพ",
        highlight: "ออกแบบห้องรับรองให้ดูสุภาพ เป็นทางการ และมีรายละเอียดคลาสสิกที่สร้างความน่าเชื่อถือ"
      },
      "office-rmutt": {
        summary: "งานออกแบบสำนักงานสมัยใหม่ที่ใช้ผนังหินอ่อน รายละเอียดฝ้าเรียบ และการวางพื้นที่ทำงานอย่างเป็นมืออาชีพ",
        highlight: "ออกแบบสำนักงานให้สะอาด เป็นมืออาชีพ และแบ่งพื้นที่ทำงานกับพื้นที่รับรองได้ชัดเจน"
      },
      "office-khan": {
        summary: "สำนักงานส่วนตัวโทนโมเดิร์นอุ่น จัดพื้นที่ประชุมและพื้นที่ผู้บริหารให้ดูเรียบร้อยและใช้งานจริงได้ดี",
        highlight: "สร้างบรรยากาศสำนักงานส่วนตัวที่อบอุ่น เรียบร้อย และเหมาะกับทั้งการทำงานและการประชุม"
      },
      "presidents-office": {
        summary: "แนวคิดห้องผู้บริหารที่ควบคุมคอนทราสต์ ใช้วัสดุพรีเมียม และสร้างบรรยากาศทำงานที่สุขุม",
        highlight: "วางภาพลักษณ์ห้องผู้บริหารให้สุขุม มีน้ำหนัก และใช้วัสดุพรีเมียมอย่างพอดี"
      },
      "gallery-art": {
        summary: "งานออกแบบแกลเลอรี ห้องเรียนศิลปะ และโถงทางเดิน ด้วยผังแสดงงานที่สะอาดและระบบไฟราง",
        highlight: "ออกแบบพื้นที่แสดงงานและห้องเรียนศิลปะให้ดูโล่ง สว่าง และช่วยให้งานศิลป์เป็นจุดเด่น"
      },
      "learning-center": {
        summary: "แนวคิดศูนย์การเรียนรู้ที่จัดพื้นที่อ่านหนังสือ พื้นที่จัดแสดง และมุมพูดคุยให้อยู่ในบรรยากาศการศึกษาที่สงบ",
        highlight: "จัดพื้นที่เรียนรู้ให้เข้าใจง่าย มีมุมอ่าน มุมพูดคุย และพื้นที่แสดงข้อมูลที่ใช้งานต่อเนื่องกัน"
      },
      "samsung-shop": {
        summary: "งานออกแบบประสบการณ์ร้านค้า เน้นการจัดแสดงสินค้า แสง เส้นทางลูกค้า และภาพลักษณ์ของแบรนด์",
        highlight: "ออกแบบพื้นที่ขายให้สินค้าดูเด่น ลูกค้าเดินชมได้สะดวก และสื่อภาพลักษณ์แบรนด์ได้ชัดเจน"
      },
      "little-garden": {
        summary: "แนวคิดร้านขนาดเล็กที่ใช้บรรยากาศสวนสดใส เพื่อให้ลูกค้าเข้าถึงง่ายและรู้สึกเป็นกันเอง",
        highlight: "ออกแบบร้านขนาดเล็กให้ดูสดใส เข้าถึงง่าย และใช้โทนสวนช่วยให้พื้นที่รู้สึกเป็นกันเอง"
      },
      "hotel": {
        summary: "งานออกแบบโรงแรมที่รวมพื้นที่ห้องพัก ร้านอาหาร สปา เลานจ์ และฟิตเนสไว้ในภาพรวมเดียวกัน",
        highlight: "วางงานโรงแรมให้แต่ละฟังก์ชันมีเอกลักษณ์ แต่ยังเชื่อมกันด้วยบรรยากาศที่สงบและดูพรีเมียม"
      },
      "zen-japanese-restaurant": {
        summary: "งานออกแบบร้านอาหารญี่ปุ่นและงานพรีเซนต์แนว Zen ที่รวมบรรยากาศการทานอาหารกับวัสดุโทนอุ่น",
        highlight: "ออกแบบร้านอาหารญี่ปุ่นให้เรียบ สงบ และใช้วัสดุอบอุ่นเพื่อสร้างจังหวะการนั่งทานที่ผ่อนคลาย"
      },
      "one-bangkok-popup": {
        summary: "งานออกแบบ ONE BANGKOK และป๊อปอัปช็อปที่เน้นการบริการพื้นที่กะทัดรัดและภาพจำของหน้าร้าน",
        highlight: "ออกแบบป๊อปอัปช็อปให้จดจำง่าย ใช้พื้นที่กระชับ และทำให้หน้าร้านดึงดูดสายตาในเวลาเร็ว"
      },
      "office-sukhumvit31": {
        summary: "งานวางผังสำนักงานร่วมและสำนักงานส่วนตัวที่สุขุมวิท 31 โดยบาลานซ์ reception ห้องประชุม และพื้นที่ทำงานให้เรียบร้อย",
        highlight: "จัดลำดับพื้นที่ตั้งแต่ reception ถึง private office ให้ดูเรียบร้อย ทำงานสะดวก และรองรับการประชุมได้จริง"
      },
      "ramen-sukhumvit33": {
        summary: "งานออกแบบร้านราเมนที่ใช้พื้นที่กะทัดรัด จัดแสงโทนอุ่น และทำเส้นทางลูกค้าให้ชัดเจน",
        highlight: "ออกแบบร้านราเมนให้ใช้พื้นที่คุ้มค่า ทางเดินชัด และสร้างบรรยากาศอบอุ่นสำหรับการทานอาหารเร็ว"
      },
      "chikura-hanoi": {
        summary: "งานออกแบบร้าน Chikura hanoi ที่เน้น identity ของหน้าร้าน การวาง counter และบรรยากาศที่นั่งภายใน",
        highlight: "จัดภาพให้เริ่มจากหน้าร้านที่เห็น identity ชัด แล้วต่อด้วย facade, counter และมุมที่นั่งภายใน เพื่อเล่า flow ของร้านให้ดูต่อเนื่อง"
      },
      "tong-lor-bar": {
        summary: "งานออกแบบบาร์ขนาดกะทัดรัดย่านทองหล่อ เน้นบรรยากาศเลานจ์โทนเข้ม งานไฟ และประสบการณ์บริเวณ counter",
        highlight: "จัดภาพให้เริ่มจากมุม counter ที่เห็นบรรยากาศชัด แล้วต่อด้วยงานไฟ ชั้นวาง และมุมที่นั่ง เพื่อให้เห็น character ของบาร์ครบขึ้น"
      },
      "rental-house": {
        summary: "งานภาพออกแบบภายในบ้านเช่าที่เน้นบรรยากาศอบอุ่น ผังห้องใช้งานจริง และวัสดุที่ดูแลง่าย",
        highlight: "ออกแบบบ้านเช่าให้ดูอบอุ่น ดูแลง่าย และมีฟังก์ชันที่เหมาะกับการอยู่อาศัยจริง"
      },
      "condo-sukhumvit33": {
        summary: "งานออกแบบภายในคอนโดกรุงเทพฯ ด้วยรายละเอียดโมเดิร์นนุ่มนวลและพื้นที่อยู่อาศัยที่ใช้งานได้จริง",
        highlight: "เน้นพื้นที่เก็บของ การใช้งานประจำวัน และรายละเอียดที่ทำให้คอนโดเมืองดูอบอุ่นแต่ยังดูแลง่าย"
      },
      "condo-sukhumvit24": {
        summary: "แนวคิดคอนโดเมืองขนาดกะทัดรัดที่เน้นที่เก็บของ งานวัสดุโทนสงบ และฟังก์ชันการอยู่อาศัยประจำวัน",
        highlight: "ออกแบบคอนโดขนาดกะทัดรัดให้ใช้พื้นที่ได้คล่อง มีที่เก็บของแนบเนียน และบรรยากาศสงบ"
      },
      "aluminium-profile": {
        summary: "งานออกแบบเฟอร์นิเจอร์และภาพ retail จาก aluminum profile ที่เน้นรายละเอียดสินค้าและวัสดุ",
        highlight: "พัฒนาเฟอร์นิเจอร์และงาน display จาก aluminum profile ให้เห็นเส้นสาย วัสดุ และรายละเอียดการประกอบชัดเจน"
      },
      "ai-render": {
        summary: "งานทดลองภาพด้วย AI สำหรับสำรวจบรรยากาศ Airbnb และแนวทางภาพรวมของงานภายใน",
        highlight: "ใช้ AI ช่วยสำรวจ mood ของพื้นที่อย่างรวดเร็ว เพื่อหาแนวทางภาพรวมก่อนพัฒนาแบบละเอียด"
      },
      "logo-design": {
        summary: "งานสำรวจโลโก้และภาพลักษณ์แบรนด์สำหรับใช้ในการนำเสนอและการสื่อสาร",
        highlight: "ออกแบบโลโก้และภาพลักษณ์ให้จดจำง่าย ใช้ต่อในงานนำเสนอและการสื่อสารแบรนด์ได้ชัดเจน"
      }
    }
  };
  const projectText = (project, field) => (
    projectTranslations[getLanguage()]?.[project.id]?.[field] || project[field] || ""
  );

  function projectUrl(id) {
    return `project.html?id=${encodeURIComponent(id)}`;
  }

  function setupLanguage() {
    document.documentElement.lang = getLanguage();
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (key) element.textContent = t(key);
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.includes("profile")) link.textContent = t("profile");
      if (href.includes("projects.html") || href.includes("#work")) link.textContent = t("work");
      if (href.includes("process")) link.textContent = t("process");
      if (href.includes("experience")) link.textContent = t("experience");
      if (href.includes("contact")) link.textContent = t("contact");
    });

    document.querySelectorAll(".nav-cta").forEach((link) => {
      const href = link.getAttribute("href") || "";
      link.textContent = href.includes("projects.html") ? t("allProjects") : t("home");
    });

    const portfolioHero = document.querySelector(".portfolio-hero");
    if (portfolioHero && document.getElementById("portfolioGrid")) {
      const eyebrow = portfolioHero.querySelector(".eyebrow");
      const heading = portfolioHero.querySelector("h1");
      const copy = portfolioHero.querySelector("p:not(.eyebrow)");
      if (eyebrow) eyebrow.textContent = t("portfolioIndex");
      if (heading) heading.textContent = t("portfolioHeroTitle");
      if (copy) copy.textContent = t("portfolioHeroText");
    }

    const allFilter = document.querySelector('.filter-chip[data-filter="all"]');
    if (allFilter) allFilter.textContent = t("all");
    document.querySelectorAll(".filter-chip[data-filter]").forEach((button) => {
      if (button.dataset.filter !== "all") button.textContent = label("category", button.dataset.filter);
    });

    document.querySelectorAll(".site-header").forEach((header) => {
      if (header.querySelector("[data-language-toggle]")) return;
      const button = document.createElement("button");
      button.className = "language-toggle";
      button.type = "button";
      button.dataset.languageToggle = "";
      button.setAttribute("aria-label", "Toggle language");
      button.textContent = getLanguage() === "en" ? "TH" : "EN";
      button.addEventListener("click", () => {
        localStorage.setItem("portfolioLanguage", getLanguage() === "en" ? "th" : "en");
        window.location.reload();
      });
      header.appendChild(button);
    });

    const pdfPage = document.querySelector(".pdf-listing");
    if (pdfPage) {
      const hero = document.querySelector(".portfolio-hero");
      const eyebrow = hero?.querySelector(".eyebrow");
      const heading = hero?.querySelector("h1");
      const intro = hero?.querySelector("p:not(.eyebrow)");
      const heroLinks = hero?.querySelectorAll(".hero-actions a") || [];
      const sectionHeading = pdfPage.querySelector(".section-heading h2");
      if (eyebrow) eyebrow.textContent = t("pdfDocuments");
      if (heading) heading.textContent = t("pdfPageTitle");
      if (intro) intro.textContent = t("pdfPageText");
      if (heroLinks[0]) heroLinks[0].textContent = t("pdfPageBack");
      if (heroLinks[1]) heroLinks[1].textContent = t("pdfPageAll");
      if (sectionHeading) sectionHeading.textContent = t("pdfPageOpen");
    }
  }

  function setupHeader() {
    const header = document.querySelector("[data-header]");
    const toggle = document.querySelector("[data-menu-toggle]");
    const nav = document.querySelector("[data-nav]");

    if (header && !header.classList.contains("solid")) {
      const updateHeader = () => {
        header.classList.toggle("solid", window.scrollY > 24);
      };
      updateHeader();
      window.addEventListener("scroll", updateHeader, { passive: true });
    }

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        toggle.classList.toggle("open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
      });

      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          nav.classList.remove("open");
          toggle.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function renderCardThumb(project) {
    const images = project.cardImages?.length ? project.cardImages : [project.cover];
    if (images.length === 1) {
      return `
        <div class="thumb single">
          <img src="${images[0]}" alt="${project.title}" loading="lazy">
        </div>
      `;
    }

    return `
      <div class="thumb collage collage-${Math.min(images.length, 3)}">
        ${images.slice(0, 3).map((image, index) => `
          <img src="${image}" alt="${project.title} preview ${index + 1}" loading="lazy">
        `).join("")}
      </div>
    `;
  }

  function renderPortfolioGrid() {
    const grid = document.getElementById("portfolioGrid");
    if (!grid) return;

    grid.innerHTML = projects.map((project) => `
      <a class="portfolio-card ${project.cardSize ? `card-${project.cardSize}` : ""}" href="${projectUrl(project.id)}" data-category="${project.category}">
        ${renderCardThumb(project)}
        <div class="card-body">
          <div class="card-meta">
            <span>${label("category", project.category)}</span>
            <small>${project.year || ""}</small>
          </div>
          <h3>${project.title}</h3>
          <p>${project.location} · ${label("role", project.role)}</p>
          <ul class="tag-list">
            ${tags(project.tags).slice(0, 3).map((tag) => `<li>${tag}</li>`).join("")}
          </ul>
        </div>
      </a>
    `).join("");

    const resultCount = document.getElementById("resultCount");
    const cards = Array.from(document.querySelectorAll(".portfolio-card"));

    function setCount(visibleCards, filterLabel) {
      if (!resultCount) return;
      resultCount.textContent = filterLabel === "all" ? t("resultAll", visibleCards) : t("resultFilter", visibleCards, label("category", filterLabel));
    }

    setCount(cards.length, "all");

    document.querySelectorAll(".filter-chip").forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.remove("active"));
        button.classList.add("active");

        let visibleCards = 0;
        cards.forEach((card) => {
          const isVisible = filter === "all" || card.dataset.category === filter;
          card.hidden = !isVisible;
          if (isVisible) visibleCards += 1;
        });
        setCount(visibleCards, filter);
      });
    });
  }

  function renderProjectDetail() {
    const root = document.getElementById("projectRoot");
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || projects[0]?.id;
    const index = Math.max(0, projects.findIndex((item) => item.id === id));
    const project = projects[index] || projects[0];

    if (!project) {
      root.innerHTML = `
        <section class="page-hero compact">
          <p class="eyebrow">Project</p>
          <h1>${t("projectNotFound")}</h1>
          <p>${t("projectNotFoundText")}</p>
          <a class="button primary dark-button" href="projects.html">${t("backToPortfolio")}</a>
        </section>
      `;
      return;
    }

    const nextProject = projects[(index + 1) % projects.length];
    document.title = `${project.title} | Ratipong Kaewjaijong`;

    const galleryGroups = project.galleryGroups?.length
      ? project.galleryGroups
      : [{ title: "", images: project.images || [] }];
    const gallery = galleryGroups.flatMap((group, groupIndex) => [
      group.title ? `<div class="gallery-group-title">${group.title}</div>` : "",
      ...(group.images || []).map((image, imageIndex) => `
        <button class="gallery-tile" type="button" data-image="${image}">
          <img src="${image}" alt="${project.title} image ${groupIndex + 1}-${imageIndex + 1}" loading="lazy">
        </button>
      `)
    ]).filter(Boolean);
    const pdfGroups = project.pdfGroups || [];
    const pdfDocuments = pdfGroups.flatMap((group) => [
      group.title ? `<div class="pdf-group-title">${group.title}</div>` : "",
      ...(group.files || []).map((file) => `
        <a class="pdf-card" href="${file.url}" target="_blank" rel="noopener">
          <span>PDF</span>
          <strong>${file.title}</strong>
          ${file.note ? `<small>${file.note}</small>` : ""}
        </a>
      `)
    ]).filter(Boolean);
    const pdfButtonUrl = project.pdfPageUrl || (pdfDocuments.length ? "#documents" : project.planUrl || "");
    const pdfButtonTarget = project.pdfPageUrl || pdfDocuments.length ? "" : ` target="_blank" rel="noopener"`;

    root.innerHTML = `
      <section class="detail-hero">
        <div class="detail-hero-copy">
          <p class="eyebrow">${label("category", project.category)}</p>
          <h1>${project.title}</h1>
          <p>${projectText(project, "summary")}</p>
          <ul class="tag-list large">
            ${tags(project.tags).map((tag) => `<li>${tag}</li>`).join("")}
          </ul>
          <div class="hero-actions">
            <a class="button primary dark-button" href="projects.html">${t("allProjects")}</a>
            ${pdfButtonUrl ? `<a class="button quiet dark" href="${pdfButtonUrl}"${pdfButtonTarget}>${t("viewPdf")}</a>` : ""}
            <a class="button quiet dark" href="#gallery">${t("viewGallery")}</a>
          </div>
        </div>
        <div class="detail-hero-media">
          <img src="${project.cover}" alt="${project.title}">
        </div>
      </section>

      <section class="project-meta" aria-label="Project information">
        <div>
          <small>${t("location")}</small>
          <strong>${project.location}</strong>
        </div>
        <div>
          <small>${t("role")}</small>
          <strong>${label("role", project.role)}</strong>
        </div>
        <div>
          <small>${t("status")}</small>
          <strong>${label("status", project.status)}</strong>
        </div>
        <div>
          <small>${t("year")}</small>
          <strong>${project.year || "-"}</strong>
        </div>
      </section>

      <section class="project-overview">
        <div>
          <p class="eyebrow">${t("overview")}</p>
          <h2>${t("designFocus")}</h2>
        </div>
        <div>
          <p>${projectText(project, "highlight") || project.summary}</p>
          <dl class="scope-list">
            <div>
              <dt>${t("scope")}</dt>
              <dd>${project.scope || label("role", project.role)}</dd>
            </div>
            <div>
              <dt>${t("category")}</dt>
              <dd>${label("category", project.category)}</dd>
            </div>
          </dl>
        </div>
      </section>

      ${pdfDocuments.length ? `
        <section class="document-section" id="documents">
          <div class="section-heading">
            <div>
              <p class="eyebrow">${t("pdfDocuments")}</p>
              <h2>${t("openProjectFiles")}</h2>
            </div>
          </div>
          <div class="pdf-grid">
            ${pdfDocuments.join("")}
          </div>
        </section>
      ` : ""}

      <section class="gallery-section" id="gallery">
        <div class="section-heading">
          <div>
            <p class="eyebrow">${t("gallery")}</p>
            <h2>${t("projectImages")}</h2>
          </div>
        </div>
        <div class="gallery-grid ${project.galleryFit ? "fit-gallery" : ""}">
          ${gallery.join("")}
        </div>
      </section>

      <section class="project-next">
        <div>
          <p>${t("nextProject")}</p>
          <a href="${projectUrl(nextProject.id)}">${nextProject.title}</a>
        </div>
        <a class="button primary" href="${projectUrl(nextProject.id)}">${t("next")}</a>
      </section>
    `;

    setupLightbox();
  }

  function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const close = document.querySelector(".lightbox-close");
    if (!lightbox || !lightboxImage || !close) return;

    document.querySelectorAll(".gallery-tile").forEach((button) => {
      button.addEventListener("click", () => {
        lightboxImage.src = button.dataset.image;
        lightboxImage.alt = button.querySelector("img")?.alt || "Project image";
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImage.src = transparentPixel;
    }

    close.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLightbox();
    });
  }

  setupLanguage();
  setupHeader();
  renderPortfolioGrid();
  renderProjectDetail();
})();
