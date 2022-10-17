import { Box } from '@chakra-ui/react';

import Header from '@/components/Header/Header';
import PokeSearch from '@/features/PokeSearch/PokeSearch';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header>
      <PokeSearch />
    </Header>
    <Box as='main'>{children}</Box>
  </>
);

export default Layout;
