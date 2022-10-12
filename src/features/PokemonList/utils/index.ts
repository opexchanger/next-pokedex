import { TypeName } from 'src/services/pokemons/types';

export const getTypeColorScheme = (type: TypeName) => {
  return typeColorsReference[type];
};

export const formatPokemonNumber = (id: number) =>
  id.toString().padStart(3, '0');

const typeColorsReference = {
  normal: { color: 'orange.100', text: 'black' },
  fighting: { color: 'teal.600', text: 'white' },
  flying: { color: 'teal.300', text: 'white' },
  poison: { color: 'purple.700', text: 'white' },
  ground: { color: 'yellow.700', text: 'white' },
  rock: { color: 'gray.500', text: 'white' },
  bug: { color: 'green.700', text: 'white' },
  ghost: { color: 'gray.200', text: 'black' },
  steel: { color: 'gray.400', text: 'black' },
  fire: { color: 'red.500', text: 'white' },
  water: { color: 'blue.400', text: 'white' },
  grass: { color: 'green.500', text: 'white' },
  electric: { color: 'yellow.200', text: 'black' },
  psychic: { color: 'yellow.500', text: 'black' },
  ice: { color: 'blue.100', text: 'black' },
  dragon: { color: 'red.600', text: 'white' },
  dark: { color: 'blackAlpha.900', text: 'white' },
  fairy: { color: 'red.200', text: 'white' },
  unknown: { color: 'blackAlpha.300', text: 'black' },
  shadow: { color: 'teal.800', text: 'white' },
};
