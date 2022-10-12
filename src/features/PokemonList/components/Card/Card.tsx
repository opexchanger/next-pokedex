import { Box, Link, Text, Heading, HStack } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useOnePokemon } from '@/services/pokemons';
import { formatPokemonName } from '@/utils/index';
import TypeBadge from './TypeBadge';
import { formatPokemonNumber } from '../../utils';

type CardProps = {
  pokemonName: string;
};

const Card = ({ pokemonName }: CardProps) => {
  const { data: pokemon, isLoading, isError } = useOnePokemon(pokemonName);

  if (isLoading) return <Box>Carregando o Pokemon</Box>;

  if (isError) return <Box>Erro carregando o Pokemon</Box>;

  // console.log('pokemon :>> ', pokemon);

  return (
    <NextLink href={`/pokemons/${pokemon.name}`}>
      <Link _hover={{ textDecoration: 'none' }}>
        <Box
          maxW='20rem'
          width='100%'
          bg='white'
          _dark={{
            bg: 'gray.800',
          }}
          shadow='lg'
          rounded='lg'
          overflow='hidden'
          mx='auto'
          data-group
        >
          <Box
            position='relative'
            h={{ base: '200', lg: '250' }}
            background='orange.200'
            transition='background .3s'
            _groupHover={{
              background: 'red.100',
            }}
          >
            <Box
              data-group
              position='relative'
              h='100%'
              w='100%'
              transition='transform .3s'
              _groupHover={{
                transform: 'scale(1.2)',
              }}
            >
              <Image
                layout='fill'
                objectFit='contain'
                src={
                  pokemon?.sprites?.front_default || '/img/pokemon_no_image.png'
                }
                alt={`Profile Pic do ${pokemon.name}`}
              />
            </Box>
          </Box>

          <Box p={5}>
            <HStack justify='space-between' align='baseline'>
              <Heading
                display='block'
                fontSize='2xl'
                color='gray.800'
                _dark={{
                  color: 'white',
                }}
                fontWeight='bold'
                mb={{ base: 2, md: 3 }}
              >
                {formatPokemonName(pokemon.name)}
              </Heading>
              <Text color='gray.500' fontWeight='500'>
                Nº {formatPokemonNumber(pokemon.id)}
              </Text>
            </HStack>

            <HStack spacing={2}>
              {pokemon.types &&
                pokemon.types.map(({ type }) => {
                  return <TypeBadge key={type.name} type={type.name} />;
                })}
            </HStack>
          </Box>
        </Box>
      </Link>
    </NextLink>
  );
};

export default Card;
