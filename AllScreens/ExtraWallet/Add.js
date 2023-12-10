import React from 'react';
import { WebView } from 'react-native-webview';

const Add = () => {
  const razorpayScript = `
    document.addEventListener("DOMContentLoaded", function() {
      var options = {
        "key": "rzp_test_5lSkJjLjmY7WgI",
        "amount": 2000, // amount in the smallest currency unit
        "currency": "INR",
        "name": "Your Company Name",
        "description": "Purchase Description",
        "image": "https://example.com/logo.png",
        "handler": function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
        },
        "prefill": {
          "name": "John Doe",
          "email": "john@example.com",
          "contact": "9999999999"
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };
      var rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
    });
  `;

  return (
    <WebView
      source={{
        html: `
          <html>
            <head>
              <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            </head>
            <body>
              <form>
                <script>
                  ${razorpayScript}
                </script>
              </form>
            </body>
          </html>
        `,
      }}
    />
  );
};

export default Add;
