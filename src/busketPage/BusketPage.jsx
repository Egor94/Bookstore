import Header from "../common/Header";
import BookCard from '../homePage/BookCard';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBooksById } from '../redux/booksSlice';
import { v4 as uuidv4 } from 'uuid';

function BusketPage() {
    const dispatch = useDispatch();
    const busketBooks = useSelector((state) => state.booksStore.busketBooks) || [];

    const fetchBusketBooks = () => {
        if (busketBooks.length) {
            return;
        }
        const busketBooksIds = window.localStorage.getItem('busketBooks');
        const busketIds = JSON.parse(busketBooksIds);
        if (busketIds?.length) {
            dispatch(getBooksById({ ids: busketIds, lsKeyName: 'busketBooks' }));
        }
    }

    useEffect(() => {
        fetchBusketBooks();
    }, [dispatch]);

    return (
        <>
            <Header />
            <div className="container">
                <h2>Your Busket</h2>
                {busketBooks.length
                    ? busketBooks.map((book) => <BookCard key={uuidv4()} book={book} />)
                    : <p>Your busket is empty</p>
                }
            </div>
        </>
    )
}

export default BusketPage;
