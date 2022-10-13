import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';

interface GridProps extends SimpleGridProps {}

const Grid = ({ children, ...restProps }: GridProps) => (
  <SimpleGrid
    columns={{ base: 1, md: 2, lg: 3 }}
    spacing={{ base: '30px', md: '40px', lg: '50px' }}
    {...restProps}
  >
    {children}
  </SimpleGrid>
);

export default Grid;
