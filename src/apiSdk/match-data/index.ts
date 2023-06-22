import axios from 'axios';
import queryString from 'query-string';
import { MatchDataInterface, MatchDataGetQueryInterface } from 'interfaces/match-data';
import { GetQueryInterface } from '../../interfaces';

export const getMatchData = async (query?: MatchDataGetQueryInterface) => {
  const response = await axios.get(`/api/match-data${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMatchData = async (matchData: MatchDataInterface) => {
  const response = await axios.post('/api/match-data', matchData);
  return response.data;
};

export const updateMatchDataById = async (id: string, matchData: MatchDataInterface) => {
  const response = await axios.put(`/api/match-data/${id}`, matchData);
  return response.data;
};

export const getMatchDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/match-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMatchDataById = async (id: string) => {
  const response = await axios.delete(`/api/match-data/${id}`);
  return response.data;
};
