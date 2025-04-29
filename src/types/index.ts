export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
}

export interface Media {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  description?: string;
  uploadDate: string;
}

export interface HomeContent {
  welcomeMessage: string;
  scripture: string;
  bannerTitle: string;
  bannerText: string;
}