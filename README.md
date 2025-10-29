
# Bok Finder Application  
A modern, responsive React application for discovering books from around the world. Built with a beautiful minimalist design and smooth animations to provide an exceptional user experience.

---

## Table of Contents  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Getting Started](#getting-started)  
  - [Frontend Setup](#frontend-setup)    
- [Running the Application](#running-the-application)  
- [API Documentation](#api-documentation)  
- [Demo](#demo)  
- [License](#license)  

---

## Features  
- **🔍 Smart Search**: Search books by title, author, or keywords
- **🎯 Advanced Filtering**: Filter results by author, publication year, language, and sort options
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🎨 Smooth Animations**: Elegant transitions and hover effects using Framer Motion
- **📚 Vast Collection**: Access to millions of books via Open Library API
- **🔒 Component Validation**: PropTypes for type safety
 

---

## Tech Stack  
- **Frontend:** React.js (Vite), Axios, Tailwind CSS, Framer Motion, React Router DOM
- **API:** Open Library REST API
- **Deployment:** Vercel

---

## Prerequisites  
Make sure you have the following installed on your system:  
- **Node.js** (version 14 or higher)
- **npm or yarn** 

---

## 🚀 Getting Started

### Frontend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start the React development server:**
```bash
npm run dev
```
The frontend should now be running at [ http://localhost:5173]( http://localhost:5173)


## Running the Application

### Frontend
Navigate to the project root directory and run:
```bash
npm run dev
```


## API Documentation

1. GET /api/rates
Fetch exchange rates for a given base currency. Default base is USD if not provided.
```
GET https://openlibrary.org/search.json?title=
```
Query Parameters:

- title: "Java Book"

Responses: 

```json
{
   "numFound": 62,
    "start": 0,
    "numFoundExact": true,
    "num_found": 62,
    "documentation_url": "https://openlibrary.org/dev/docs/api/search",
    "q": "",
    "offset": null,
    "docs":[
          {
            "author_key": [
                "OL29435A"
            ],
            "author_name": [
                "Steven Holzner"
            ],
            "cover_edition_key": "OL8806973M",
            "cover_i": 958580,
            "ebook_access": "borrowable",
            "edition_count": 2,
            "first_publish_year": 2000,
            "has_fulltext": true,
            "ia": [
                "java2blackbook0000temp",
                "javablackbook0000holz"
            ],
            "ia_collection_s": "inlibrary;internetarchivebooks;openlibrary-d-ol;printdisabled",
            "key": "/works/OL15035953W",
            "language": [
                "eng"
            ],
            "lending_edition_s": "OL8806973M",
            "lending_identifier_s": "java2blackbook0000temp",
            "public_scan_b": false,
            "subtitle": "The Java Book Programmers Turn To First",
            "title": "Java Black Book"
        },
    ]
  }

```

## Error Handling

- 400 Bad Request: Invalid Book Titles or missing fields in the request body.
- 500 Internal Server Error: External API is unavailable or other server-side issues.
  
---

## Demo
Check out the live version of the application:
- Frontend(When you search book it will give a free tier of lots of books which you can filter it🫡): [https://currency-convertor-frontend.vercel.app](https://currency-convertor-frontend.vercel.app/)

  - Method: GET
  - Request Body:
```json
{
   "numFound": 62,
    "start": 0,
    "numFoundExact": true,
    "num_found": 62,
    "documentation_url": "https://openlibrary.org/dev/docs/api/search",
    "q": "",
    "offset": null,
    "docs":[
          {
            "author_key": [
                "OL29435A"
            ],
            "author_name": [
                "Steven Holzner"
            ],
            "cover_edition_key": "OL8806973M",
            "cover_i": 958580,
            "ebook_access": "borrowable",
            "edition_count": 2,
            "first_publish_year": 2000,
            "has_fulltext": true,
            "ia": [
                "java2blackbook0000temp",
                "javablackbook0000holz"
            ],
            "ia_collection_s": "inlibrary;internetarchivebooks;openlibrary-d-ol;printdisabled",
            "key": "/works/OL15035953W",
            "language": [
                "eng"
            ],
            "lending_edition_s": "OL8806973M",
            "lending_identifier_s": "java2blackbook0000temp",
            "public_scan_b": false,
            "subtitle": "The Java Book Programmers Turn To First",
            "title": "Java Black Book"
        },
    ]
  
}
```

---

## License 
This project is licensed under the MIT License. 


