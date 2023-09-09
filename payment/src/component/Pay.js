import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {useState, useEffect} from 'react';
import axios from "axios"


export default function Pay() {
    const[stripeToken, setStripeToken] = useState(null);
    const KEY="pk_test_51NmxxPSBHGxJzSCQNdvYZuUZ9Zq49QQ95H38ZLi5qCFlAeB7Eopb8to5Ct9Ua55mmgc77ZmG4eTrZO8ReHtzmhbx00lRWwNxVi"

    const onToken = (token) => {
      setStripeToken(token);
      console.log(token);
      }

    useEffect(()=>{
      const makeRequest=async()=>{
        try{
        const res= await axios.post("http://localhost:5000/api/checkout/payment",{
          tokenId:stripeToken.id,
          amount:2000,
         })  
         console.log(res.data)
        }
        
        catch(err){
          console.log(err);
        }
      };
      stripeToken && makeRequest()
    },[stripeToken])

  return (
    <div>
        <StripeCheckout
        name="Fashion shop"
        image="https://w7.pngwing.com/pngs/727/410/png-transparent-four-arms-vilgax-ben-10-character-ben-10-superhero-people-fictional-character.png"
        billingAddress
        shippingAddress
        description='your total is $20'
        amount={2000}
        token={onToken}
        stripeKey={KEY}
        >
        <button>Pay</button>
        </StripeCheckout>
      </div>
  )
}
