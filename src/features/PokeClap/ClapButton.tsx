import { Button, Flex } from '@chakra-ui/react';
import { AiOutlineLike } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Likes } from '@prisma/client';

type ClapButtonProps = {
  pokemonName: string;
  initialCount: number;
};

const DEBOUNCE_DELAY = 900;

async function saveClaps(pokemonName: string, amount: number): Promise<Likes> {
  const response = await fetch('/api/likes', {
    method: 'POST',
    body: JSON.stringify({
      pokemonName,
      amount,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

const ClapButton = ({ pokemonName, initialCount }: ClapButtonProps) => {
  const [claps, setClaps] = useState(initialCount);
  const [queueClaps, setQueueClaps] = useState(0);

  useEffect(() => {
    if (queueClaps > 0) {
      const timeout = setTimeout(() => {
        setClaps(queueClaps);
        setQueueClaps(0);
      }, DEBOUNCE_DELAY);
      return () => clearTimeout(timeout);
    }
  }, [queueClaps]);

  useEffect(() => {
    if (queueClaps > 0) {
      const timeout = setTimeout(() => {
        saveClaps(pokemonName, queueClaps)
          .then((claps) => {
            setClaps(claps.amount);
            setQueueClaps(0);
          })
          .catch((error) => {
            console.log('error :>> ', error);
          });
      }, DEBOUNCE_DELAY);
      return () => clearTimeout(timeout);
    }
  }, [queueClaps, pokemonName]);

  function clap() {
    setQueueClaps(queueClaps + 1);
  }

  return (
    <Flex align='center'>
      <Button
        isLoading={false}
        colorScheme='teal'
        variant='outline'
        onClick={clap}
        mr='4'
        borderRadius='full'
      >
        <AiOutlineLike />
      </Button>{' '}
      {queueClaps}/{claps} likes
    </Flex>
  );
};

export default ClapButton;
