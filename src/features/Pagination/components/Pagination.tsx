import { usePagination } from '@/contexts/pagination';
import { Flex, Icon } from '@chakra-ui/react';
import { useMemo } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { calculatePaginationRange } from '../utils';

import PageButton from './PageButton';

type PaginationProps = {
  pageNumbersToShow: number;
  totalPages: number;
};

const Pagination = ({ pageNumbersToShow, totalPages }: PaginationProps) => {
  const { currentPage, setCurrentPage } = usePagination();

  const paginationRange = useMemo(
    () => calculatePaginationRange(currentPage, pageNumbersToShow, totalPages),
    [currentPage, pageNumbersToShow, totalPages]
  );

  function getButtonClickHandler(action: () => void) {
    return function () {
      action();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  }

  return (
    <Flex
      bg='#edf3f8'
      _dark={{
        bg: '#3e3e3e',
      }}
      p={50}
      w='full'
      alignItems='center'
      justifyContent='center'
    >
      <Flex as='nav' aria-label='pagination navigation'>
        <>
          <PageButton
            buttonType='arrow'
            disabled={currentPage === 1}
            aria-label='Go back one page'
            handleClick={getButtonClickHandler(() =>
              setCurrentPage((curValue) => curValue - 1)
            )}
          >
            <Icon
              as={IoIosArrowBack}
              color='gray.700'
              _dark={{
                color: 'gray.200',
              }}
              boxSize={4}
            />
          </PageButton>
          {!paginationRange.includes(1) && (
            <>
              <PageButton
                buttonType='number'
                aria-label='Go to first page'
                handleClick={getButtonClickHandler(() => setCurrentPage(1))}
              >
                1
              </PageButton>
              <PageButton buttonType='spacer'>...</PageButton>
            </>
          )}
          {paginationRange.map((pageNumber) => (
            <PageButton
              key={pageNumber}
              buttonType='number'
              active={pageNumber === currentPage}
              aria-label='Go to page number'
              handleClick={getButtonClickHandler(() =>
                setCurrentPage(pageNumber)
              )}
            >
              {pageNumber}
            </PageButton>
          ))}
          {!paginationRange.includes(totalPages) && (
            <>
              <PageButton buttonType='spacer'>...</PageButton>
              <PageButton
                buttonType='number'
                handleClick={getButtonClickHandler(() =>
                  setCurrentPage(totalPages)
                )}
              >
                {totalPages}
              </PageButton>
            </>
          )}
          <PageButton
            buttonType='arrow'
            disabled={currentPage === totalPages}
            aria-label='Go to next page'
            handleClick={getButtonClickHandler(() =>
              setCurrentPage((curValue) => curValue + 1)
            )}
          >
            <Icon
              as={IoIosArrowForward}
              color='gray.700'
              _dark={{
                color: 'gray.200',
              }}
              boxSize={4}
            />
          </PageButton>
        </>
      </Flex>
    </Flex>
  );
};

export default Pagination;
