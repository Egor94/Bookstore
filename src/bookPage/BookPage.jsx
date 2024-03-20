import Header from "../common/Header";
import { pushToList, removeBookFromLike } from "../redux/booksSlice";
import { useDispatch } from 'react-redux';
import Like from "../img/like.svg";
import RedLike from "../img/redLike.svg";
import { useState } from "react";
import styles from "../likePage/LikeCard.module.css";

function BookPage(props) {
    const dispatch = useDispatch();
    const book = props.currentBook;

    const likeFromLS = window.localStorage.getItem("likeBooks");
    const parcedLikeFromLS = JSON.parse(likeFromLS);

    const [isChecked, setIsChecked] = useState(parcedLikeFromLS.includes(book.isbn13));

    const pushBookToList = (listType) => {
        dispatch(pushToList({ id: book.isbn13, book, listType }))
    }

    const changeButtonStatus = (id) => {
        if (isChecked) {
            dispatch(removeBookFromLike(id))
        } else {
            dispatch(pushToList({ id: book.isbn13, book, listType: "likeBooks" }))
        }
        setIsChecked(!isChecked);
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="bookHeader">
                    <h2>{book.title}</h2>
                </div>
                <div className="upDescription">
                    <div className="leftUp">
                        <img src={book.image} alt="" />
                    </div>
                    <div className="rightUp">
                        <div className="priceStars">
                            <span>{book.price}</span>
                            <span>{book.rating}</span>
                        </div>
                        <div className="authors">
                            <span>Authors:</span>
                            <span>{book.authors}</span>
                        </div>
                        <div className="publisher">
                            <span>publisher:</span>
                            <span>{book.publisher}</span>
                        </div>
                        <div className="language">
                            <span>language:</span>
                            <span>{book.language}</span>
                        </div>
                        <div className="year">
                            <span>year:</span>
                            <span>{book.year}</span>
                        </div>
                        <button onClick={() => pushBookToList('busketBooks')}>
                            add to busket
                        </button>
                        <button className={styles.status_button} onClick={() => changeButtonStatus(book.isbn13)}>
                            {isChecked ? (<img src={RedLike} alt="like" />) : (<img src={Like} alt="like" />)}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookPage;
