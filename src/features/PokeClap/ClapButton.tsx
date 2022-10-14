import { Button, Flex } from '@chakra-ui/react';
import { AiOutlineLike } from 'react-icons/ai';
import { useEffect, useState } from 'react';

const ClapButton = () => {
  const [claps, setClaps] = useState(0);
  const [queueClaps, setQueueClaps] = useState(0);

  useEffect(() => {
    if (queueClaps > 0) {
      const timeout = setTimeout(() => {
        setClaps(queueClaps);
        setQueueClaps(0);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [queueClaps]);

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
      {queueClaps}/{claps}
    </Flex>
  );
};

export default ClapButton;
