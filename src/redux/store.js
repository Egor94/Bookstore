import { configureStore } from "@reduxjs/toolkit"
import booksSlice from "./booksSlice"

export const store = configureStore({
	reducer: {
		booksStore: booksSlice,
	},
});
