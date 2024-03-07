import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Like from "../img/like.svg";
import User from "../img/user.svg";
import Bag from "../img/bag.svg";

function Header() {
    return (
        <div className="container">
            <div className={styles.wrapp}>
                <div>
                    <Link to='/'>
                        <button className={styles.btnBookstore}>Bookstore</button>
                    </Link>
                </div>
                <input className={styles.input} placeholder="Search"></input>
                <div className={styles.buttons}>
                    <Link to='/like'><img className={styles.icon} src={Like} alt="like" /></Link>
                    <Link to='/busket'><img className={styles.icon} src={Bag} alt="bag" /></Link>
                    <Link to='/account'><img className={styles.icon} src={User} alt="user" /></Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
