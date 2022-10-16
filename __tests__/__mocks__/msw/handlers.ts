import { rest } from 'msw';
import { fakeLikesGet, fakeLikesPost } from '../fakeData/pokemon';

export const handlers = [
  rest.get('/api/likes/:name', (req, res, ctx) => {
    return res(ctx.json(fakeLikesGet));
  }),
  rest.post('/api/likes', (req, res, ctx) => {
    return res(ctx.json(fakeLikesPost));
  }),
];
