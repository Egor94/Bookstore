import styles from "./BookCard.module.css";
import { getBook } from "../redux/booksSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function BookCard(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const book = props.book;
    
    const fetchBook = async () => {
        await dispatch(getBook(book.isbn13));
        navigate(`/book/${book.isbn13}`);
    };

    return (
        <div className={styles.wrapp} onClick={fetchBook}>
            <div >
                <img className={styles.card_img} src={book.image} alt="#" />
            </div>
            <div className={styles.downWrapp}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.cardSubtitle}>{book.subtitle}</p>
                <p className={styles.card_price}>{book.price}</p>
            </div>
        </div>
    );
};

export default BookCard;
