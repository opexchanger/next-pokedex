import { formatPokemonName } from '@/utils/index';

describe('Format Pokemon Name', () => {
  test('should work with no capital letters', () => {
    expect(formatPokemonName('teste')).toBe('Teste');
  });

  test('should work with a hifen', () => {
    expect(formatPokemonName('nome-separado')).toBe('Nome Separado');
  });

  test('should work with multiple hifens', () => {
    expect(formatPokemonName('mais-de-um-espaço')).toBe('Mais De Um Espaço');
  });
});
