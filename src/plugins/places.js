import { ref, watch } from 'vue';
import axios from 'axios';
import { debounce } from 'throttle-debounce';

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

export const usePlaces = (place, key) => {
  const prompt = ref([]);

  const load = () => {
    place[key]
      ? places_prompt(place[key]).then((r) => (prompt.value = r))
      : (prompt.value = []);
  };

  watch(place, debounce(150, load));

  return prompt;
};
