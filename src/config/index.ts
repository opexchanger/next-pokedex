const resultsPerPage = Number(process.env.NEXT_PUBLIC_RESULTS_PER_PAGE) || 15;
const baseApiUrl = process.env.BASE_URL || 'https://pokeapi.co/api/v2/pokemon/';

export { resultsPerPage, baseApiUrl };
