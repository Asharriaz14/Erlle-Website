import PropTypes from "prop-types";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

const Pricing = ({ songData }) => {
  const product = {
    name: songData.name,
    price: songData.allow_listen,
  };

  const navigate = useNavigate();

  const makePayment = async (token) => {
    const body = { token, product };
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await fetch(`http://localhost:8282/payment`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (response.ok) {
        navigate("/success", { state: { songData }});
      } else {
        navigate("/");
        console.error("Payment failed");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="py-2 px-4 max-w-screen-2xl mx-auto md:mx-auto lg:mx-20 xl:mx-52 xl:px-24 md:px-32 2xl:m-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div>
          <p className="text-[#D7D7D7] text-xl">Price: {songData ? songData.allow_listen : 'Loading'}</p>
        </div>
        <div>
          <StripeCheckout 
            stripeKey={import.meta.env.VITE_PUBLIC_PAYMENT_KEY}
            token={makePayment}
            name="Buy Music"
            amount={product.price * 100}
          >
            <button className="btnPrimary">Buy Music</button>
          </StripeCheckout>
          <p className="text-[#A0A0A0] text-base mt-4">*Bluetooth Earbuds Required</p>
        </div>
      </div>
    </div>
  );
};

Pricing.propTypes = {
  songData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    allow_listen: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default Pricing;
