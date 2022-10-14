import { Badge, BadgeProps } from '@chakra-ui/react';
import { TypeName } from 'src/services/pokemons/types';
import { capitalizeWord } from '@/utils/index';
import { getTypeColorScheme } from '@/features/PokemonList/utils';

type TypeBadgeProps = BadgeProps & {
  typeName: TypeName;
};

const TypeBadge = ({ typeName, ...restProps }: TypeBadgeProps) => {
  const { color, text } = getTypeColorScheme(typeName);

  return (
    <Badge
      background={color}
      color={text}
      px={{ base: 1, md: 2 }}
      {...restProps}
    >
      {capitalizeWord(typeName)}
    </Badge>
  );
};

export default TypeBadge;
