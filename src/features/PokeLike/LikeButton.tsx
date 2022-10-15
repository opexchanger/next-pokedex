import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { AiOutlineLike } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { getLikes, saveLikes } from '@/services/likes';

type LikeButtonProps = {
  pokemonName: string;
  initialCount: number;
};

const DEBOUNCE_DELAY = 900;

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
        setLoading(true);
        saveLikes(pokemonName, queueLikes)
          .then((likes) => {
            setLikes(likes.amount);
            setQueueLikes(0);
            setLoading(false);
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
        mr='3'
        borderRadius='full'
      >
        <AiOutlineLike />
        {queueLikes > 0 && <Box ml={2}>{queueLikes}</Box>}
      </Button>{' '}
      <Text as='span'>{likes} likes</Text>
    </Flex>
  );
};

export default LikeButton;
