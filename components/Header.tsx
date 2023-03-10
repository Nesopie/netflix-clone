import React, { useEffect, useState } from 'react'
import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import BasicMenu from './BasicMenu';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 0) {
                setScrolled(true);
            }else {
                setScrolled(false);
            }
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])


    return (
        <header className={`${scrolled && 'bg-[#141414]'}`}>
            <div className='flex items-center space-x-2 md:space-x-10'>
                <img
                    src="https://rb.gy/ulxxee"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                />
                <BasicMenu />
                <ul className='hidden space-x-4 md:flex'>
                    <li className="header-link">Home</li>
                    <li className="header-link">TV Shows</li>
                    <li className="header-link">Movies</li>
                    <li className="header-link">New & Popular</li>
                    <li className="header-link">My List</li>
                </ul>
            </div>
            <div className='flex items-center space-x-4 text-sm font-light'>
                <SearchIcon className='hidden h-6 w-6 sm:inline' />
                <p className='hidden lg:inline' >Kids</p>
                <BellIcon className='h-6 w-6' />
                <Link href='account'>
                    <img src="https://rb.gy/g1pwyx" alt="kids" className="cursor-pointer rounded" />
                </Link>
            </div>
        </header>
    )
}

export default Header