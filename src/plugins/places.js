import axios from 'axios';

const PROMT_URL = 'https://suggest.aviasales.ru/v2/places.json';
const NEAREST_URL =
  'https://suggest.aviasales.ru/v2/nearest_places.json?locale=ru_RU';

export const places_prompt = async (place) => {
  const req = await axios.get(PROMT_URL, {
    params: {
      locale: 'ru_RU',
      max: 7,
      term: place,
      types: ['city', 'airport'],
    },
  });

  return req.data;
};

export const places_nearest = async () => {
  const req = await axios.get(NEAREST_URL, {
    params: {
      locale: 'ru_RU',
    },
  });

  return req.data[0]?.name;
};
