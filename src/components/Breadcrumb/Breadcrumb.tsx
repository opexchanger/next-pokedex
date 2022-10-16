import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import Link from 'next/link';

type BreadcrumbProps = {
  path: {
    name: string;
    link: string;
    current?: boolean;
  }[];
};

const Breadcrumbs = ({ path }: BreadcrumbProps) => (
  <Breadcrumb
    boxShadow='sm'
    mt={{ base: 4, md: 8 }}
    py={{ base: 2 }}
    pl={{ md: 4 }}
  >
    {path.map(({ link, name, current }) =>
      current ? (
        <BreadcrumbItem isCurrentPage key={name}>
          <BreadcrumbLink>{name}</BreadcrumbLink>
        </BreadcrumbItem>
      ) : (
        <BreadcrumbItem key={name}>
          <Link href={link}>
            <BreadcrumbLink>{name}</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      )
    )}
  </Breadcrumb>
);

export default Breadcrumbs;
