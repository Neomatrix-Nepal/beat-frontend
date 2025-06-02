import Button from "../Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({ 
  pageNumber, 
  totalPages, 
  onPageChange 
}: PaginationProps) => {
  const handlePrevious = () => {
    if (pageNumber > 1) {
      onPageChange(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages) {
      onPageChange(pageNumber + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, pageNumber - 2);
    let endPage = Math.min(totalPages, pageNumber + 2);

    if (pageNumber <= 3) {
      startPage = 1;
      endPage = Math.min(totalPages, maxPagesToShow);
    } else if (pageNumber > totalPages - 3) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          type="button"
          title={i.toString()}
          handleClick={() => onPageChange(i)}
          buttonStyles={`w-[48px] py-1.5 rounded-md text-sm ${
            pageNumber === i ? "bg-gray-300 font-bold" : ""
          }`}
        />
      );
    }

    return pageNumbers;
  };

  return (
    <div className="w-full bg-white px-4 py-4 flex items-center justify-between h-[64px]">
      <Button
        type="button"
        title="Previous"
        icon={<FaArrowLeft />}
        handleClick={handlePrevious}
        buttonStyles="border px-4 py-1.5 rounded-md text-sm bg-[#CBD5E8]"
        disabled={pageNumber === 1}
      />

      <div className="flex gap-2 items-center">
        {renderPageNumbers()}

        {totalPages > 5 && pageNumber < totalPages - 2 && (
          <>
            <div>...</div>
            <Button
              type="button"
              title={totalPages.toString()}
              handleClick={() => onPageChange(totalPages)}
              buttonStyles={`w-[48px] py-2 rounded-md text-sm ${
                pageNumber === totalPages ? "bg-gray-300 font-bold" : ""
              }`}
            />
          </>
        )}
      </div>

      <Button
        type="button"
        title="Next"
        icon={<FaArrowRight />}
        handleClick={handleNext}
        buttonStyles="border px-4 py-1.5 rounded-md text-sm"
        disabled={pageNumber === totalPages}
      />
    </div>
  );
};

export default Pagination;