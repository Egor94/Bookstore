import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Like from "../img/like.svg";
import User from "../img/user.svg";
import Bag from "../img/bag.svg";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksBySearch, getBooks } from "../redux/booksSlice";
import _ from "lodash";

function Header() {
    const dispatch = useDispatch();

    const [nav, setNav] = useState(false);

    const savedSearchValue = useSelector((state) => state.booksStore.searchValue);
    const [searchValue, setSearchValue] = useState(savedSearchValue);

    const debounceFn = useCallback(_.debounce(handleDebounceFn, 1000), []);

    function handleDebounceFn(value) {
        if (value) {
            dispatch(getBooksBySearch(value));
        } else {
            dispatch(getBooks());
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;

        setSearchValue(value);
        debounceFn(value);
    };

    const cleanSearch = () => {
        setSearchValue("");
        dispatch(getBooks());
    };

    return (
        <div className="container">
            <header className={styles.wrapp}>
                <div>
                    <Link to="/">
                        <button className={styles.btnBookstore}>Bookstore</button>
                    </Link>
                </div>
                <div className={styles.inputWrapp}>
                    <input
                        value={searchValue}
                        onChange={handleInputChange}
                        placeholder="Search"
                        className={`${styles.inputHeader} ${searchValue.length && styles.searchInputHeader}`}
                    />
                    <span className={styles.inputEnd}>
                        {searchValue.length
                            ? <button onClick={cleanSearch} className={styles.inputButton}>close icon</button>
                            : <span>search icon</span>
                        }
                    </span>
                </div>
                <div className={nav ? [styles.navBar, styles.active].join(" ") : [styles.navBar]}>
                    <Link to="/like"><img className={styles.icon} src={Like} alt="like" /></Link>
                    <Link to="/busket"><img className={styles.icon} src={Bag} alt="bag" /></Link>
                    <Link to="/account"><img className={styles.icon} src={User} alt="user" /></Link>
                </div>
                <div onClick={() => setNav(!nav)} className={styles.burgerBtnOpen}>
                {nav ? <FiX size={35}/> : <FiAlignJustify size={35}/>}
                </div>
            </header>
        </div>
    );
};

export default Header;
