function BookPage(props) {
    const book = props.currentBook
    return (
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

                </div>
            </div>
        </div>
    );
}
export default BookPage;