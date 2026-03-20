import axios from 'axios';
import type { SettlementResponse } from 'types';

const MULTI_LOCATION_BASE_URL = import.meta.env.VITE_MULTI_LOCATION_BASE_URL;

const CITY_TYPE = 'city';
const RESPONSE_FORMAT = 'jsonv2';
const LIMIT = 5;

export const getSettlements = (query: string) =>
  axios
    .get<SettlementResponse[]>(MULTI_LOCATION_BASE_URL, {
      params: { q: query, type: CITY_TYPE, format: RESPONSE_FORMAT, limit: LIMIT }
    })
    .then((response) => response.data);
