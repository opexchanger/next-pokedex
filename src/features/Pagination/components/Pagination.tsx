import { Flex, Icon } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { calculatePaginationRange } from '../utils';

import PageButton from './PageButton';

type PaginationProps = {
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  pageNumbersToShow: number;
  totalPages: number;
};

const Pagination = ({
  activePage,
  setActivePage,
  pageNumbersToShow,
  totalPages,
}: PaginationProps) => {
  const paginationRange = useMemo(
    () => calculatePaginationRange(activePage, pageNumbersToShow, totalPages),
    [activePage, pageNumbersToShow, totalPages]
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
              setActivePage((curValue) => curValue - 1)
            )}
            disabled={activePage === 1}
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
                handleClick={getButtonClickHandler(() => setActivePage(1))}
              >
                1
              </PageButton>
              <PageButton spacer>...</PageButton>
            </>
          )}
          {paginationRange.map((pageNumber) => (
            <PageButton
              key={pageNumber}
              active={pageNumber === activePage}
              handleClick={getButtonClickHandler(() =>
                setActivePage(pageNumber)
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
                  setActivePage(totalPages)
                )}
              >
                {totalPages}
              </PageButton>
            </>
          )}
          <PageButton
            arrow
            handleClick={getButtonClickHandler(() =>
              setActivePage((curValue) => curValue + 1)
            )}
            disabled={activePage === totalPages}
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
