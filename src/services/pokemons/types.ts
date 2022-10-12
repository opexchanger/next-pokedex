export type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
  types: Type[];
  height: number;
  weight: number;
  stats: Stat[];
  abilities: Ability[];
};

export type TypeName =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'unknown'
  | 'shadow';

export type Type = {
  slot: number;
  type: {
    name: TypeName;
    url: string;
  };
};

export type Stat = {
  base_stat: number;
  stat: {
    name:
      | 'hp'
      | 'attack'
      | 'defense'
      | 'special-attack'
      | 'special-defense'
      | 'speed';
  };
};

export type Ability = {
  name: string;
  url: string;
  isHidden: boolean;
};

export type Pokemons = {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
};
