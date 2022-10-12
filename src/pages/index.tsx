import Head from 'next/head';
import type { NextPage } from 'next';
import { SimpleGrid } from '@chakra-ui/react';

import Card from '@/components/Card/Card';
import Header from '@/components/Header/Header';
import { useAllPokemon } from '@/services/pokemons';

const Home: NextPage = () => {
  const {
    data: pokemons,
    isLoading,
    isError,
  } = useAllPokemon(1, {
    staleTime: Infinity,
  });

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
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>Error...</h2>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: '30px', md: '40px', lg: '50px' }}
          py={{ md: 10 }}
        >
          {pokemons?.results.map((pokemon) => (
            <Card key={pokemon.name} pokemonName={pokemon.name} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default Home;
