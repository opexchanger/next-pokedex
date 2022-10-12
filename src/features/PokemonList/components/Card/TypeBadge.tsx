import { Badge } from '@chakra-ui/react';
import { TypeName } from 'src/services/pokemons/types';
import { capitalizeWord } from '@/utils/index';
import { getTypeColorScheme } from '../../utils';

type TypeBadgeProps = {
  type: TypeName;
};

const TypeBadge = ({ type }: TypeBadgeProps) => {
  const { color, text } = getTypeColorScheme(type);

  return (
    <Badge background={color} color={text} px={{ base: 1, md: 2 }}>
      {capitalizeWord(type)}
    </Badge>
  );
};

export default TypeBadge;
