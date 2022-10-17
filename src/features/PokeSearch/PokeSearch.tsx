import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import useDebounce from 'src/hooks/useDebounce';
import { useAllPokemon } from '@/services/pokemons';
import Link from 'next/link';
import { Pokemons } from '@/services/pokemons/types';
import { formatPokemonName } from '@/utils/index';

type PokeSearchProps = {};

function filterPokemonsNameBasedOnSearchTerm(
  searchTerm: string,
  pokemons: Pokemons | undefined
) {
  if (searchTerm.length >= 3 && pokemons) {
    return pokemons.results.filter(({ name }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  return [];
}

const PokeSearch = ({}: PokeSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOutsideClick({
    ref: wrapperRef,
    handler: () => setShowResults(false),
  });

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);
  const handleFocus = () => {
    if (!enabled) setEnabled(true);
    if (filteredPokemons.length > 0) setShowResults(true);
  };

  const { data: pokemons, isLoading: isLoad } = useAllPokemon({
    enabled: enabled,
    staleTime: Infinity,
  });
  let isLoading = isLoad && enabled;

  const filteredPokemons = filterPokemonsNameBasedOnSearchTerm(
    debouncedSearchTerm,
    pokemons
  );

  useEffect(() => {
    if (
      filteredPokemons.length > 0 &&
      document.activeElement === inputRef.current
    ) {
      setShowResults(true);
    }
  }, [filteredPokemons]);

  return (
    <Box position='relative' ref={wrapperRef}>
      <InputGroup maxW='300px' alignItems='center' position='relative'>
        <InputLeftElement pointerEvents='none' h='100%'>
          <Search2Icon color='white' />
        </InputLeftElement>
        <Input
          ref={inputRef}
          size='lg'
          _placeholder={{ color: 'white' }}
          borderColor='white'
          focusBorderColor='yellow.400'
          placeholder='Procure um Pokémon'
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <InputRightElement
          pointerEvents='none'
          h='100%'
          display={isLoading ? 'flex' : 'none'}
        >
          <Spinner size='sm' color='white' />
        </InputRightElement>
      </InputGroup>

      {showResults && (
        <VStack
          background='white'
          w='100%'
          borderRadius='md'
          overflow='hidden'
          overflowY='scroll'
          maxH={{ base: '75vh', md: '80vh' }}
          position='absolute'
          top={{ base: '100%', md: '74%' }}
          m='0'
          boxShadow='0 4px 6px -1px rgba(214, 158, 46, 0.6),0 2px 4px -1px rgba(214, 158, 46, 0.6)'
          sx={scrollBarStyles}
        >
          {filteredPokemons.map(({ name }) => (
            <Link href={`/pokemon/${name}`} passHref key={name}>
              <Box
                w='100%'
                p='3'
                border='1px solid'
                _notLast={{
                  borderBottom: 0,
                }}
                borderColor='blackAlpha.300'
                mt='0 !important'
                cursor='pointer'
                _hover={{
                  background: 'orange.200',
                }}
                onClick={() => setSearchTerm('')}
              >
                {formatPokemonName(name)}
              </Box>
            </Link>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default PokeSearch;

const scrollBarStyles = {
  '&::-webkit-scrollbar': {
    w: '2',
  },
  '&::-webkit-scrollbar-track': {
    w: '6',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '10',
    bg: `yellow.400`,
  },
};
