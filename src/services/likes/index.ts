import api from '@/lib/fetch';
import { prisma } from '@/lib/prisma';
import { Likes } from './types';

export const findLikesByPokemonName = async (pokemonName: string) => {
  const likes = await prisma.likes.findUnique({
    where: {
      pokemonName: pokemonName.toLowerCase(),
    },
  });

  return likes;
};

export const updateOrCreateLikes = async (
  pokemonName: string,
  amount: number
) => {
  const savedLikes = prisma.likes.upsert({
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

  return savedLikes;
};

export const saveLikes = async (
  pokemonName: string,
  amount: number
): Promise<Likes> => {
  const response = await fetch('/api/likes', {
    method: 'POST',
    body: JSON.stringify({
      pokemonName: pokemonName.toLowerCase(),
      amount,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export const getLikes = async (pokemonName: string) => {
  const likes = await api.get<Likes>(`/api/likes/${pokemonName.toLowerCase()}`);
  return likes;
};
