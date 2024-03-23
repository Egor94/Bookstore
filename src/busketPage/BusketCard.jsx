import styles from "./BusketCard.module.css";
import { getBook, removeBookFromBL, removeBookFromBusket, pushToList } from "../redux/booksSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function BusketCard(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const book = props.book;
    const totalBook = +book.price.slice(1) * book.amount;
    const sumBook = "$" + totalBook.toFixed(2);

    const fetchBook = async () => {
        await dispatch(getBook(book.isbn13));
        navigate(`/book/${book.isbn13}`);
    };

    return (
        <div className={styles.wrapp}>
            <div onClick={fetchBook}>
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
                    <button
                        className={styles.counterButton}
                        onClick={() => dispatch(removeBookFromBL(book.isbn13))}
                    >
                        {"-"}
                    </button>
                    <p className={styles.bookAmount}>{book.amount}</p>
                    <button
                        className={styles.counterButton}
                        onClick={() => dispatch(pushToList({ id: book.isbn13, book, listType: "busketBooks" }))}
                    >
                        {"+"}
                    </button>
                </div>
            </div>
            <p className={styles.sumBook}>{sumBook}</p>
            <button className={styles.deleteBook} onClick={() => dispatch(removeBookFromBusket(book.isbn13))}>X</button>
        </div>
    );
};

export default BusketCard;
