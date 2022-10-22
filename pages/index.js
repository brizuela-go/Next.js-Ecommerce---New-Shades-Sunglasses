import React from "react";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";
import Categories from "../components/Categories";
import BetterCart from "../components/BetterCart";

const Home = ({ products, bannerData }) => (
  <div>
    <BetterCart />
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
    <Categories />;
    <div className="products-heading">
      <h2 className=" text-black">
        Beautiful UI components, crafted with Tailwind CSS.
      </h2>
    </div>
    <div className="products-container">
      {products?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
