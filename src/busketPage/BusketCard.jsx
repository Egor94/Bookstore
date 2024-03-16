import styles from "./BusketCard.module.css";
import { getBook, removeBookFromBL, addBookToBL, removeBookFromBusket, pushToList } from '../redux/booksSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";


function BusketCard(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const book = props.book;

    const fetchBook = async () => {
        // dispatch(getBook(book.isbn13));
        // navigate(`/book/${book.isbn13}`);
    }

    return (
        <div className={styles.wrapp} onClick={fetchBook}>
                <div>
                    <img className={styles.card_img} src={book.image} alt="#" />
                </div>
                <div className={styles.descriptionWrapp}>
                    <div className={styles.midlePath}>
                        <div className={styles.upMidlePath}>
                            <h3>{book.title}</h3>
                            <p>{book.subtitle}</p>
                        </div>
                    </div>
                    <div className={styles.downMidlePath}>
                        <button onClick={() => dispatch(removeBookFromBL(book.isbn13))}>-</button>
                        <p>{book.amount}</p>
                        <button onClick={() => dispatch(pushToList({ id: book.isbn13, book, listType :'busketBooks'}))}>+</button>
                    </div>
                </div>
            <p>{book.price}</p>
            <button className={styles.deleteBook} onClick={() => dispatch(removeBookFromBusket(book.isbn13))}>X</button>

        </div>

    )
}

export default BusketCard;