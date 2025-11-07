export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  media: string;
  images: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  submittedAt: Date;
  source: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: Date;
  source: string;
}
