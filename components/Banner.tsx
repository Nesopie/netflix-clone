import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';

export interface IBannerProps {
    netflixOriginals: Movie[];
}

const baseUrl = 'https://image.tmdb.org/t/p/original';

const Banner = ({ netflixOriginals }: IBannerProps) => {
    const [ movie, setMovie ] = useState<Movie | null>(null);
    const [ showModal, setShowModal ] = useRecoilState(modalState);
    const [ currentMovie, setCurrentMovie ] = useRecoilState(movieState);

    useEffect(() => {
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
    }, [netflixOriginals]);

    return (
        <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[70vh] lg:justify-end lg:pt-12">
            <div className="absolute top-0 left-0 w-screen h-[95vh] -z-10">
                <Image 
                    src={`${baseUrl}/${movie?.backdrop_path || movie?.poster_path}`} 
                    layout="fill"
                    objectFit='cover'
                />
            </div>

            <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold">
                { movie?.title || movie?.name || movie?.original_title }
            </h1>
            <p className="max-w-md text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl">
                { movie?.overview }
            </p>

            <div className='flex gap-x-4'>
                <button className="banner-button bg-white text-black">
                    <FaPlay 
                        className="text-black md:h-7 md:w-7"
                    />
                    Play
                </button>
                <button 
                    className="banner-button bg-[gray]/70"
                    onClick={() => {
                        setShowModal(true);
                        setCurrentMovie(movie);
                    }}
                >
                    More Info
                    <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8"/>
                </button>
            </div>
        </div>
    )
}

export default Banner;