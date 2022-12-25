import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import React from 'react'
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { Movie } from '../types';

export interface IThumbnailProps {
    movie: Movie | DocumentData | null;
}

const Thumbnail = ({ movie }: IThumbnailProps) => {
    const [ currentMovie, setCurrentMovie ] = useRecoilState(movieState);
    const [ showModal, setShowModal ] = useRecoilState(modalState);
    return (
        <div 
            className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:hover:scale-105 md:h-36 md:min-w-[260px] md:rounded"
            onClick={() => {
                setCurrentMovie(movie);
                setShowModal(true);
            }}    
        >
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path || movie?.poster_path}`}
                className="rounded-sm md:rounded object-cover"
                layout="fill"
            />
        </div>
    );
}

export default Thumbnail;