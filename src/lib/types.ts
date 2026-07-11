export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  benefits: string[];
  process: string[];
  features: string[];
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: string;
  requirements: string[];
  learningOutcomes: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  featuredImageUrl?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  email: string;
  phone: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface Settings {
  company_name: string;
  contact_email: string;
  contact_phones: string;
  office_address: string;
  logo_url: string;
  instagram_url: string;
  twitter_url: string;
  linkedin_url: string;
  whatsapp_number: string;
  business_hours: string;
  about_overview: string;
}
