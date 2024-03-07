import Header from "../common/Header";
import BookCard from '../homePage/BookCard';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBooksById } from '../redux/booksSlice';
import { v4 as uuidv4 } from 'uuid';

function LikePage() {
    const dispatch = useDispatch();
    const likeBooks = useSelector((state) => state.booksStore.likeBooks) || [];

    const fetchBusketBooks = () => {
        if (likeBooks.length) {
            return;
        }
        const likeBooksIds = window.localStorage.getItem('likeBooks');
        const likeIds = JSON.parse(likeBooksIds);
        if (likeIds?.length) {
            dispatch(getBooksById({ ids: likeIds, lsKeyName: 'likeBooks' }));
        }
    }

    useEffect(() => {
        fetchBusketBooks();
    }, [dispatch]);

    return (
        <>
            <Header />
            <div className="container">
                <h2>Favorites</h2>
                {likeBooks.length
                    ? likeBooks.map((book) => <BookCard key={uuidv4()} book={book} />)
                    : <p>Your like list is empty</p>
                }
            </div>

        </>
    )
}

export default LikePage;
