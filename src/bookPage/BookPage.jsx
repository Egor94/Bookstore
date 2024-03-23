import Header from "../common/Header";
import { pushToList, removeBookFromLike } from "../redux/booksSlice";
import { useDispatch } from "react-redux";
import Like from "../img/like.svg";
import RedLike from "../img/redLike.svg";
import { useState } from "react";
import styles from "../bookPage/BookPage.module.css";

function BookPage(props) {
    const dispatch = useDispatch();
    const book = props.currentBook;

    const likeFromLS = window.localStorage.getItem("likeBooks");
    const parcedLikeFromLS = JSON.parse(likeFromLS);

    const [isChecked, setIsChecked] = useState(parcedLikeFromLS.includes(book.isbn13));

    const pushBookToList = (listType) => {
        dispatch(pushToList({ id: book.isbn13, book, listType }));
    };

    const changeButtonStatus = (id) => {
        if (isChecked) {
            dispatch(removeBookFromLike(id))
        } else {
            dispatch(pushToList({ id: book.isbn13, book, listType: "likeBooks" }))
        }
        setIsChecked(!isChecked);
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className={styles.wrapp}>
                    <div className={styles.bookHeader}>
                        <h2>{book.title}</h2>
                    </div>
                    <div className={styles.upDescription}>
                        <div className={styles.leftUp}>
                        <button className={styles.status_button} onClick={() => changeButtonStatus(book.isbn13)}>
                                {isChecked ? (<img src={RedLike} alt="like" />) : (<img src={Like} alt="like" />)}
                            </button>

                            <img className={styles.bookImg} src={book.image} alt="" />
                        </div>
                        <div className={styles.rightUp}>
                            <div className={styles.priceStars}>
                                <span>{book.price}</span>
                                <span>{book.rating}</span>
                            </div>
                            <div className={styles.discribeLine}>
                                <span className={styles.liTitel}>Authors:</span>
                                <span className={styles.liDiscribe}>{book.authors}</span>
                            </div>
                            <div className={styles.discribeLine}>
                                <span className={styles.liTitel}>publisher:</span>
                                <span className={styles.liDiscribe}>{book.publisher}</span>
                            </div>
                            <div className={styles.discribeLine}>
                                <span className={styles.liTitel}>language:</span>
                                <span className={styles.liDiscribe}>{book.language}</span>
                            </div>
                            <div className={styles.discribeLine}>
                                <span className={styles.liTitel}>year:</span>
                                <span className={styles.liDiscribe}>{book.year}</span>
                            </div>
                            <button className={styles.addToBusketBtn} onClick={() => pushBookToList("busketBooks")}>
                                add to busket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookPage;
