import type { NextApiRequest, NextApiResponse } from 'next';
import { serverMethods } from '@/services/likes';

type Data = {
  id: number;
  pokemonName: string;
  amount: number;
};

type ParsedBody = {
  pokemonName: string;
  amount: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      const { pokemonName, amount }: ParsedBody = JSON.parse(body);

      try {
        const savedLikes = await serverMethods.updateOrCreateLikes(
          pokemonName,
          amount
        );
        res.status(200).json(savedLikes);
      } catch (error) {
        console.log('error :>> ', error);
        res.status(500).end(error);
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Only Post Allowed`);
  }
};

export default handler;
