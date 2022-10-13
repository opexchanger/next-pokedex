import { chakra, ButtonProps } from '@chakra-ui/react';

interface PageButtonProps extends ButtonProps {
  disabled?: boolean;
  active?: boolean;
  buttonType: 'arrow' | 'number' | 'spacer';
  handleClick?: () => void;
}

const activeStyle = {
  bg: 'orange.600',
  _dark: {
    bg: 'orange.500',
  },
  color: 'white',
};

const PageButton = ({
  disabled,
  active,
  buttonType,
  handleClick,
  children,
  ...restProps
}: PageButtonProps) => {
  return (
    <chakra.button
      mx={1}
      px={4}
      py={2}
      rounded='md'
      bg='white'
      color='gray.700'
      disabled={disabled}
      opacity={disabled || buttonType === 'spacer' ? 0.6 : undefined}
      _hover={disabled || buttonType === 'spacer' ? undefined : activeStyle}
      cursor={
        disabled
          ? 'not-allowed'
          : buttonType === 'spacer'
          ? 'initial'
          : 'pointer'
      }
      display={
        buttonType !== 'arrow' && !active
          ? {
              base: 'none',
              md: 'block',
            }
          : {
              base: 'block',
            }
      }
      {...(active && activeStyle)}
      onClick={active ? undefined : handleClick}
      aria-current={active || undefined}
      {...restProps}
    >
      {children}
    </chakra.button>
  );
};

export default PageButton;
