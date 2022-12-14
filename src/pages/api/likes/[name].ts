import type { NextApiRequest, NextApiResponse } from 'next';
import { serverMethods } from '@/services/likes';

type Data = {
  id?: number;
  pokemonName: string;
  amount: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method, query } = req;
  const pokemonName = query.name as string;

  switch (method) {
    case 'GET':
      try {
        const likes = await serverMethods.findLikesByPokemonName(pokemonName);

        if (!likes) {
          return res.status(200).json({
            pokemonName,
            amount: 0,
          });
        }
        res.status(200).json(likes);
      } catch (error) {
        console.log('error :>> ', error);
        res.status(500).end(error);
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Only Get Allowed`);
  }
};

export default handler;
