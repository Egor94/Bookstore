import styles from "./LikeCard.module.css";
import { getBook } from '../redux/booksSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Like from "../img/like.svg";
import RedLike from "../img/redLike.svg";
import { useState } from "react";

function LikeCard(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const book = props.book;

    const [isChecked, setIsChecked] = useState(true);
    const fetchBook = async () => {
        dispatch(getBook(book.isbn13));
        navigate(`/book/${book.isbn13}`);
    }

    const changeButtonStatus = (id) => {
        const likeFromLS = window.localStorage.getItem("likeBooks");
        const parcedLikeFromLS = JSON.parse(likeFromLS);
        if (isChecked) {
            const filteredBooks = parcedLikeFromLS.filter((item) => item !== id)
            const finishArr =  JSON.stringify(filteredBooks);
            window.localStorage.setItem("likeBooks", finishArr);

        } else {
            const filteredBooks = [...parcedLikeFromLS, id];
            const finishArr =  JSON.stringify(filteredBooks);
            window.localStorage.setItem("likeBooks", finishArr);

        }
        setIsChecked(!isChecked);
    }

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
                        <p className={styles.likePrise}>{book.price}</p>

                    </div>
                </div>
            </div>
            <button className={styles.status_button} onClick={() => changeButtonStatus(book.isbn13)}>
                {isChecked ? (<img src={RedLike} alt="like" />) : (<img src={Like} alt="like" />)}
            </button>
        </div>
    )
}

export default LikeCard;