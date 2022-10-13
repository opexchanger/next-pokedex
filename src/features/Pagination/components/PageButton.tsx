import { chakra } from '@chakra-ui/react';

type PageButtonProps = {
  disabled?: boolean;
  active?: boolean;
  arrow?: boolean;
  spacer?: boolean;
  children: React.ReactNode;
  handleClick?: () => void;
};

const PageButton = ({
  disabled,
  active,
  arrow,
  spacer,
  handleClick,
  children,
}: PageButtonProps) => {
  const activeStyle = {
    bg: 'orange.600',
    _dark: {
      bg: 'orange.500',
    },
    color: 'white',
  };
  return (
    <chakra.button
      mx={1}
      px={4}
      py={2}
      rounded='md'
      bg='white'
      _dark={{
        bg: 'gray.800',
      }}
      color='gray.700'
      disabled={disabled}
      opacity={disabled || spacer ? 0.6 : undefined}
      _hover={disabled || spacer ? undefined : activeStyle}
      cursor={disabled ? 'not-allowed' : spacer ? 'initial' : 'pointer'}
      {...(active && activeStyle)}
      display={
        !arrow && !active
          ? {
              base: 'none',
              sm: 'block',
            }
          : {
              base: 'block',
            }
      }
      onClick={active ? undefined : handleClick}
    >
      {children}
    </chakra.button>
  );
};

export default PageButton;
