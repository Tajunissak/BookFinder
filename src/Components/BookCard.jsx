
import { motion } from "framer-motion";

const BookCard = ({ book, index }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <img 
        src={coverUrl} 
        alt={book.title} 
        className="w-full h-56 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          Author: {book.author_name?.[0] || "Unknown"}
        </p>
        <p className="text-sm text-gray-600">
          First Published: {book.first_publish_year || "N/A"}
        </p>
      </div>
    </motion.div>
  );
};

export default BookCard;