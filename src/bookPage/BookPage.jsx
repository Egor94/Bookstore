import Header from "../common/Header";
import { pushToList } from "../redux/booksSlice";
import { useDispatch } from 'react-redux';

function BookPage(props) {
    const dispatch = useDispatch();
    const book = props.currentBook;

    const pushBookToList = (listType) => {
        dispatch(pushToList({ id: book.isbn13, book, listType }))
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
                        <button onClick={() => pushBookToList('likeBooks')}>
                            add to like
                        </button>
                        <span>preview book</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookPage;
