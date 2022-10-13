import Head from 'next/head';
import type { NextPage } from 'next';
import { Box, Container, Heading, Text } from '@chakra-ui/react';

import Header from '@/components/Header/Header';
import PaginationProvider from '@/contexts/pagination';
import { PokemonList } from '@/features/PokemonList';

const Home: NextPage = () => {
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
      <Box as='main'>
        <Container maxW='container.lg' py={{ base: 4, md: 6 }}>
          <Heading textAlign='center' mb={{ base: 8, md: 4 }}>
            Pokédex
          </Heading>
          <Text textAlign='center'>
            Clique nos Pokémons para ver mais detalhes
          </Text>
        </Container>
        <PaginationProvider>
          <PokemonList />
        </PaginationProvider>
      </Box>
    </>
  );
};

export default Home;
