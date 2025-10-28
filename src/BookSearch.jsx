import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchBooksByTitle } from "./Services/bookApi";
import BookList from "./Components/BookList";

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    author: "",
    year: "",
    language: "",
    sortBy: "relevance"
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const result = await fetchBooksByTitle(query);
    setBooks(result);
    setLoading(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      author: "",
      year: "",
      language: "",
      sortBy: "relevance"
    });
  };

  const applyFilters = (books) => {
    let filteredBooks = [...books];

    if (filters.author) {
      filteredBooks = filteredBooks.filter(book => 
        book.author_name?.some(author => 
          author.toLowerCase().includes(filters.author.toLowerCase())
        )
      );
    }

  
    if (filters.year) {
      filteredBooks = filteredBooks.filter(book => 
        book.first_publish_year === parseInt(filters.year)
      );
    }

   
    if (filters.language) {
      filteredBooks = filteredBooks.filter(book => 
        book.language?.includes(filters.language)
      );
    }


    switch (filters.sortBy) {
      case "year_asc":
        filteredBooks.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
        break;
      case "year_desc":
        filteredBooks.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
        break;
      case "title":
        filteredBooks.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      default: 
        break;
    }

    return filteredBooks;
  };

  const filteredBooks = applyFilters(books);

  const availableYears = [...new Set(books.map(book => book.first_publish_year).filter(Boolean))].sort((a, b) => b - a);
  const availableLanguages = [...new Set(books.flatMap(book => book.language || []).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-6">
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
        >
          <Link 
            to="/" 
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors flex items-center gap-2"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-indigo-700">📚 Book Finder</h1>
          <div className="w-24"></div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSearch} 
          className="mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
           
            <div className="flex w-full max-w-2xl shadow-lg rounded-xl overflow-hidden">
              <input
                type="text"
                placeholder="Search for books by title, author, or keyword..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 p-4 outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-8 hover:bg-indigo-700 transition-all duration-300 font-semibold"
              >
                Search
              </button>
            </div>

            
            <motion.button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold border border-indigo-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Filters</span>
              <motion.span
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ⬇️
              </motion.span>
            </motion.button>
          </div>
        </motion.form>

        
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-white/20 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    placeholder="Filter by author..."
                    value={filters.author}
                    onChange={(e) => handleFilterChange("author", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                  />
                </div>

               
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publication Year
                  </label>
                  <select
                    value={filters.year}
                    onChange={(e) => handleFilterChange("year", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                  >
                    <option value="">All Years</option>
                    {availableYears.slice(0, 20).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

             
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) => handleFilterChange("language", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                  >
                    <option value="">All Languages</option>
                    {availableLanguages.map(lang => (
                      <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="year_asc">Year (Oldest First)</option>
                    <option value="year_desc">Year (Newest First)</option>
                    <option value="title">Title (A-Z)</option>
                  </select>
                </div>
              </div>

              
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Reset Filters
                </button>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

       
        {books.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 px-4"
          >
            <p className="text-gray-600">
              Showing {filteredBooks.length} of {books.length} books
              {filters.author && ` • Author: "${filters.author}"`}
              {filters.year && ` • Year: ${filters.year}`}
              {filters.language && ` • Language: ${filters.language.toUpperCase()}`}
            </p>
          </motion.div>
        )}

       
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-12"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!loading && (
            <motion.div
              key={filteredBooks.length + filters.sortBy}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BookList books={filteredBooks} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookSearch;