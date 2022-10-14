export const calculatePaginationRange = (
  currentPage: number,
  pageNumbersToShow: number,
  totalPages: number
) => {
  let start = 1;
  let stop = pageNumbersToShow;
  const step = 1;
  if (currentPage > 3) {
    let { newStart, newStop } = getLimitsToKeepActivePageCentralized(
      pageNumbersToShow,
      currentPage
    );
    if (newStop > totalPages) newStop = totalPages;
    start = newStart;
    stop = newStop;
  }
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
};

function getLimitsToKeepActivePageCentralized(
  pageNumbersToShow: number,
  currentPage: number
) {
  const delimiter = Math.floor(pageNumbersToShow / 2);
  const newStart = currentPage - delimiter;
  const newStop = currentPage + delimiter;
  return {
    newStart,
    newStop,
  };
}
