import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

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
      <Box>Hello Chakra</Box>
    </>
  );
};

export default Home;
