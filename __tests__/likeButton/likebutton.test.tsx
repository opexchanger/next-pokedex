import LikeButton from '@/features/PokeLike/LikeButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Like Pokemon Component', () => {
  test('should display number of likes fetched from the api', async () => {
    render(<LikeButton pokemonName='indifferent' initialCount={0} />);

    const likesCountText = await screen.findByText(/31 likes/i);
    expect(likesCountText).toBeInTheDocument();
  });

  test('should show number os likes on click', async () => {
    render(<LikeButton pokemonName='indifferent' initialCount={0} />);

    const likeButton = screen.getByRole('button', {
      name: /curtir o pokémon/i,
    });
    const user = userEvent.setup();

    await user.tripleClick(likeButton);

    expect(likeButton).toHaveTextContent('3');

    // await waitFor(async () => {
    // const updatedLikes = await screen.findByText(/35 likes/i);
    // expect(updatedLikes).toBeInTheDocument();
    // });
  });
});
