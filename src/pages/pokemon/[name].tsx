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
} from '@chakra-ui/react';
import { Likes } from '@prisma/client';

import Image from 'next/image';
import TypeBadge from '@/components/TypeBadge/TypeBadge';
import { PokemonDTO } from '@/services/pokemons/types';
import { createSinglePokemonQueryFunction } from '@/services/pokemons/utils';
import { Fragment } from 'react';
import { formatPokemonName } from '@/utils/index';
import LikeButton from '@/features/PokeLike/LikeButton';
import { serverMethods } from '@/services/likes';
import { formatPokemonMeasures } from '@/features/PokemonList/utils';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumb';

type Props = {
  pokemon: PokemonDTO;
  likes: Likes;
};

const PokemonView: NextPage<Props> = ({ pokemon, likes }) => {
  const { mainInfo } = pokemon;

  return (
    <>
      <Head>
        <title>Visualizaçao do {pokemon.name} - Next Pokédex</title>
        <meta name='description' content='Visualização do Pokémon' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container w='container.lg' maxW='85%'>
        <Breadcrumbs
          path={[
            { name: 'Pokémons', link: '/' },
            { name: pokemon.name, link: '', current: true },
          ]}
        />

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
              <Heading
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight='bold'
                whiteSpace='nowrap'
              >
                {pokemon.name}
              </Heading>
              {mainInfo &&
                mainInfo.map(({ title, value }) => (
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
          <Heading
            as='h4'
            fontSize={{ base: 'xl', md: '2xl' }}
            mb={{ base: 4 }}
          >
            Curta este Pokémon
          </Heading>
          <LikeButton
            pokemonName={pokemon.name}
            initialCount={likes?.amount || 0}
          />
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
    </>
  );
};

export default PokemonView;

export const getStaticProps: GetStaticProps = async (context) => {
  const pokemonName = context.params?.name as string;

  const pokemon = await createSinglePokemonQueryFunction(pokemonName)();
  const likes = await serverMethods.findLikesByPokemonName(pokemonName);

  const pokemonMainInfo = (({ height, weight, abilities }) => [
    {
      title: 'Altura',
      value: formatPokemonMeasures(height, 'm'),
    },
    {
      title: 'Peso',
      value: formatPokemonMeasures(weight, 'kg'),
    },
    {
      title: 'Habilidades',
      value: abilities,
    },
  ])(pokemon);

  pokemon.mainInfo = pokemonMainInfo;
  pokemon.name = formatPokemonName(pokemon.name);

  return {
    props: {
      pokemon,
      likes,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
