
import BookCard from "./BookCard";

const BookList = ({ books }) => {
  if (!books.length) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📚</div>
        <p className="text-gray-500 text-lg mb-2">No books found matching your criteria.</p>
        <p className="text-gray-400">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
      {books.map((book, index) => (
        <BookCard key={`${book.key}-${index}`} book={book} index={index} />
      ))}
    </div>
  );
};

export default BookList;