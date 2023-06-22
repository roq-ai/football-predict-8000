import axios from 'axios';
import queryString from 'query-string';
import { BettorPredictionInterface, BettorPredictionGetQueryInterface } from 'interfaces/bettor-prediction';
import { GetQueryInterface } from '../../interfaces';

export const getBettorPredictions = async (query?: BettorPredictionGetQueryInterface) => {
  const response = await axios.get(`/api/bettor-predictions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBettorPrediction = async (bettorPrediction: BettorPredictionInterface) => {
  const response = await axios.post('/api/bettor-predictions', bettorPrediction);
  return response.data;
};

export const updateBettorPredictionById = async (id: string, bettorPrediction: BettorPredictionInterface) => {
  const response = await axios.put(`/api/bettor-predictions/${id}`, bettorPrediction);
  return response.data;
};

export const getBettorPredictionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/bettor-predictions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBettorPredictionById = async (id: string) => {
  const response = await axios.delete(`/api/bettor-predictions/${id}`);
  return response.data;
};
