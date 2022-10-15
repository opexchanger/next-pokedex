import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

const PAGINATION_STARTS_AT = 1;

export const PaginationContext = createContext<PaginationContext | undefined>(
  undefined
);

type PaginationProviderProps = {
  children: React.ReactNode;
  value?: PaginationContext;
};

type PaginationContext = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export default function PaginationProvider(props: PaginationProviderProps) {
  const [currentPage, setCurrentPage] = useState(PAGINATION_STARTS_AT);

  // useEffect(() => {
  //   let initialSetDone = false;
  //   const localStorageCurrentPage = localStorage.getItem('currentPage');
  //   if (localStorageCurrentPage) {
  //     if (initialSetDone) {
  //       window.localStorage.setItem('currentPage', JSON.stringify(currentPage));
  //     } else {
  //       setCurrentPage(JSON.parse(localStorageCurrentPage));
  //       initialSetDone = true;
  //     }
  //   }

  // }, [currentPage]);

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        setCurrentPage,
      }}
      {...props}
    />
  );
}

export function usePagination() {
  const context = useContext(PaginationContext);

  if (!context)
    throw new Error('usePagination must be used inside a PaginationProvider');
  return context;
}
