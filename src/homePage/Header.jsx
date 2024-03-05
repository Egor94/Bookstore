import styles from "./Header.module.css";
import {Link} from "react-router-dom";


function Header() {
    return (
        <div className="container">
        <div className={styles.wrapp}>
            <div>
                <p>Bookstore</p>
            </div>
            <div>
                <input></input>
            </div>
            <div className={styles.buttons}>
                <button>like</button>
                <button>list</button>
                <Link to='/account'>account</Link>
            </div>

        </div>
        </div>
    );
}

export default Header;

