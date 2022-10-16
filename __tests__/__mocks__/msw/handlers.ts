import { rest } from 'msw';

export const handlers = [
  rest.get('/api/likes:name', (req, res, ctx) => {
    return res(
      ctx.json({
        likes: {
          id: 1,
          pokemonName: 'bulbasaur',
          amount: 3,
        },
      })
    );
  }),
];
