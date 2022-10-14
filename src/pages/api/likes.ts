// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// TODO refactor to lib
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

      const savedLike = await prisma.likes.upsert({
        where: {
          pokemonName: pokemonName.toLowerCase(),
        },
        update: {
          amount: {
            increment: amount,
          },
        },
        create: {
          pokemonName: pokemonName.toLowerCase(),
          amount: amount,
        },
      });
      res.status(200).json(savedLike);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Only Post Allowed`);
  }
};

export default handler;
