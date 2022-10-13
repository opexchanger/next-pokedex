import Head from 'next/head';
import type { NextPage } from 'next';

import Header from '@/components/Header/Header';
import { useAllPokemon } from '@/services/pokemons';
import { Grid, Card, GridLoader } from '@/features/PokemonList';
import { Container, Flex, Heading, Text } from '@chakra-ui/react';
import { Pagination } from '@/features/Pagination';
import { useState } from 'react';
import { resultsPerPage } from 'src/config';

function getTotalPages(totalResults: number, resultsPerPage: number) {
  return Math.ceil(totalResults / resultsPerPage);
}

const Home: NextPage = () => {
  const [activePage, setActivePage] = useState(1);

  const {
    data: pokemons,
    isLoading,
    isError,
  } = useAllPokemon(activePage, {
    staleTime: Infinity,
  });

  const totalResults = pokemons?.count || 15;

  return (
    <>
      <Head>
        <title>Next Pokédex</title>
        <meta
          name='description'
          content='Gerando uma Pokédex em Next.Js para o desafio da Br Media Group'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Container maxW='container.lg' py={{ base: 6, md: 8 }}>
        <Heading textAlign='center' mb={{ base: 8, md: 4 }}>
          Pokédex
        </Heading>
        <Text textAlign='center' mb={{ base: 8, md: 4 }}>
          Clique nos Pokémons para ver mais detalhes
        </Text>
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
          activePage={activePage}
          setActivePage={setActivePage}
          pageNumbersToShow={5}
          totalPages={getTotalPages(totalResults, resultsPerPage)}
        />
      </Flex>
    </>
  );
};

export default Home;
