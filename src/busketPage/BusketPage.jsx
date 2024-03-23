import Header from "../common/Header";
import BusketCard from './BusketCard';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBooksById } from '../redux/booksSlice';
import { v4 as uuidv4 } from 'uuid';
import styles from "./BusketPage.module.css";
import _ from 'lodash'

function BusketPage() {
    const dispatch = useDispatch();
    const busketBooks = useSelector((state) => state.booksStore.busketBooks) || [];
    const filteredBusketBooks = _.uniqBy(busketBooks, 'isbn13');
    const unitedBooks = filteredBusketBooks.map((item) => {
        const id = item.isbn13;
        let amount = 0;
        for (let i = 0; i < busketBooks.length; i++ ) {
            if(busketBooks[i].isbn13 === id) {
                amount += 1; 
            }
        }
        const newBook = {...item, amount};
        return newBook;

    });
    const totalPrice = busketBooks.reduce((acc, book) => acc + Number(book.price.slice(1)), 0);
    const total = totalPrice.toFixed(2); 
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
                <div className={styles.wrapp}>
                <h1>Your Busket</h1>
                {unitedBooks.length
                    ? unitedBooks.sort((a, b) => a.isbn13 > b.isbn13 ? 1 : -1).map((book) => <BusketCard key={uuidv4()} book={book} />)
                    : <p>Your busket is empty</p>
                }
                <div className={styles.totalPrice}>
                    <div className={styles.totalDescription}>

                        <span className={styles.totalNumbers}>Total:</span>
                        <span className={styles.totalNumbers}>${total}</span>
                    
                    </div>
                    <div>
                    <button className={styles.checkOut}>Check out</button>
                    </div>
                </div>
                </div>
                
            </div>
        </>
    )
}

export default BusketPage;
