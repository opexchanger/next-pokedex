import CardLoader from '../Card/CardLoader';
import Grid from './Grid';

type GridLoaderProps = {
  amount: number;
};

const GridLoader = ({ amount }: GridLoaderProps) => {
  // TODO useMemo?
  const fakeArray = Array.from({ length: amount }, (_, i) => i);

  return (
    <Grid>
      {fakeArray.map((_, i) => (
        <CardLoader key={i} />
      ))}
    </Grid>
  );
};

export default GridLoader;
