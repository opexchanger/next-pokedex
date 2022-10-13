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
      <Flex>
        <>
          <PageButton
            arrow
            handleClick={getButtonClickHandler(() =>
              setCurrentPage((curValue) => curValue - 1)
            )}
            disabled={currentPage === 1}
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
                handleClick={getButtonClickHandler(() => setCurrentPage(1))}
              >
                1
              </PageButton>
              <PageButton spacer>...</PageButton>
            </>
          )}
          {paginationRange.map((pageNumber) => (
            <PageButton
              key={pageNumber}
              active={pageNumber === currentPage}
              handleClick={getButtonClickHandler(() =>
                setCurrentPage(pageNumber)
              )}
            >
              {pageNumber}
            </PageButton>
          ))}
          {!paginationRange.includes(totalPages) && (
            <>
              <PageButton spacer>...</PageButton>
              <PageButton
                handleClick={getButtonClickHandler(() =>
                  setCurrentPage(totalPages)
                )}
              >
                {totalPages}
              </PageButton>
            </>
          )}
          <PageButton
            arrow
            handleClick={getButtonClickHandler(() =>
              setCurrentPage((curValue) => curValue + 1)
            )}
            disabled={currentPage === totalPages}
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
