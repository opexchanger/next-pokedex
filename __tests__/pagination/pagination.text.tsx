import { fireEvent, render, screen } from '@testing-library/react';

import { Pagination } from '@/features/Pagination';
import PaginationProvider from '@/contexts/pagination';

type renderProps = {
  pageNumbersToShow: number;
  totalPages: number;
};
const renderSUT = (args: renderProps) => {
  return render(<Pagination {...args} />, { wrapper: PaginationProvider });
};

test('pagination displays correct number of buttons', () => {
  const pageNumbersToShow = 5;
  renderSUT({ pageNumbersToShow, totalPages: 10 });

  const numberedButtons = screen.getAllByLabelText('Go to page number');

  expect(numberedButtons).toHaveLength(pageNumbersToShow);
});
