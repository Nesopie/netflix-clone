import { ChevronLeftIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { Movie } from '../types';
import Thumbnail from './Thumbnail';

export interface IRowProps {
    title: string;
    movies: Movie[] | DocumentData | null | undefined;
}

const Row = ({ title, movies }: IRowProps) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const [ sl, setSl ] = useState<number>(0); //sl is scrollLeft

    const handleClick = (direction: "left" | "right"): void => {
        if(rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = scrollLeft - (direction === "left" ? clientWidth : -clientWidth) / 1.5;
            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
            setSl(scrollTo);
        }
    }

    return (
        <div 
            className="h-40 space-y-1 md:space-y-2"
        >
            <h2 
                className="w-56 cursor-pointer text-md font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl"
            >
                {title}
            </h2>
            <div 
                className="flex group relative"
            >
                <ChevronLeftIcon
                    className={`absolute top-0 m-auto bottom-0 z-40 h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${sl <= 1 && 'hidden'}`} //if sl is close to 0 i.e., close to the left then make it hidden
                    onClick={() => handleClick("left")}
                />
                <div 
                    ref={rowRef} 
                    className="flex space-x-1 overflow-x-scroll md:space-x-2.5 scrollbar-hide"
                >
                    {movies?.map((movie: Movie | DocumentData) => {
                        return <Thumbnail key={movie.id} movie={movie} />
                    })}
                </div>
                <ChevronRightIcon 
                    className="absolute top-0 m-auto bottom-0 right-0 z-40 h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" 
                    onClick={() => handleClick("right")} 
                />
            </div>
        </div>
    )
}

export default Row