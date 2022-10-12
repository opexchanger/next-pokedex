import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import { formatPokemonName } from 'src/utils';

type CardLoaderProps = {
  pokemonName?: string;
};

const CardLoader = ({ pokemonName }: CardLoaderProps) => (
  <>
    <Box
      w='xs'
      bg='white'
      _dark={{
        bg: 'gray.800',
      }}
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      mx='auto'
    >
      <Flex h='200' background='orange.200' align='center' justify='center'>
        <SkeletonCircle size={{ base: '14', md: '20' }} />
      </Flex>
      <Box p={5} textAlign='center'>
        {pokemonName ? (
          <>
            <Text
              display='block'
              fontSize='2xl'
              color='gray.800'
              _dark={{
                color: 'white',
              }}
              fontWeight='bold'
            >
              {formatPokemonName(pokemonName)}
            </Text>
            <SkeletonText noOfLines={2} mt={2} />
          </>
        ) : (
          <SkeletonText noOfLines={3} spacing='4' />
        )}
      </Box>
    </Box>
  </>
);

export default CardLoader;
