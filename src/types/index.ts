export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  isApproved: boolean;
  isAdmin?: boolean;
  partitionKey?: string;
  rowKey?: string;
}

export interface MemberRegistration {
  name: string;
  email: string;
  phone: string;
  address: string;
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
  eventId?: string;
}

export interface MediaEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  createdDate: string;
  partitionKey?: string;
  rowKey?: string;
}

export interface MediaEventWithItems extends MediaEvent {
  items: Media[];
}

export interface AuthState {
  isAuthenticated: boolean;
  member: Member | null;
  isLoading: boolean;
}

export interface AdminStats {
  totalMembers: number;
  approvedMembers: number;
  pendingMembers: number;
  totalMediaEvents: number;
  totalMediaItems: number;
}

export interface HomeContent {
  welcomeMessage: string;
  scripture: string;
  bannerTitle: string;
  bannerText: string;
}