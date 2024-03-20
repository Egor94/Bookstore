import Header from "../common/Header";
import LikeCard from "./LikeCard";
import styles from "./LikePage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBooksById } from '../redux/booksSlice';
import { v4 as uuidv4 } from 'uuid';

function LikePage() {
    const dispatch = useDispatch();
    const likeBooks = useSelector((state) => state.booksStore.likeBooks) || [];
    const isBooksByIdLoading = useSelector((state) => state.booksStore.isBooksByIdLoading);

    const fetchLikeBooks = () => {
        const likeBooksIds = window.localStorage.getItem('likeBooks');
        const likeIds = JSON.parse(likeBooksIds);

        // TODO: compare likeIds and likeBooks
        // likeIds = [1, 2, 3, 4, 5]
        // likeBooks = [{isbn13: 1, ...}, {isbn13: 2, ...}, {isbn13: 3, ...}]

        const isEqual = false; // likeIds === likeBooks;
        if (!isEqual) {
            dispatch(getBooksById({ ids: likeIds, lsKeyName: 'likeBooks' }));
        }
    }

    useEffect(() => {
        fetchLikeBooks();
    }, [dispatch]);

    return (
        <>
            <Header />
            <div className="container">
                <div className={styles.wrapp}>
                    <h2>Favorites</h2>
                    {isBooksByIdLoading
                        ? <div>Loading...</div>
                        : likeBooks.length
                            ? likeBooks.map((book) => <LikeCard key={uuidv4()} book={book} />)
                            : <p>Your like list is empty</p>
                    }
                </div>
            </div>

        </>
    )
}

export default LikePage;
