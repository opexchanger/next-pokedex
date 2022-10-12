export const capitalizeWord = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const eliminateDash = (word: string) => word.replace('-', ' ');

export const capitalizeEveryWord = (str: string) =>
  str
    .split(' ')
    .map((word) => capitalizeWord(word))
    .join(' ');

export const formatPokemonName = (pokemonName: string) => {
  let formattedName = eliminateDash(pokemonName);
  formattedName = capitalizeEveryWord(formattedName);

  return formattedName;
};
