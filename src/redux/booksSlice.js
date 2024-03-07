import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	booksFetch: [],
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
		const data = await fetch(`https://api.itbook.store/1.0/search/mongodb/${page}`);
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
	},
	extraReducers: (builder) => {
		// getBooks
		builder.addCase(getBooks.pending, (state) => {
			state.isGetBooksLoading = true;
		})
		builder.addCase(getBooks.fulfilled, (state, action) => {
			state.isGetBooksLoading = false;
			state.booksFetch = action.payload.books;
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

export const { initLS, pushToList } = booksSlice.actions;

export default booksSlice.reducer;
