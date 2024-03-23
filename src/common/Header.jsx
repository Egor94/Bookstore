import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Like from "../img/like.svg";
import User from "../img/user.svg";
import Bag from "../img/bag.svg";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { useState } from "react";

function Header() {
    const [nav, setNav] = useState(false);
    return (
        <div className="container">
            <header className={styles.wrapp}>
                <div>
                    <Link to='/'>
                        <button className={styles.btnBookstore}>Bookstore</button>
                    </Link>
                </div>
                <input className={styles.inputHeader} placeholder="Search"></input>
                <div className={nav ? [styles.navBar, styles.active].join(" ") : [styles.navBar]}>

                    <Link to='/like'><img className={styles.icon} src={Like} alt="like" /></Link>
                    <Link to='/busket'><img className={styles.icon} src={Bag} alt="bag" /></Link>
                    <Link to='/account'><img className={styles.icon} src={User} alt="user" /></Link>
                </div>
                <div onClick={() => setNav(!nav)} className={styles.burgerBtnOpen}>
                {nav ? <FiX size={35}/> : <FiAlignJustify size={35}/>}
                </div>
            </header>
        </div>
    );
}

export default Header;
