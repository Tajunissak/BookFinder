import axios from "axios";

const BASE_URL = "https://openlibrary.org/search.json?title=";

export const fetchBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}${encodeURIComponent(title)}`);
    return response.data.docs;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
