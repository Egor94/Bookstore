import styles from "./Main.module.css";
import BookCard from "./BookCard";
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../redux/booksSlice'; // импортирую функцию из стора
import { v4 as uuidv4 } from 'uuid';

function Main() {
    const dispatch = useDispatch();
    const booksFetch = useSelector((state) => state.booksStore.booksFetch);
    const currentPage = useSelector((state) => state.booksStore.currentPage);
    const pageToRender = [1, 2, 3, 4, 5];

    return (
        <div className="container">
            <div className={styles.wrapp}>
                <h1>New Releases Books</h1>
                <div className={styles.books_list}>
                    {booksFetch.map((book) => {
                        return <BookCard key={uuidv4()} book={book} />
                    })}
                </div>
                <div className={styles.paginationBtn}>
                    {pageToRender.map(pageNumber => (
                        <button
                        className={styles.styleBtn}
                            disabled={currentPage === pageNumber}
                            onClick={() => dispatch(getBooks(pageNumber))}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Main;
