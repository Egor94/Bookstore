import Header from "./Header";
import Main from "./Main";

function HomePage(props) {
  let vtoroy = 0;
    return (
      <div>
        <Header/>
        <Main getBooks={props.getBooks} booksFetch={props.booksFetch} getBook={props.getBook}/>
      </div>
    );
  }
  
  export default HomePage;
  
