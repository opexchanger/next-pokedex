import { Box, Container, Flex } from '@chakra-ui/react';

import { useAllPokemon } from '@/services/pokemons';
import { Grid, Card, GridLoader } from '@/features/PokemonList';
import { usePagination } from '@/contexts/pagination';
import { Pagination } from '@/features/Pagination';
import { resultsPerPage } from 'src/config';
// import { useEffect } from 'react';

function getTotalPages(totalResults: number, resultsPerPage: number) {
  return Math.ceil(totalResults / resultsPerPage);
}

const PokemonList = () => {
  const { currentPage } = usePagination();

  const {
    data: pokemons,
    isLoading,
    isError,
  } = useAllPokemon(currentPage, {
    staleTime: Infinity,
  });

  const totalResults = pokemons?.count || 15;

  // useEffect(
  //   () => {
  //     if (!totalResults.isDefault && pokemons?.count) {
  //       totalResults.count = pokemons.count
  //     }
  //   },
  //   [pokemons?.count]
  // );

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
          totalPages={getTotalPages(totalResults, resultsPerPage)}
        />
      </Flex>
    </Box>
  );
};

export default PokemonList;
