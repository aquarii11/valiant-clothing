import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
const {REACT_APP_STRIPE_KEY} = process.env;
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =REACT_APP_STRIPE_KEY
  
  const onToken = token => {
    console.log(token);
    alert('Payment Succesful!');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={(token)=>onToken(token)}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;