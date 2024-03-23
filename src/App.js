import "./App.css";
import HomePage from "./homePage/HomePage";
import AccountPage from "./accountPage/AccountPage";
import BookPage from "./bookPage/BookPage";
import BusketPage from "./busketPage/BusketPage";
import LikePage from "./likePage/LikePage";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, getBook, initLS } from "./redux/booksSlice";

function App() {
	const dispatch = useDispatch();

	const currentBook = useSelector((state) => state.booksStore.currentBook);

	const fetchCurrentBook = () => {
		const pathName = window.location.pathname;
		if (pathName.startsWith("/book/")) {
			const id = pathName.slice(6);
			dispatch(getBook(id));
		}
	};

	useEffect(() => {
		dispatch(initLS());
		fetchCurrentBook();
		dispatch(getBooks());
	}, [dispatch]);

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/account" element={<AccountPage />} />
				<Route path="/busket" element={<BusketPage />} />
				<Route path="/like" element={<LikePage />} />

				{currentBook && (
					<Route
						path={`/book/${currentBook.isbn13}`}
						element={<BookPage currentBook={currentBook} />} />
				)}
			</Routes>
		</div>
	);
};

export default App;
