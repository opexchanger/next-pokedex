import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Flex } from '@chakra-ui/react';

type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => (
  <Flex
    position='sticky'
    top='0'
    zIndex='10'
    p='4'
    py={{ base: 6, md: 4 }}
    bg='orange.400'
  >
    <Container maxW='container.xl'>
      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justify='space-between'
        align={{ base: 'center', md: 'initial' }}
      >
        <Box mb={{ base: 2, md: 0 }}>
          <Link href='/'>
            <a>
              <Image
                src='https://pokeapi.co/static/pokeapi_256.3fa72200.png'
                width='150'
                height='60'
                alt='Poké-logo'
              />
            </a>
          </Link>
        </Box>
        {children}
      </Flex>
    </Container>
  </Flex>
);

export default Header;
