import logo from './logo.svg';
import './App.css';
import HomePage from "./homePage/HomePage";
import AccountPage from "./accountPage/AccountPage";
import BookPage from "./bookPage/BookPage";
import {BrowserRouter as Router, Route, Routes, Link, redirect, useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react';


function App() {

  const [booksFetch, setBooksFetch] = useState([]);
  const [pageFetch, setPageFetch] = useState(null);
  const [errorFetch, setErrorFetch] = useState(null);
  const [totalFetch, setTotalFetch] = useState(null);
  const [currentBook, setCurrentBook] = useState(null); 
  const navigate = useNavigate();

  const getBooks = async (page) => {
    const data = await fetch(`https://api.itbook.store/1.0/search/mongodb/${page}`);
    if (data.ok) { 
     let json = await data.json();
     setBooksFetch(json.books);
     setPageFetch(json.page);
     setErrorFetch(json.error);
     setTotalFetch(json.total);
    } 
  }
  const getBook = async (id) => {
    const book = await fetch(`https://api.itbook.store/1.0/books/${id}`);
    if(book.ok) {
      let json = await book.json();
      console.log(json);
      setCurrentBook(json);
      navigate(`/${json.isbn13}`);
    }
  }

  useEffect( () => {
    getBooks(1);
  }, []);

  return (
    // <Router> 
    <div className="App">
      
      <Routes>
      <Route path="/" element={<HomePage getBooks={getBooks} booksFetch={booksFetch} getBook={getBook}/>} />
      <Route path="/account" element={<AccountPage/>} />
      {currentBook && <Route path={`/${currentBook.isbn13}`} element={<BookPage currentBook={currentBook}/>} />}

      </Routes>
    </div>
    // </Router> 

  );
}

export default App;
