import { CheckIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';
import Head from 'next/head'
import Link from 'next/link';
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import { loadCheckout } from '../lib/stripe';
import Loader from './Loader';
import Table from './Table';

interface IPlansProps {
    products: Product[]
}

const Plans = ({ products }: IPlansProps) => {
    const { logout, user } = useAuth();
    const [ selectedPlan, setSelectedPlan ] = useState<Product | null>(products[2]);
    const [ billingLoading, setBillingLoading ] = useState<boolean>(false);

    const subscribeToPlan = () => {
        if(!user) return;
        console.log(selectedPlan?.prices[0].id!);
        loadCheckout(selectedPlan?.prices[0].id!);
        setBillingLoading(true);
    }   

    return (
        <div>
            <Head>
                <title>Netflix </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header
                className="border-b border-white/10"
            >
                <Link
                    href="/"
                >
                    <img
                        src="https://rb.gy/ulxxee"
                        width={150}
                        height={150}
                        alt="netflix logo"
                        className="cursor-pointer"
                    >
                    </img>
                </Link>
                <button
                    className="cursor-pointer text-lg font-medium hover:underline"
                    onClick={logout}
                >
                    Sign Out
                </button>
            </header>

            <main className="pt-28 max-w-5xl mx-auto px-5 pb-12 transition-all md:px-10">
                <h1
                    className="mb-3 text-3xl font-medium"
                >
                    Choose the plan that's right for you
                </h1>
                <ul>
                    <li className='flex items-center gap-x-2 text-lg'>
                        <CheckIcon 
                            className='h-7 w-7 text-[red] '/> 
                            Watch all you want. 
                            Ad free.
                    </li>
                    <li className='flex items-center gap-x-2 text-lg'>
                        <CheckIcon 
                            className='h-7 w-7 text-[red] '/> 
                            Recommendations.
                            Just for you.
                    </li>
                    <li className='flex items-center gap-x-2 text-lg'>
                        <CheckIcon 
                            className='h-7 w-7 text-[red] '/> 
                            Change or cancel your plan anytime.
                    </li>
                </ul>

                <div className="mt-4 flex flex-col">
                    <div className='flex w-full items-center self-end md:w-3/5'>
                        { products.map((product) => {
                            return (
                                <div 
                                    key={product.id}
                                    className={`plan-box ${selectedPlan?.id === product.id ? 'opacity-100' : 'opacity-40 after:opacity-0'}`}
                                    onClick={() => setSelectedPlan(product)}
                                >{product.name}
                                </div>
                            )
                        })}
                    </div>
                    <Table 
                        products={products}
                        selectedPlan={selectedPlan}
                    />
                </div>

                <button
                    disabled={!selectedPlan || billingLoading}
                    className={`block mx-auto w-11/12 rounded bg-[#e50914] py-4 text-xl font-semibold hover:bg-[#f6121d] md:w-[300px] ${billingLoading && 'opacity-40'}`}
                    onClick={subscribeToPlan}
                >
                    {billingLoading ? <Loader color="dark:fill-black" /> : 'Subscribe'}
                </button>
            </main>
        </div>
    )
}

export default Plans;