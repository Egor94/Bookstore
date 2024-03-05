import styles from "./BookCard.module.css";
function BookCard(props) {
    let book = props.book;
    return (
        <div className={styles.wrapp} onClick={()=>props.getBook(book.isbn13)}>
            <div >
                <img src={book.image} alt="#" />
            </div>
            <div>
                <h3>{book.title}</h3>
                <p>{book.subtitle}</p>
                <div className={styles.footer}>
                    <p>{book.price}</p>
                </div>
            </div>
        </div>
    )
}

export default BookCard;