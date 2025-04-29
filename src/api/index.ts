import axios from 'axios';
import { Member, Event, Media, HomeContent } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://churchplatformapi20250429212228.azurewebsites.net/api',
});

export const getMembers = async (): Promise<Member[]> => {
  const { data } = await api.get('/members');
  return data;
};

export const createMember = async (member: Omit<Member, 'id'>): Promise<Member> => {
  const { data } = await api.post('/members', member);
  return data;
};

export const getEvents = async (): Promise<Event[]> => {
  const { data } = await api.get('/events');
  console.log("data ", data);
  return data;
};

export const createEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
  const { data } = await api.post('/events', event);
  return data;
};

export const getMedia = async (): Promise<Media[]> => {
  const { data } = await api.get('/media');
  return data;
};

export const uploadMedia = async (formData: FormData): Promise<Media> => {
  const { data } = await api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const getHomeContent = async (): Promise<HomeContent> => {
  const { data } = await api.get('/content/homepage-welcome');
  return data;
};

export const updateHomeContent = async (content: HomeContent): Promise<HomeContent> => {
  const { data } = await api.put('/content/homepage-welcome', content);
  return data;
};