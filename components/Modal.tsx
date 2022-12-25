import React, { useEffect, useState } from 'react';
import MuiModal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { CheckIcon, PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/outline';
import { Element, Genre, Movie } from '../types';
import ReactPlayer from 'react-player';
import { FaPlay } from 'react-icons/fa';
import { collection, deleteDoc, doc, DocumentData, onSnapshot, setDoc } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';
import toast, { Toaster } from 'react-hot-toast';

const Modal = () => {
    const [ showModal, setShowModal ] = useRecoilState(modalState);
    const [ currentMovie, setCurrentMovie ] = useRecoilState(movieState);
    const [ trailer, setTrailer ] = useState<string>("");
    const [ genre, setGenre ] = useState<Array<Genre>>();
    const [ muted, setMuted ] = useState<boolean>(true);
    const [ addedToList, setAddedToList ] = useState<boolean>(false);
    const [ movies, setMovies ] = useState<Movie[] | DocumentData>([]);
    const { user } = useAuth();

    const handleClose = () => {
        setShowModal(false);
    }

    const handleList = async () => {
        if(addedToList) {
            await deleteDoc(doc(db, "customers", user?.uid!, 'myList', currentMovie?.id.toString()!));
            toast(`${currentMovie?.title || currentMovie?.original_title} has been removed from My List.`, {
                duration: 8000
            })
        }else {
            await setDoc(doc(db, "customers", user?.uid!, "myList", currentMovie?.id.toString()), {...currentMovie});
            toast(`${currentMovie?.title || currentMovie?.original_title} has been added to My List.`, {
                duration: 8000
            });
        }
    }

    useEffect(() => {
        if (!currentMovie)
            return;

        const fetchMovie = async () => {
            const data = await fetch(`https://api.themoviedb.org/3/${currentMovie?.media_type === 'tv' ? 'tv' : 'movie'
                }/${currentMovie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`);

            const response = await data.json();
            if(response?.videos) {
                const index = response.videos.results.findIndex((result: Element) => result.type === "Trailer" );
                setTrailer(response?.videos?.results[index].key);
            }

            if(response?.genres)
                setGenre(response.genres);
        }

        fetchMovie();
    }, [ currentMovie ]);

    useEffect(() => {
        if(user) {
            return onSnapshot(collection(db, 'customers', user.uid, 'myList'), (snapshot) => {
                setMovies(snapshot.docs);
            });
        }
    }, [ db, currentMovie?.id ]);

    useEffect(() => {
        setAddedToList(movies.findIndex((result:DocumentData) => result.data().id === currentMovie?.id) !== -1);
    }, [ movies ]);

    return (
        <MuiModal
            open={showModal}
            onClose={handleClose}
            className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
        >
            <>
                <Toaster position="bottom-center"/>
                <button
                    onClick={handleClose}
                    className="modal-button absolute top-5 right-5 !z-40 h-9 w-9 border-none bg-[#181818]  hover:bg-[#181818]"
                >
                    <XIcon className='h-6 w-6' />
                </button>
                <div className='relative pt-[56.25%]'>
                    <ReactPlayer 
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: '0', left: '0' }}
                        playing
                        muted={muted}
                    />
                    <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                        <div className="flex space-x-2">
                            <button className="flex items-center rounded bg-white gap-x-2 px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                                <FaPlay className='h-7 w-7 text-black'/>
                                Play
                            </button>

                            <button className="modal-button" onClick={handleList}>
                                { !addedToList ? <PlusIcon className="h-7 w-7"/> : <CheckIcon className="h-7 w-7"/> }
                            </button>

                            <button className="modal-button">
                                <ThumbUpIcon className="h-7 w-7"/>
                            </button>
                        </div>
                        <button className="modal-button" onClick={() => setMuted((muted) => !muted)}>
                            { muted ? <VolumeOffIcon className="h-7 w-7"/> : <VolumeUpIcon className="h-7 w-7" />}
                        </button>
                    </div>
                </div>

                <div className='bg-[#181818] px-10 py-8'>
                    <div className="space-y-6 md:t ext-lg">
                        <div className="flex items-center space-x-2 text-sm">
                            <p className='font-semibold text-green-400'>
                                {currentMovie?.vote_average * 10}% match
                            </p>
                            <p className="font-light">
                                {currentMovie?.release_date || currentMovie?.first_air_date}
                            </p>
                            <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                                HD
                            </div>
                        </div>
                        <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row" >
                            <p className="w-5/6">{currentMovie?.overview}</p>
                            <div className="space-y-2">
                                <div>
                                    <span className="text-[gray]">Genres: </span> 
                                    {genre?.map((genre) => genre.name).join(', ')}
                                </div>
                                <div>
                                    <span className="text-[gray]">Original Language: </span>
                                    {currentMovie?.original_language}
                                </div>
                                <div>
                                    <span className="text-[gray]">Total votes: </span>
                                    {currentMovie?.vote_count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    )
}

export default Modal;