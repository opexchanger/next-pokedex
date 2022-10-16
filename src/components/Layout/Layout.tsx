import { Box } from '@chakra-ui/react';

import Header from '@/components/Header/Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <Box as='main'>{children}</Box>
  </>
);

export default Layout;
