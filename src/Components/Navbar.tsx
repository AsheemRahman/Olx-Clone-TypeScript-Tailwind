import { useNavigate } from 'react-router-dom';
import olx from '../assets/olxlogo.png';
import search from "../assets/search.png";
import arrow from '../assets/arrow.png';
import searchblack from '../assets/searchblack.png';
import Login from './Login';
import { useContext, useState } from 'react';
import { Context } from './main';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/setup';

const Navbar = () => {
    const [loginPop, setLoginPop] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const context = useContext(Context);
    const navigate = useNavigate();

    if (!context) {
        throw new Error("Navbar must be used within a Context.Provider");
    }

    const { setSearch } = context;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSellClick = () => {
        if (!isLoggedIn) {
            setLoginPop(true);
        } else {
            navigate('/Addproduct');
        }
    };

    return (
        <>
            <div className='flex p-4 bg-slate-100 shadow-md'>
                <img src={olx} className='w-11 h-9 ml-4 mr-8' />
                <div className='flex border border-spacing-1 w-72 p-2 border-black ml-5 mr-8 bg-white '>
                    <img src={search} className='w-6 h-5 mt-1' />
                    <input placeholder='Location' className='ml-3 outline-none ' />
                    <img src={arrow} className='w-8 h-' />
                </div>
                <div className='flex h-12 ml-8 mr-8 border-2 border-black bg-white'>
                    <input onChange={(e) => setSearch(e.target.value)} placeholder='Find Cars , Moblie Phone and More' className='ml-3 w-96 outline-none' />
                    <img src={searchblack} />
                </div>
                <div className='flex h-12 p-3 ml-10 cursor-pointer'>
                    <h1 className='font-semibold'>English</h1>
                    <img src={arrow} className='w-8 h-7' />
                </div>
                {!isLoggedIn ? (
                    <div onClick={() => { setLoginPop(!loginPop) }} className='flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline'>
                        <h1 className='font-bold text-lg'>Login</h1>
                    </div>
                ) : (
                    <div onClick={handleLogout} className='flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline'>
                        <h1 className='font-bold text-lg'>Logout</h1>
                    </div>
                )}
                <div onClick={handleSellClick} className='w-28 flex h-12 p-2 ml-6 cursor-pointer rounded-full border border-yellow-500'>
                    <h1 className='font-bold text-lg ml-3'>+ Sell</h1>
                </div>
            </div>
            {loginPop && <Login setLoginPop={setLoginPop} onLoginSuccess={() => setIsLoggedIn(true)} />}
        </>
    );
};

export default Navbar;
