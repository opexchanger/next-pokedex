import { Box, Container, Flex } from '@chakra-ui/react';

import { useAllPokemonPaginated } from '@/services/pokemons';
import { Grid, Card, GridLoader } from '@/features/PokemonList';
import { usePagination } from '@/contexts/pagination';
import { Pagination } from '@/features/Pagination';
import { resultsPerPage } from 'src/config';

function getTotalPages(totalResults: number, resultsPerPage: number) {
  return Math.ceil(totalResults / resultsPerPage);
}

const totalResults = {
  isPlaceholder: true,
  count: 15,
};

const PokemonList = () => {
  const { currentPage } = usePagination();

  const {
    data: pokemons,
    isLoading,
    isError,
  } = useAllPokemonPaginated(currentPage, {
    staleTime: Infinity,
  });

  if (pokemons?.count && totalResults.isPlaceholder) {
    totalResults.count = pokemons.count;
    totalResults.isPlaceholder = false;
  }

  return (
    <Box>
      <Container
        maxW='container.lg'
        mb={{ base: 6, md: 10 }}
        py={{ base: 2, md: 4 }}
      >
        {isLoading ? (
          <GridLoader amount={6} />
        ) : isError ? (
          <h2>Error...</h2>
        ) : (
          <Grid>
            {pokemons?.results.map((pokemon) => (
              <Card key={pokemon.name} pokemonName={pokemon.name} />
            ))}
          </Grid>
        )}
      </Container>
      <Flex>
        <Pagination
          pageNumbersToShow={5}
          totalPages={getTotalPages(totalResults.count, resultsPerPage)}
        />
      </Flex>
    </Box>
  );
};

export default PokemonList;
