// Check if database is actually configured (skip connection attempts with placeholder credentials)
const isDbConfigured =
    process.env.DATABASE_URL &&
    !process.env.DATABASE_URL.includes("johndoe") &&
    !process.env.DATABASE_URL.includes("randompassword");

// Lazy-load db only when needed
let _db: any = null;
function getDb() {
    if (_db) return _db;
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        _db = require("./db").db;
    } catch {
        _db = null;
    }
    return _db;
}

// 1. Default website configurations
export const defaultSettings = {
    company_name: "SmartLink Rwanda",
    contact_email: "elysecag@gmail.com",
    contact_phones: "0781899755, 0736691969",
    office_address: "Gisozi, Kigali, Rwanda",
    logo_url: "/assets/logo.png",
    instagram_url: "https://instagram.com/smartlink_rw",
    twitter_url: "https://twitter.com/smartlink_rw",
    linkedin_url: "https://linkedin.com/company/smartlink-rwanda",
    whatsapp_number: "250781899755",
    business_hours: "Monday - Friday: 8:00 AM - 6:00 PM | Saturday: 9:00 AM - 1:00 PM",
    about_overview: "SmartLink Rwanda bridges the technology gap in the digital economy through professional IT services, training, certifications, and consultancy. Our mission is to empower individuals and businesses with innovative technology solutions and high-quality digital services.",
};

// 2. Default Services Data
export const defaultServices = [
    {
        id: "s1",
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
        id: "s2",
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
        id: "s3",
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
        id: "s4",
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
        id: "s5",
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
        id: "s6",
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
        id: "s7",
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

// 3. Default Programs Data
export const defaultPrograms = [
    {
        id: "p1",
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
        id: "p2",
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
        id: "p3",
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
        id: "p4",
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
        id: "p5",
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
        id: "p6",
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
            "Analyze data spreadsheets using Microsoft Excel formulas",
            "Browse the web safely and coordinate company emails"
        ],
    },
];

// 4. Default News Data
export const defaultNews = [
    {
        id: "n1",
        title: "SmartLink Rwanda Launches New Advanced ICT Certification Training Programs",
        slug: "smartlink-rwanda-launches-ict-certification-programs",
        summary: "In a bid to drive IT literacy and foster employment, SmartLink Rwanda opens digital course tracks in Kigali for international certifications.",
        content: "<p>SmartLink Rwanda is proud to announce the official launch of our new Advanced ICT Certification Training Programs. This initiative is designed to bridge the tech talent gap by providing high-quality, practical training in areas such as Software Engineering, CCNA Networking, Graphic Design, and Cybersecurity controls.</p><p>Classes will be held at our modern training center in Gisozi, Kigali, equipped with high-speed internet and standard laboratories. Register today to secure your digital future!</p>",
        featuredImageUrl: "/assets/news-ict-launch.jpg",
        author: "Admin Team",
        createdAt: new Date("2026-07-01"),
    },
    {
        id: "n2",
        title: "The Growing Importance of Custom Business Management Systems for African SMEs",
        slug: "importance-of-business-management-systems-smes",
        summary: "Modern software solutions allow business systems to work smoothly. Find out how custom software cuts operational costs.",
        content: "<p>Many small and medium enterprises (SMEs) in Rwanda rely on disjointed, manual ledger entries and basic spreadsheet records. As businesses expand, these methods lead to transactional friction, lost data, and inventory errors.</p><p>Custom Business Management Systems address these issues by uniting sales logs, customer databases, accounts receivable, and stocks into a unified dashboard, enabling real-time decision-making.</p>",
        featuredImageUrl: "/assets/news-sme-systems.jpg",
        author: "Tech Consultant Support",
        createdAt: new Date("2026-06-25"),
    },
];

// 5. Default Testimonials
export const defaultTestimonials = [
    {
        id: "t1",
        name: "Marie Claire Uwase",
        role: "Operations Director",
        company: "Kigali Logistics Ltd",
        content: "SmartLink Rwanda developed our central ERP software. Our tracking errors dropped by 80% and billing speed doubled. Absolute professionals!",
        rating: 5,
    },
    {
        id: "t2",
        name: "David Nizeyimana",
        role: "Alumni / Software Developer",
        company: "Innovate Hub",
        content: "The Web Development program was intensive and hands-on. Thanks to the mentors, I landed my first front-end role within a month of graduating.",
        rating: 5,
    },
];

// 6. Default Team Members
export const defaultTeam = [
    {
        id: "tm1",
        name: "Elyse Mugisha",
        role: "Managing Director & Founder",
        bio: "Telecom Engineer and Tech consultant with 8+ years experience guiding Enterprise IT digital transformations in East Africa.",
        imageUrl: "/assets/team-elyse.jpg",
        email: "elysecag@gmail.com",
        phone: "0781899755",
    },
    {
        id: "tm2",
        name: "Aline Umutoni",
        role: "Head of Training & Education",
        bio: "Passionate educator specializing in computer science teaching, curriculum design, and tech talent pipeline building.",
        imageUrl: "/assets/team-aline.jpg",
        email: "aline@smartlink.rw",
        phone: "0736691969",
    },
];

// Fetch functions with graceful database fallbacks
export async function getSettings() {
    if (!isDbConfigured) return defaultSettings;
    try {
        const db = getDb();
        if (!db) return defaultSettings;
        const list = await db.setting.findMany();
        if (!list || list.length === 0) return defaultSettings;
        const sObj = { ...defaultSettings };
        list.forEach((item: any) => {
            (sObj as any)[item.key] = item.value;
        });
        return sObj;
    } catch (error) {
        return defaultSettings;
    }
}

export async function getServices() {
    if (!isDbConfigured) return defaultServices;
    try {
        const db = getDb();
        if (!db) return defaultServices;
        const list = await db.service.findMany({ orderBy: { createdAt: "desc" } });
        return list.length > 0 ? list : defaultServices;
    } catch (error) {
        return defaultServices;
    }
}

export async function getPrograms() {
    if (!isDbConfigured) return defaultPrograms;
    try {
        const db = getDb();
        if (!db) return defaultPrograms;
        const list = await db.program.findMany({ orderBy: { createdAt: "desc" } });
        return list.length > 0 ? list : defaultPrograms;
    } catch (error) {
        return defaultPrograms;
    }
}

export async function getNews() {
    if (!isDbConfigured) return defaultNews;
    try {
        const db = getDb();
        if (!db) return defaultNews;
        const list = await db.news.findMany({ orderBy: { createdAt: "desc" } });
        return list.length > 0 ? list : defaultNews;
    } catch (error) {
        return defaultNews;
    }
}

export async function getTeamMembers() {
    if (!isDbConfigured) return defaultTeam;
    try {
        const db = getDb();
        if (!db) return defaultTeam;
        const list = await db.teamMember.findMany({ orderBy: { indexOrder: "asc" } });
        return list.length > 0 ? list : defaultTeam;
    } catch (error) {
        return defaultTeam;
    }
}

export async function getTestimonials() {
    if (!isDbConfigured) return defaultTestimonials;
    try {
        const db = getDb();
        if (!db) return defaultTestimonials;
        const list = await db.testimonial.findMany({ orderBy: { createdAt: "desc" } });
        return list.length > 0 ? list : defaultTestimonials;
    } catch (error) {
        return defaultTestimonials;
    }
}

export async function getGallery() {
    if (!isDbConfigured) return [];
    try {
        const db = getDb();
        if (!db) return [];
        return await db.gallery.findMany({ orderBy: { createdAt: "desc" } });
    } catch (error) {
        return [];
    }
}
