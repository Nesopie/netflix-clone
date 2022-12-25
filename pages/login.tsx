import Head from 'next/head';
import React from 'react';
import Image from 'next/image'
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

export interface Inputs {
    email: string;
    password: string;
}

const login = () => {
    const [ login, setLogin ] = useState<boolean>(false);
    const { register,
        handleSubmit, 
        watch, 
        formState: { errors }
    } = useForm<Inputs>();
    const { signIn, signUp } = useAuth();

    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        if(login)   
            await signIn(email, password);
        else 
            await signUp(email, password);
    };

    return (
        <div className="relative flex flex-col h-screen w-screen bg-black md:bg-transparent md:items-center md:justify-center">
            <Head>
                <title>Netflix</title>
                <link rel="icon" href='/favicon.ico' />
            </Head>
            <Image
                src="https://rb.gy/p2hphi"
                alt="login"
                className='-z-10 !hidden opacity-60 sm:!inline'
                layout='fill'
                objectFit='cover'
            />

            <img
                src="https://rb.gy/ulxxee"
                className='absolute top-4 left-4 md:top-10 md:left-10 cursor-pointer'
                width={150}
                height={150}
            />

            <form 
                onSubmit={ handleSubmit(onSubmit) }
                className='relative w-full flex flex-col mt-24 space-y-8 bg-black/75 py-10 px-6 md:max-w-md md:mt-0 rounded'
            >
                <h1 className="text-4xl font-semibold">Sign In</h1>
                <div className="space-y-8">
                    <label className="inline-block w-full">
                        <input 
                            type="email" 
                            placeholder='Email' 
                            className="input"
                            {...register("email", { required: true })}
                        />
                        { errors.email && (
                            <p className='text-red-500'>Please enter a valid email.</p>
                        ) }
                    </label>
                    <label className="inline-block w-full">
                        <input 
                            type="password" 
                            placeholder='Password' 
                            className="input"
                            {...register("password", { required: true })}
                        />
                        { errors.password && (
                            <p className='text-red-500'>Your password must contain between 4 and 60 letters.</p>
                        ) }
                    </label>

                    <button 
                        className='w-full rounded bg-[#e50914] py-3 font-semibold'
                        onClick={() => setLogin(true)}
                    >Sign In</button>

                    <div className="text-[gray]">
                        New to Netflix? {' '}
                        <button 
                            className="text-white hover:underline"
                            onClick={() => setLogin(false)}
                        >Sign up</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default login