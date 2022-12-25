import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Membership from '../components/Membership'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import payments from '../lib/stripe'

export interface IAccountProps {
  products: Product[]
}

const Account = ({ products }: IAccountProps) => {
  const { user, logout } = useAuth()
  const subscription = useSubscription(user)

  // useEffect(() => {
  //     console.log(subscription);
  // }, [ subscription])

  return (
    <div>
      <Head>
        <title>Acount Settings - Netflix</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>

      <header className="bg-[#141414]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            width={120}
            height={120}
            className="cursor-pointer"
          />
        </Link>
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt="my account"
            className="cursor-pointer rounded"
            width={48}
            height={48}
          />
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-5 pt-24 pb-12 transition-all md:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:gap-5">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="flex items-center gap-1.5">
            <img src="https://rb.gy/4vfk4r" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#555555]">
              Member since {subscription?.created}
            </p>
          </div>
        </div>
        <Membership />

        <div className="grid grid-cols-1 items-center gap-y-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:px-0">
          <h4>Plan Details</h4>
          <div>
            {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </div>
          <p className="col-span-2 cursor-pointer text-blue-500 hover:underline md:text-right">
            Change Plans
          </p>
        </div>
        <div className="grid grid-cols-1 items-center gap-y-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((err: unknown) => {
      if (err instanceof Error) console.error(err)
    })

  return {
    props: {
      products,
    },
  }
}

export default Account
