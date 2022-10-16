import { formatPokemonName } from '@/utils/index';

describe('Format Pokemon Name', () => {
  test('should work with no capital letters', () => {
    expect(formatPokemonName('teste')).toBe('Teste');
  });

  test('should work with a hifen', () => {
    expect(formatPokemonName('nome-separado')).toBe('Nome Separado');
  });
});
