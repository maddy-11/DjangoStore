import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = (props) => {
  return (
        <PayPalScriptProvider options={{ clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
            <PayPalButtons style={{ layout: "horizontal" }} 
            createOrder={(data, actions) => {
            	return actions.order.create({
            		purchase_units: [
            			{
            				amount: {
            					value: "10.00"
            				}
            			}
            			]
            		}
            	)
            } }
            />
        </PayPalScriptProvider>
    );
}

export default PayPalPayment;