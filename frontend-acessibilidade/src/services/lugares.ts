import { api } from './api';
import type { Lugar } from '../types/lugar';

export const getLugares = async (): Promise<Lugar[]> => {
  const res = await api.get('/lugares');
  return res.data;
};

export const createLugar = async (data: Partial<Lugar>) => {
  const res = await api.post('/lugares', data);
  return res.data;
};