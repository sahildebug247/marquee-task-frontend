import React from "react";
import {Link} from "react-router-dom";
import './header.styles.scss'
function Header() {
    return(
        <div className='header'>
            <Link className='logo-container' to='/'>
                Company Search
            </Link>
            <div className='options'>
                <Link className='option' to='/company'>
                    Saved Companies
                </Link>
            </div>
        </div>
    )
}
export default Header;
