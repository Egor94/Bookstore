import styles from "./Main.module.css";
import BookCard from "./BookCard";



function Main(props) {
    return(
        <div className="container">
            <h1>New Releases Books</h1>
            <div className={styles.books_list}>
                {props.booksFetch.map((book)=> {
                    return <BookCard key={book.isbn13} book={book} getBook={props.getBook}/>
                })}
            </div>
            <div>
                <button onClick={() => props.getBooks(1)}>1</button>
                <button onClick={() => props.getBooks(2)}>2</button>
                <button onClick={() => props.getBooks(3)}>3</button>

            </div>

        </div>
    ) 

}

export default Main;