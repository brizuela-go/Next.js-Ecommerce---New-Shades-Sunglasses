import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>¡Gracias por tu órden!</h2>
        <p className="email-msg"></p>
        <p className="description">
          Si tienes alguna duda, contáctanos a través de nuestro correo:
          <a className="email" href="mailto:newshadessunglasses@gmail.com">
            newshadessunglasses@gmail.com
          </a>
        </p>
        <Link href="/">
          <button className="mt-10 inline-block rounded-md border border-transparent bg-red-600 py-3 px-24 lg:px-8 md:px-8 text-center font-medium text-white hover:bg-red-700 lg:hover:shadow-xl lg:hover:-translate-y-2 transition duration-300 ease-in-out">
            Continuar Comprando
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
