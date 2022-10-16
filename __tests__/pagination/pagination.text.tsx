import { fireEvent, render, screen } from '@testing-library/react';

import { Pagination } from '@/features/Pagination';
import PaginationProvider from '@/contexts/pagination';

type renderProps = {
  pageNumbersToShow: number;
  totalPages: number;
};

window.scrollTo = jest.fn();

const renderSUT = (args: renderProps) => {
  return render(<Pagination {...args} />, { wrapper: PaginationProvider });
};

describe('Pagination Component', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  test('pagination displays correct number of buttons', () => {
    const pageNumbersToShow = 5;
    renderSUT({ pageNumbersToShow, totalPages: 10 });

    const numberedButtons = screen.getAllByLabelText('Go to page number');

    expect(numberedButtons).toHaveLength(pageNumbersToShow);
  });

  test('Back button should be disabled on first page', () => {
    renderSUT({ pageNumbersToShow: 5, totalPages: 10 });

    const goBackButton = screen.getByLabelText('Go back one page');
    const buttonWithNumber1 = screen.getByText(1);

    // confirm we are on page 1
    fireEvent.click(buttonWithNumber1);

    expect(goBackButton).toBeDisabled();
  });

  test('Next button should be disabled on last page', () => {
    renderSUT({ pageNumbersToShow: 6, totalPages: 6 });

    const nextPageButton = screen.getByLabelText('Go to next page');
    const buttonWithNumber6 = screen.getByText(6);

    fireEvent.click(buttonWithNumber6);

    expect(nextPageButton).toBeDisabled();
  });

  test('Current selected page button should be marked', () => {
    renderSUT({ pageNumbersToShow: 5, totalPages: 10 });

    const buttonWithNumber3 = screen.getByText(3);

    fireEvent.click(buttonWithNumber3);

    const currentButton = screen.getByRole('button', {
      current: true,
    });

    expect(currentButton).toHaveTextContent('3');

    // not working
    // expect(buttonWithNumber3).toHaveStyle({
    //   backgroundColor: '#C05621',
    // });
  });
});
