import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { createPaymentIntent } from '@/services/api/payment';

const stripePromise = loadStripe('pk_test_51PdZxoKwCQAPcTRSuvoS6QsQJp2P1JYD507CdVDkQiUNmSWfzpBnKQmK2nhUf3LV5E64a1xStrZXRm4wSmPaaYkS00WlRyVNFI');

const CheckoutForm = ({ amount, connectedAccountId, onPaymentSuccess }: PaymentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const cardElement = elements?.getElement(CardElement);

    try {
      const response = await createPaymentIntent(
        amount,
        connectedAccountId,
      );

      const { clientSecret } = response.data;

      if (stripe && cardElement) {
        const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

        if (confirmError) {
          setError(confirmError.message);
        } else {
          onPaymentSuccess();
        }
      } else {
        toast.error("Houve um erro ao iniciar o pagamento")
      }

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div>{error}</div>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

interface PaymentProps {
  amount: string,
  connectedAccountId: string,
  onPaymentSuccess: any
}

const PaymentForm = ({ amount, connectedAccountId, onPaymentSuccess }: PaymentProps) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} connectedAccountId={connectedAccountId} onPaymentSuccess={onPaymentSuccess} />
  </Elements>
);

export default PaymentForm;
