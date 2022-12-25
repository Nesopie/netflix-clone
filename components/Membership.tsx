import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import useSubscription from '../hooks/useSubscription';
import { goToBillingPortal } from '../lib/stripe';
import Loader from './Loader';

const Membership = () => {
    const { user } = useAuth();
    const [ billingLoading, setBillingLoading ] = useState<boolean>(false);
    const subscription = useSubscription(user);

    useEffect(() => {
        console.log(subscription);
    }, [ subscription ])

    const manageSubscription = () => {
        if(subscription)
            setBillingLoading(true);
        goToBillingPortal();
    }

    return (
        <div className="my-6 border p-4 grid grid-cols-1 md:grid-cols-4 md:border-x-0 md:px-0">
            <div className="space-y-2">
                <h4 className="text-lg text-[gray]">Membership & Billing</h4>
                <button
                    disabled={ billingLoading || !subscription }
                    className="h-10 whitespace-nowrap bg-gray-300 w-3/5 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
                    onClick={manageSubscription}
                >
                    { billingLoading ? <Loader color={"dark:fill-[#e50914]"} /> : 'Cancel Membership'}
                </button>
            </div>

            <div className="col-span-3">
                <div className="flex flex-col md:flex-row justify-between border-b border-white/10 pb-4">
                    <div>
                        <p className="font-medium">{user?.email}</p>
                        <p className="text-[gray]">Password: ********</p>
                    </div>
                    <div className="md:text-right">
                        <p className="membership-link">Change email</p>
                        <p className="membership-link">Change password</p>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row py-4'>
                    <div>
                        <p>{subscription?.cancel_at_period_end ? 'Your membership will end on' : 'Your next billing is at '}{subscription?.current_period_end}</p>
                    </div>
                    <div className="md:text-right">
                        <p className="membership-link">Manage payment info</p>
                        <p className="membership-link">Add backup payment method</p>
                        <p className="membership-link">Billing details</p>
                        <p className="membership-link">Change billing day</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Membership