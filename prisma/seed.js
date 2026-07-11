const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Generate Admin password hash
  const adminPasswordHash = await bcrypt.hash("Password@123", 10);
  const studentPasswordHash = await bcrypt.hash("Student@123", 10);

  // 1. Create default Users
  const admin = await prisma.user.upsert({
    where: { email: "elysecag@gmail.com" },
    update: {},
    create: {
      email: "elysecag@gmail.com",
      name: "SmartLink Admin",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  const studentUser = await prisma.user.upsert({
    where: { email: "student@smartlink.rw" },
    update: {},
    create: {
      email: "student@smartlink.rw",
      name: "Jean Paul",
      passwordHash: studentPasswordHash,
      role: "STUDENT",
    },
  });

  // Create Student profile
  await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      fullName: "Jean Paul",
      gender: "Male",
      dob: new Date("2000-01-01"),
      phone: "0781899755",
      address: "Kicukiro, Kigali",
      passportPhoto: "/assets/student-placeholder.png",
      isApproved: true,
    },
  });

  console.log("Users and Students seeded.");

  // 2. Create Services
  const servicesData = [
    {
      name: "Website Design & Development",
      slug: "website-design-development",
      description: "Build premium, modern, responsive, and secure websites tailored to accelerate your organization's digital growth.",
      benefits: [
        "Fully responsive design for mobile, tablet, and desktop.",
        "SEO optimized to attract organic search traffic.",
        "Interactive animations and modern design layouts.",
        "Easy content management options."
      ],
      process: [
        "Discovery & Wireframing",
        "UI/UX Designing",
        "Next.js/React Coding & API Integration",
        "Quality Assurance & Deployment"
      ],
      features: [
        "Headless CMS integration option",
        "Ultra-fast loading speed and core web vitals optimization",
        "Contact form and lead tracking capabilities",
        "Dark/Light theme toggle"
      ],
    },
    {
      name: "Custom Business Management Systems",
      slug: "custom-business-management-systems",
      description: "Tailor-made software solutions to automate your business operations, manage data, and streamline operations.",
      benefits: [
        "Reduce operational overhead and human errors.",
        "Centralized reporting and analytics dashboard.",
        "Scalable database architecture.",
        "Role-based action authorization."
      ],
      process: [
        "Business Process Analysis",
        "Schema Design & Prototyping",
        "Full-stack Web Portal Coding",
        "System Migration & Personnel Training"
      ],
      features: [
        "Interactive inventory, invoice, and HR modules",
        "Automated PDF export layouts",
        "Multiple user roles and permissions",
        "API integrations for mobile money payments"
      ],
    },
    {
      name: "Web Hosting",
      slug: "web-hosting",
      description: "High-performance, secure, and cloud-hosted servers with solid-state storage and 99.9% uptime uptime.",
      benefits: [
        "Fast server response times for local visitor demographics.",
        "Included SSL Certificates automatically renewed.",
        "Daily backup routines.",
        "Spam-protected email routing."
      ],
      process: [
        "Server Resource Assessment",
        "Domain Configuration & SSL Binding",
        "Asset Upload & Data Migration",
        "Uptime Monitoring Activation"
      ],
      features: [
        "cPanel or cloud control panels",
        "DDoS protection safeguards",
        "Git deploy hooks support",
        "Scalable bandwidth allocations"
      ],
    },
    {
      name: "Professional Business Email Setup",
      slug: "professional-business-email-setup",
      description: "Build company trust and domain authority with dedicated email addresses mapped to your commercial website.",
      benefits: [
        "Increase sales inquiry conversion by looking corporate.",
        "Access mail on smart mobile devices instantly.",
        "Prevent spam and phishing impersonation.",
        "Ample workspace storage volumes."
      ],
      process: [
        "Domain ownership validation",
        "MX, SPF, DKIM, DMARC record updates",
        "User account creation & client setups",
        "Security audit checks"
      ],
      features: [
        "Google Workspace or Microsoft 365 configuration support",
        "Robust junk filtering triggers",
        "Collaborative shared calendars & calendars sync",
        "Out of office auto-responses"
      ],
    },
    {
      name: "Computer & Laptop Repair",
      slug: "computer-laptop-repair",
      description: "Hardware diagnostics, motherboard repairs, system cleaning, screen replacements, and operational optimizations.",
      benefits: [
        "Extend the service lifespan of office hardware.",
        "Perform diagnostics using advanced tools.",
        "Utilize high-quality original components.",
        "Fast turnaround times."
      ],
      process: [
        "Visual inspection & symptom verification",
        "Component diagnostic mapping",
        "Part replacement or micro-soldering",
        "Stress testing & quality checklist validation"
      ],
      features: [
        "OS reinstalls & clean configurations",
        "Storage drive upgrades (HDD to SSD)",
        "Internal thermal paste replacements",
        "Data backup and restoration"
      ],
    },
    {
      name: "IT Support & Consulting",
      slug: "it-support-consulting",
      description: "Incorporate expert engineering direction for network architecture, cybersecurity controls, and on-premise IT workflows.",
      benefits: [
        "Resolve server offline blocks quickly.",
        "Formulate clear technology blueprints for scaling.",
        "Comply with local digital protection directives.",
        "Train workers on internet security practices."
      ],
      process: [
        "Infrastructure Audit",
        "Vulnerability Mapping & Report generation",
        "Remediation Implementation",
        "Weekly support reviews"
      ],
      features: [
        "Remote support ticketing connections",
        "Router and firewall configuration schemas",
        "Disaster recovery preparation blueprints",
        "IT Policy documentation"
      ],
    },
    {
      name: "Tech Accessories Sales",
      slug: "tech-accessories-sales",
      description: "Authorized supplier of quality computer monitors, peripherals, power configurations, memory chips, and network accessories.",
      benefits: [
        "Source accessories directly from authentic suppliers.",
        "Guaranteed warranty periods.",
        "Free local Kigali delivery options.",
        "Competitive bulk purchase pricing structures."
      ],
      process: [
        "Requirements consultation",
        "Model quotation matching",
        "Delivery setup & device verification",
        "Warranty documentation filing"
      ],
      features: [
        "HDMI adapters, USB docks, and adapters",
        "Mechanical and ergonomic peripherals",
        "WiFi expansion routers and cables",
        "Laptop chargers and backup power supplies"
      ],
    },
  ];

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  console.log("Services seeded.");

  // 3. Create Programs
  const programsData = [
    {
      name: "Programming",
      slug: "programming",
      description: "Master modern software engineering using Javascript, Typescript, Next.js, and Node.js. Build fully interactive applications.",
      duration: "6 Months",
      requirements: [
        "Laptop with minimum 4GB RAM",
        "Basic computer literacy",
        "Passionate to learn coding patterns"
      ],
      learningOutcomes: [
        "Build full-stack Next.js applications",
        "Design robust database schemas and write APIs",
        "Deploy sites to production platforms using Vercel/Docker",
        "Apply standard software architecture designs"
      ],
    },
    {
      name: "Networking",
      slug: "networking",
      description: "Configure routers, switches, and local area networks. Prepare for Cisco CCNA and global professional network certifications.",
      duration: "3 Months",
      requirements: [
        "Basic understanding of PC hardware",
        "Interest in network configurations"
      ],
      learningOutcomes: [
        "Understand TCP/IP and OSI network stacks",
        "Configure Cisco networking equipment in Packet Tracer and live labs",
        "Incorporate Subnetting strategies into corporate networks",
        "Design redundant VLAN and static/dynamic routing plans"
      ],
    },
    {
      name: "Cyber Security",
      slug: "cyber-security",
      description: "Study network defense vulnerabilities, perform security audits, and discover ethical penetration testing models.",
      duration: "4 Months",
      requirements: [
        "Basic knowledge of networking concepts",
        "Familiarity with command line/Linux commands is helpful"
      ],
      learningOutcomes: [
        "Identify system security vulnerabilities",
        "Perform network traffic audits using Wireshark",
        "Master Kali Linux tools for ethical exploration",
        "Formulate defensive architecture recommendations"
      ],
    },
    {
      name: "Graphic Design",
      slug: "graphic-design",
      description: "Learn visual storytelling and creative branding layouts using Adobe Photoshop, Illustrator, and Figma.",
      duration: "2 Months",
      requirements: [
        "Computer with drawing capabilities",
        "Creative thinking interest"
      ],
      learningOutcomes: [
        "Create modern vector graphics, logos, and identity assets",
        "Design professional layouts for digital print and social promos",
        "Understand UI/UX visual layout constructs in Figma",
        "Construct graphic design portfolios"
      ],
    },
    {
      name: "Digital Marketing",
      slug: "digital-marketing",
      description: "Grow local brands by leveraging SEO, organic social media channels, paid campaigns, and analytical tools.",
      duration: "2 Months",
      requirements: [
        "General internet browsing mastery",
        "Laptop for campaigns setup"
      ],
      learningOutcomes: [
        "Formulate conversion-funnel optimization blueprints",
        "Understand Google Ads and Facebook Business campaign configurations",
        "Track user conversions using Google Analytics",
        "Incorporate web copy targeting keywords"
      ],
    },
    {
      name: "Computer Basics",
      slug: "computer-basics",
      description: "Bridge the technology gap with core computer navigation, typing, file systems, and Microsoft Office (Word, Excel, PPT).",
      duration: "1 Month",
      requirements: [
        "No prior experience needed"
      ],
      learningOutcomes: [
        "Navigate operating systems confidently",
        "Write business reports using Microsoft Word",
        "Analyze basic data spreadsheets using Microsoft Excel formulas",
        "Browse the web safely and coordinate company emails"
      ],
    },
  ];

  for (const p of programsData) {
    const upsertedProgram = await prisma.program.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });

    // Create a mock Course and Lessons inside each Program for E-Learning demonstration
    const course = await prisma.course.create({
      data: {
        name: `${p.name} Basics`,
        description: `Introductory course for the ${p.name} program.`,
        programId: upsertedProgram.id,
      },
    });

    const lesson1 = await prisma.lesson.create({
      data: {
        title: "Introduction & Fundamentals",
        content: `Welcome to the ${p.name} program. This lesson will explore the foundational guidelines and outline of this domain.`,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // YouTube embed link
        materialsUrl: "#",
        order: 1,
        courseId: course.id,
      },
    });

    const lesson2 = await prisma.lesson.create({
      data: {
        title: "Practical Exercises & Core Concepts",
        content: `Let's dive deeper into ${p.name}. We will cover the primary methods, syntax, and workflows commonly used in the Industry.`,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        materialsUrl: "#",
        order: 2,
        courseId: course.id,
      },
    });

    // Seed a mini quiz
    const quiz1 = await prisma.quiz.create({
      data: {
        question: `What is the primary focus of ${p.name}?`,
        options: ["Option A: Basic definitions", "Option B: Visual styling", "Option C: The core system practices", "Option D: None of the entries"],
        correctAnswer: "Option C: The core system practices",
        lessonId: lesson1.id,
      },
    });

    const quiz2 = await prisma.quiz.create({
      data: {
        question: `Which of the following is true about ${p.name}?`,
        options: ["It requires zero configuration", "It is rapidly evolving and important in the digital economy", "It is obsolete", "It is only used locally"],
        correctAnswer: "It is rapidly evolving and important in the digital economy",
        lessonId: lesson2.id,
      },
    });
  }

  console.log("Programs, Courses, Lessons, and Quizzes seeded.");

  // 4. Create default News
  const newsData = [
    {
      title: "SmartLink Rwanda Launches New Advanced ICT Certification Training Programs",
      slug: "smartlink-rwanda-launches-ict-certification-programs",
      summary: "In a bid to drive IT literacy and foster employment, SmartLink Rwanda opens digital course tracks in Kigali for international certifications.",
      content: "<p>SmartLink Rwanda is proud to announce the official launch of our new Advanced ICT Certification Training Programs. This initiative is designed to bridge the tech talent gap by providing high-quality, practical training in areas such as Software Engineering, CCNA Networking, Graphic Design, and Cybersecurity controls.</p><p>Classes will be held at our modern training center in Gisozi, Kigali, equipped with high-speed internet and standard laboratories. Register today to secure your digital future!</p>",
      featuredImageUrl: "/assets/news-ict-launch.jpg",
      author: "Admin Team",
    },
    {
      title: "The Growing Importance of Custom Business Management Systems for African SMEs",
      slug: "importance-of-business-management-systems-smes",
      summary: "Modern software solutions allow business systems to work smoothly. Find out how custom software cuts operational costs.",
      content: "<p>Many small and medium enterprises (SMEs) in Rwanda rely on disjointed, manual ledger entries and basic spreadsheet records. As businesses expand, these methods lead to transactional friction, lost data, and inventory errors.</p><p>Custom Business Management Systems address these issues by uniting sales logs, customer databases, accounts receivable, and stocks into a unified dashboard, enabling real-time decision-making.</p>",
      featuredImageUrl: "/assets/news-sme-systems.jpg",
      author: "Tech Consultant Support",
    },
  ];

  for (const n of newsData) {
    await prisma.news.upsert({
      where: { slug: n.slug },
      update: n,
      create: n,
    });
  }

  console.log("News articles seeded.");

  // 5. Create default Testimonials
  const testimonialsData = [
    {
      name: "Marie Claire Uwase",
      role: "Operations Director",
      company: "Kigali Logistics Ltd",
      content: "SmartLink Rwanda developed our central ERP software. Our tracking errors dropped by 80% and billing speed doubled. Absolute professionals!",
      rating: 5,
    },
    {
      name: "David Nizeyimana",
      role: "Alumni / Software Developer",
      company: "Innovate Hub",
      content: "The Web Development program was intensive and hands-on. Thanks to the mentors, I landed my first front-end role within a month of graduating.",
      rating: 5,
    },
  ];

  for (const t of testimonialsData) {
    await prisma.testimonial.create({
      data: t,
    });
  }

  console.log("Testimonials seeded.");

  // 6. Create default Team Members
  const teamData = [
    {
      name: "Elyse Mugisha",
      role: "Managing Director & Founder",
      bio: "Telecom Engineer and Tech consultant with 8+ years experience guiding Enterprise IT digital transformations in East Africa.",
      imageUrl: "/assets/team-elyse.jpg",
      email: "elysecag@gmail.com",
      phone: "0781899755",
      indexOrder: 1,
    },
    {
      name: "Aline Umutoni",
      role: "Head of Training & Education",
      bio: "Passionate educator specializing in computer science teaching, curriculum design, and tech talent pipeline building.",
      imageUrl: "/assets/team-aline.jpg",
      email: "aline@smartlink.rw",
      phone: "0736691969",
      indexOrder: 2,
    },
  ];

  for (const t of teamData) {
    await prisma.teamMember.create({
      data: t,
    });
  }

  console.log("Team members seeded.");

  // 7. Create default Settings
  const settingsData = [
    { key: "company_name", value: "SmartLink Rwanda", description: "Official corporate company trade name" },
    { key: "contact_email", value: "elysecag@gmail.com", description: "Primary contact email address" },
    { key: "contact_phones", value: "0781899755, 0736691969", description: "Primary phone numbers (comma-separated)" },
    { key: "office_address", value: "Gisozi, Kigali, Rwanda", description: "Physical head office address location" },
    { key: "logo_url", value: "/assets/logo.png", description: "Default relative file path to the branding logo asset" },
    { key: "instagram_url", value: "https://instagram.com/smartlink_rw", description: "Social URL link" },
    { key: "twitter_url", value: "https://twitter.com/smartlink_rw", description: "Social URL link" },
    { key: "linkedin_url", value: "https://linkedin.com/company/smartlink-rwanda", description: "Social URL link" },
    { key: "whatsapp_number", value: "250781899755", description: "WhatsApp number in international format" },
    { key: "business_hours", value: "Monday - Friday: 8:00 AM - 6:00 PM | Saturday: 9:00 AM - 1:00 PM", description: "Business hours block text" },
    { key: "about_overview", value: "SmartLink Rwanda bridges the technology gap in the digital economy through professional IT services, training, certifications, and consultancy. Our mission is to empower individuals and businesses with innovative technology solutions and high-quality digital services.", description: "Brief overview summary of what the company does" },
  ];

  for (const st of settingsData) {
    await prisma.setting.upsert({
      where: { key: st.key },
      update: st,
      create: st,
    });
  }

  console.log("Global Settings seeded.");
  console.log("Database seeding completed successfully! 🎉");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
