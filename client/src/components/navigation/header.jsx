import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ users, signOutUser }) => {
    const navigate = useNavigate();

    // Use useEffect to listen for changes in users.auth
    // useEffect(() => {
    //     // If the user is signed out, navigate to /dashboard
    //     if (!users.auth) {
    //         navigate('/sign_in');
    //     }
    // }, [users.auth, navigate]);

    return (
        <header className="bck_b_light">
            <div className="container">
                <div className="left">
                    <div className="logo">
                        WAVES
                    </div>
                </div>
                <div className="right">
                    <div className="top">
                        {users.auth ?
                            <>
                                <div className="cart_link">
                                    <span>1</span>
                                    <Link to="/dashboard/user/user_cart">
                                        My cart
                                    </Link>
                                </div>

                                <Link to="/dashboard">
                                    My account
                                </Link>
                                <span
                                    onClick={() => signOutUser()}
                                >
                                    Log out
                                </span>
                            </> :
                            <span onClick={() => navigate('/sign_in')}>Log in</span>
                        }
                    </div>
                    <div className="bottom">
                        <Link to="/">
                            Home
                        </Link>
                        <Link to="/shop">
                            Shop
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;