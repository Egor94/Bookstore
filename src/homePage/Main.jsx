import styles from "./Main.module.css";
import BookCard from "./BookCard";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function Main() {
    const booksFetch = useSelector((state) => state.booksStore.booksFetch);
    const isGetBooksLoading = useSelector((state) => state.booksStore.isGetBooksLoading);

    return (
        <div className="container">
            <div className={styles.wrapp}>
                <h1>New Releases Books</h1>
                <div className={styles.books_list}>
                    {isGetBooksLoading
                        ? <div>Loading...</div>
                        : booksFetch.length
                            ? booksFetch.map((book) => <BookCard key={uuidv4()} book={book} />)
                            : <p>No books</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Main;
