import PokemonView from '../../src/pages/pokemon/[name]';
import { render, screen } from '@testing-library/react';
import { fakePokemon, fakeLikes } from '../__mocks__/fakeData/pokemon';

// para poder pegar o src sem o transform do next
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('Individual Pokemon Page', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  test('should display Pokemon name and image', () => {
    render(<PokemonView pokemon={fakePokemon} likes={fakeLikes} />);

    const headingWithPokemonName = screen.getByRole('heading', {
      name: 'Bulbasaur',
    });

    expect(headingWithPokemonName).toBeInTheDocument();

    const pokemonImage = screen.getByRole('img', { name: 'Bulbasaur picture' });

    expect(pokemonImage).toHaveAttribute('src', fakePokemon.sprites.front);
  });
});
