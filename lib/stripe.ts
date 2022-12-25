import { 
    createCheckoutSession,
    getStripePayments 
} from '@stripe/firestore-stripe-payments';

import { 
    getFunctions,
    httpsCallable 
} from '@firebase/functions';
import app from '../firebase';

const payments = getStripePayments(app, {
    productsCollection: 'products',
    customersCollection: 'customers'
});

const loadCheckout = async (priceId: string) => {
    try {
        const snapshot = await createCheckoutSession(payments, {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        });
        console.log(snapshot);
        window.location.assign(snapshot.url);
        console.log(snapshot);
    }catch(err: unknown) {
        console.log("hi");
        if(err instanceof Error) {
            console.error(err.message);
        }
    }
}

export const goToBillingPortal = async () => {
    const instance = getFunctions(app, 'us-central1');
    const functionRef = httpsCallable(instance, 'ext-firestore-stripe-payments-createPortalLink');

    await functionRef({
        returnUrl: `${window.location.origin}/account`
    })
    .then(({data}: any) => window.location.assign(data.url))
    .catch((err: unknown) => {if(err instanceof Error) console.error(err)});
}

export default payments;
export { loadCheckout }