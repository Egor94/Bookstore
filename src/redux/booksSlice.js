import { createAsyncThunk, createReducer, createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	booksFetch: [],
	currentPage: 1,
	totalPages: 1,
	isGetBooksLoading: false,
	getBooksError: null,

	currentBook: null,
	isGetBookLoading: false,
	getBookError: null,

	busketBooks: [],
	likeBooks: [],
	isBooksByIdLoading: false,
	booksByIdError: null,
};

export const getBooks = createAsyncThunk(
	'booksStore/getBooks',
	async (page) => {
		let json;
		const data = await fetch(`https://api.itbook.store/1.0/new`);
		if (data.ok) {
			json = await data.json();
		}
		return json; //action.payload
	}
);

export const getBook = createAsyncThunk(
	'booksStore/getBook',
	async (id) => {
		let json;
		const book = await fetch(`https://api.itbook.store/1.0/books/${id}`);
		if (book.ok) {
			json = await book.json();
		}
		return json;
	}
);

export const getBooksById = createAsyncThunk(
	'booksStore/getBooksById',
	async ({ ids, lsKeyName }) => {
		const result = [];

		for (const id of ids) {
			const book = await fetch(`https://api.itbook.store/1.0/books/${id}`);
			if (book.ok) {
				const json = await book.json();
				result.push(json)
			}
		}
		return {
			result: result,
			lsKeyName: lsKeyName
		};
	}
);

export const booksSlice = createSlice({
	name: 'booksStore',
	initialState,
	reducers: {
		initLS: (state) => {
			const busketBooks = window.localStorage.getItem('busketBooks');
			if (!busketBooks) {
				window.localStorage.setItem('busketBooks', JSON.stringify([]));
			}

			const likeBooks = window.localStorage.getItem('likeBooks');
			if (!likeBooks) {
				window.localStorage.setItem('likeBooks', JSON.stringify([]));
			}

			const userName = window.localStorage.getItem('userName');
			if (!userName) {
				window.localStorage.setItem('userName', '');
			}

			const userEmail = window.localStorage.getItem('userEmail');
			if (!userEmail) {
				window.localStorage.setItem('userEmail', '');
			}

			const userPassvord = window.localStorage.getItem('userPassvord');
			if (!userPassvord) {
				window.localStorage.setItem('userPassvord', '');
			}
		},
		pushToList: (state, params) => {
			// listType may be 'busketBooks' or 'likeBooks'
			const { id, book, listType } = params.payload;
			const listFromLs = window.localStorage.getItem(listType);
			const parsedListFromLs = JSON.parse(listFromLs);
			parsedListFromLs.push(id);
			window.localStorage.setItem(listType, JSON.stringify(parsedListFromLs));
			state[listType] = [...state[listType], book];
		},

		removeBookFromBL: (state, params) => {
			const id = params.payload;
			const getBooksFromLS = 	JSON.parse(localStorage.getItem('busketBooks'));
			const foundByID = getBooksFromLS.indexOf(id);
			getBooksFromLS.splice(foundByID, 1);
			localStorage.setItem('busketBooks', JSON.stringify(getBooksFromLS));
			const indexBook = state.busketBooks.findIndex(book => book.isbn13 === id)
			state.busketBooks.splice(indexBook, 1);
		},

		removeBookFromBusket: (state, params) => {
			const id = params.payload;
			const getBooksFromLS = 	JSON.parse(localStorage.getItem('busketBooks'));
			const freshArr = getBooksFromLS.filter((item) => item !== id);
			localStorage.setItem('busketBooks', JSON.stringify(freshArr));
			const newState = state.busketBooks.filter((item) => item.isbn13 !== id);
			state.busketBooks = newState;
		},

		removeBookFromLike: (state, params) => {
			const id = params.payload;
			const getBooksFromLS = 	JSON.parse(localStorage.getItem('likeBooks'));
			const freshArr = getBooksFromLS.filter((item) => item !== id);
			localStorage.setItem('likeBooks', JSON.stringify(freshArr));
			const newState = state.likeBooks.filter((item) => item.isbn13 !== id);
			state.likeBooks = newState;
		}

	},
	extraReducers: (builder) => {
		// getBooks
		builder.addCase(getBooks.pending, (state) => {
			state.isGetBooksLoading = true;
		})
		builder.addCase(getBooks.fulfilled, (state, action) => {
			state.isGetBooksLoading = false;
			state.booksFetch = action.payload.books;
			state.currentPage = Number(action.payload.page);
			state.totalPages = Number(action.payload.total);
		})
		builder.addCase(getBooks.rejected, (state, action) => {
			state.isGetBooksLoading = false;
			state.getBooksError = 'Try later'
		})

		// getBook
		builder.addCase(getBook.pending, (state) => {
			state.isGetBookLoading = true;
		});
		builder.addCase(getBook.fulfilled, (state, action) => {
			state.isGetBookLoading = false;
			state.currentBook = action.payload;
		});
		builder.addCase(getBook.rejected, (state, action) => {
			state.isGetBookLoading = false;
			state.getBookError = 'Try later'
		});

		// getBooksById
		builder.addCase(getBooksById.pending, (state) => {
			state.isBooksByIdLoading = true;
		});
		builder.addCase(getBooksById.fulfilled, (state, action) => {
			state.isBooksByIdLoading = false;
			state[action.payload.lsKeyName] = action.payload.result;
		});
		builder.addCase(getBooksById.rejected, (state, action) => {
			state.isBooksByIdLoading = false;
			state.booksByIdError = 'Try later'
		});
	},
})

export const { 
	removeBookFromLike,
	initLS, 
	pushToList, 
	removeBookFromBL, 
	addBookToBL,  
	removeBookFromBusket
} = booksSlice.actions;

export default booksSlice.reducer;
