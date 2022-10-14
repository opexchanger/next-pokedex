import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
  Box,
  Container,
  Flex,
  Heading,
  ListItem,
  Progress,
  Stack,
  Text,
  UnorderedList,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';

import Header from '@/components/Header/Header';
import Image from 'next/image';
import TypeBadge from '@/components/TypeBadge/TypeBadge';
import { PokemonDTO } from '@/services/pokemons/types';
import { createSinglePokemonQueryFunction } from '@/services/pokemons/utils';
import { Fragment } from 'react';
import { formatPokemonName } from '@/utils/index';

type Props = {
  pokemon: PokemonDTO;
};

const Home: NextPage<Props> = ({ pokemon }) => {
  const pokemonMainInfo = (({ height, weight, abilities }) => [
    {
      title: 'Altura',
      value: height,
    },
    {
      title: 'Peso',
      value: weight,
    },
    {
      title: 'Habilidades',
      value: abilities,
    },
  ])(pokemon);

  pokemon.name = formatPokemonName(pokemon.name);

  return (
    <>
      <Head>
        <title>Visualizaçao do {pokemon.name} - Next Pokédex</title>
        <meta name='description' content='Visualização do Pokémon' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Box as='main'>
        <Container w='container.lg' maxW='85%'>
          <Breadcrumb
            boxShadow='sm'
            mt={{ base: 4, md: 8 }}
            py={{ base: 2 }}
            pl={{ md: 4 }}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Pokémons</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{pokemon.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Flex
            boxShadow='md'
            my={{ base: 4, md: 8 }}
            mb={{ base: 8 }}
            direction={{ base: 'column', md: 'row' }}
          >
            <Box
              flex={{ md: '50%' }}
              position='relative'
              minHeight={{ base: '200px', md: '300px' }}
            >
              <Image
                src={pokemon.sprites.front}
                layout='fill'
                alt={`${pokemon.name} picture`}
                objectFit='contain'
                objectPosition='center'
              />
            </Box>
            <Flex
              flex={{ base: '90%', md: '50%' }}
              p={{ base: 4, md: 6 }}
              minHeight={{ base: '200px', md: 'auto' }}
            >
              <UnorderedList
                width='90%'
                listStyleType='none'
                m='0'
                display='flex'
                flexDir='column'
                justifyContent='space-around'
              >
                <Text
                  fontSize={{ base: '3xl', md: '5xl' }}
                  fontWeight='bold'
                  whiteSpace='nowrap'
                >
                  {pokemon.name}
                </Text>
                {pokemonMainInfo.map(({ title, value }) => (
                  <ListItem
                    key={title}
                    display='flex'
                    justifyContent='space-between'
                    fontSize={{ md: 'lg' }}
                  >
                    <Text fontWeight='bold'>{title}:</Text>
                    <Text ml='20px'>{value}</Text>
                  </ListItem>
                ))}
              </UnorderedList>
            </Flex>
          </Flex>

          <Flex mb={{ base: 8, md: 12 }} flexDir='column'>
            <Box mb={{ base: 8 }}>
              <Heading
                as='h4'
                fontSize={{ base: 'xl', md: '2xl' }}
                mb={{ base: 4 }}
              >
                Tipo(s)
              </Heading>
              <Stack direction={{ base: 'row' }} align='baseline'>
                {pokemon.types.map((type) => (
                  <TypeBadge
                    key={type}
                    typeName={type}
                    px={{ base: 4, md: 8 }}
                    py={{ base: 2 }}
                  />
                ))}
              </Stack>
            </Box>
            <Box>
              <Heading
                as='h4'
                fontSize={{ base: 'xl', md: '2xl' }}
                mb={{ base: 4 }}
              >
                Status
              </Heading>
              <VStack
                spacing={5}
                boxShadow='0 4px 6px -1px rgba(159, 122, 234, 0.6),0 2px 4px -1px rgba(159, 122, 234, 0.6)'
                p={4}
                pb={8}
                borderRadius='md'
              >
                {pokemon.stats.map(({ stat, base_stat }) => (
                  <Fragment key={stat.name}>
                    <Text
                      alignSelf='start'
                      textTransform='uppercase'
                      fontWeight='bold'
                      fontSize={{ md: 'sm' }}
                    >
                      {stat.name}
                    </Text>
                    <Progress
                      mt={{ md: '2 !important' }}
                      width='100%'
                      colorScheme='green'
                      height='20px'
                      value={base_stat / 2}
                    />
                  </Fragment>
                ))}
              </VStack>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const pokemonName = context.params?.name as string;

  const pokemon = await createSinglePokemonQueryFunction(pokemonName)();

  return {
    props: {
      pokemon,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
