import { Button, Flex, Text } from '@chakra-ui/react';
import { AiOutlineLike } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { getLikes, saveLikes } from '@/services/likes';

type LikeButtonProps = {
  pokemonName: string;
  initialCount: number;
};

const DEBOUNCE_DELAY = 700;

const LikeButton = ({ pokemonName, initialCount }: LikeButtonProps) => {
  const [likes, setLikes] = useState(initialCount);
  const [queueLikes, setQueueLikes] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getLikes(pokemonName).then((likes) => {
      setLoading(false);
      // Set the clap count
      setLikes(likes.amount);
    });
  }, [pokemonName]);

  useEffect(() => {
    if (queueLikes > 0) {
      const timeout = setTimeout(() => {
        saveLikes(pokemonName, queueLikes)
          .then((likes) => {
            setLikes(likes.amount);
            setQueueLikes(0);
          })
          .catch((error) => {
            console.log('error :>> ', error);
          });
      }, DEBOUNCE_DELAY);
      return () => clearTimeout(timeout);
    }
  }, [queueLikes, pokemonName]);

  function clap() {
    setQueueLikes(queueLikes + 1);
  }

  return (
    <Flex align='center'>
      <Button
        isLoading={isLoading}
        colorScheme='teal'
        variant='outline'
        onClick={clap}
        mr='4'
        borderRadius='full'
      >
        <AiOutlineLike />
      </Button>{' '}
      {!isLoading && (
        <Text as='span'>
          {queueLikes}/{likes} likes
        </Text>
      )}
    </Flex>
  );
};

export default LikeButton;
