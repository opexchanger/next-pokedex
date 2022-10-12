import Link from 'next/link';
import Image from 'next/image';
import { Container, Flex } from '@chakra-ui/react';

const Header = () => (
  <Flex position='sticky' top='0' zIndex='10' p='4' bg='orange.400'>
    <Container maxW='container.xl'>
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
    </Container>
  </Flex>
);

export default Header;
