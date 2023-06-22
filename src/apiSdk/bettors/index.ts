import axios from 'axios';
import queryString from 'query-string';
import { BettorInterface, BettorGetQueryInterface } from 'interfaces/bettor';
import { GetQueryInterface } from '../../interfaces';

export const getBettors = async (query?: BettorGetQueryInterface) => {
  const response = await axios.get(`/api/bettors${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBettor = async (bettor: BettorInterface) => {
  const response = await axios.post('/api/bettors', bettor);
  return response.data;
};

export const updateBettorById = async (id: string, bettor: BettorInterface) => {
  const response = await axios.put(`/api/bettors/${id}`, bettor);
  return response.data;
};

export const getBettorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/bettors/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBettorById = async (id: string) => {
  const response = await axios.delete(`/api/bettors/${id}`);
  return response.data;
};
