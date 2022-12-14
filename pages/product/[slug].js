import React, { useState } from "react";

import { client, urlFor } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";
import Product from "../../components/Product";

import Rating from "@mui/material/Rating";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

import Head from "next/head";

const ProductDetails = ({ product, products }) => {
  const { image, name, Details, price, description, slug } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="image" content={urlFor(image && image[0])} />
        <meta itemProp="name" content={`New Shades | ${name}`} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={urlFor(image && image[0])} />
        <meta property="og:title" content={`New Shades | ${name}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={urlFor(image && image[0])} />
        <meta
          property="og:url"
          content={"https://new-shades-sunglasses.vercel.app/product/" + slug}
        />
        <meta property="og:site_name" content={`New Shades | ${name}`} />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={`New Shades | ${name}`} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image:src"
          content={urlFor(image && image[0])}
        />
      </Head>
      <section className="product-detail-container lg:px-0 md:px-0 sm:px-0 px-3 lg:pr-6">
        <div>
          <div className>
            <img
              alt={name}
              src={urlFor(image && image[index])}
              className="product-detail-image shadow-xl"
            />
          </div>
          <div className="flex mt-6 space-x-4">
            {image?.map((img, i) => (
              <img
                src={urlFor(img)}
                alt={name}
                key={i}
                className={
                  i == index
                    ? "small-image selected-image shadow-lg"
                    : "small-image shadow-lg"
                }
                onMouseEnter={() => setIndex(i)}
                onClick={() => setIndex(i)}
              ></img>
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1 className="text-black font-bold text-4xl lg:mt-0 md:mt-0 sm:mt-0 mt-10">
            {name}
          </h1>
          <div className="reviews">
            <div>
              <Rating
                name="customized-color"
                defaultValue={5}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={0.5}
              />
            </div>
            <p>(20)</p>
          </div>
          <p align="justify">{description}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <p>Cantidad</p>
            <div className="flex justify-around ml-8 mt-1 sm:ml-0 md:ml-0 lg:ml-0 ">
              <ButtonGroup
                variant="outlined"
                color="error"
                aria-label="outlined button group"
              >
                {qty > 1 ? (
                  <Button size="small" aria-label="add" onClick={decQty}>
                    <RemoveIcon />
                  </Button>
                ) : (
                  <Button size="small" disabled aria-label="add">
                    <RemoveIcon />
                  </Button>
                )}
                <Button disabled className="disabled-text">
                  {qty}
                </Button>

                <Button size="small" aria-label="add" onClick={incQty}>
                  <AddIcon />
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div className="flex mt-10 space-x-6 lg:space-x-4">
            <Button
              variant="outlined"
              color="error"
              onClick={() => onAdd(product, qty)}
              className="lg:hover:shadow-xl  transition duration-300 ease-in-out"
            >
              A??adir al Carrito
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleBuyNow}
              className="bg-red-600 lg:hover:shadow-xl  transition duration-300 ease-in-out"
            >
              Comprar ya
            </Button>
          </div>
        </div>
      </section>
      <Accordion className="mx-2 mt-8 lg:mx-8 broski">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h4>Detalles</h4>
        </AccordionSummary>
        <AccordionDetails>
          {Details?.map((detail, i) => (
            <li key={i}>
              <b>{detail.substr(0, detail.indexOf(":") + 1)}</b>
              {detail.substr(detail.indexOf(":") + 1)}
            </li>
          ))}
        </AccordionDetails>
      </Accordion>

      <section className="maylike-products-wrapper">
        <h2>Productos que te pueden interesar</h2>
        <div className="">
          <div className="">
            <Product key={product._id} products={products} />
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
