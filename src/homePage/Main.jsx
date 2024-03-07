import styles from "./Main.module.css";
import BookCard from "./BookCard";
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../redux/booksSlice'; // импортирую функцию из стора
import { v4 as uuidv4 } from 'uuid';

function Main() {
    const dispatch = useDispatch();
    const booksFetch = useSelector((state) => state.booksStore.booksFetch);

    return (
        <div className="container">
            <div className={styles.wrapp}>
                <h1>New Releases Books</h1>
                <div className={styles.books_list}>
                    {booksFetch.map((book) => {
                        return <BookCard key={uuidv4()} book={book} />
                    })}
                </div>
                <div>
                    <button onClick={() => dispatch(getBooks(1))}>1</button>
                    <button onClick={() => dispatch(getBooks(2))}>2</button>
                    <button onClick={() => dispatch(getBooks(3))}>3</button>
                </div>
            </div>
        </div>
    )
}

export default Main;
