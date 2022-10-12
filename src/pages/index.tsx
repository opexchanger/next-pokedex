import { Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Header from '../components/Header/Header';
import { useAllPokemon } from '../services/pokemons';

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
        pokemons?.results.map((pokemon) => (
          <Heading key={pokemon.name}>{pokemon.name}</Heading>
        ))
      )}
    </>
  );
};

export default Home;
