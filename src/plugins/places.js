import axios from 'axios';

const URL = 'https://suggest.aviasales.ru/v2/places.json';

export default async (place) => {
  const req = await axios.get(URL, {
    params: {
      locale: 'ru_RU',
      max: 7,
      term: place,
      types: ['city', 'airport'],
    },
  });

  return req.data;
};
