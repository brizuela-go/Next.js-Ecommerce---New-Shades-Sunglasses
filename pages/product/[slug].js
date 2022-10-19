import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { client, urlFor } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";
import Product from "../../components/Product";

import Rating from "@mui/material/Rating";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";

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
        <title>New Shades | {name}</title>
        <meta charset="utf-8" />
        <meta name="description" content={description} />
        <meta name="image" content={urlFor(image && image[index])} />
        <meta itemprop="name" content={`Las Salsas | ${name}`} />
        <meta itemprop="description" content={description} />
        <meta itemprop="image" content={urlFor(image && image[index])} />
        <meta property="og:title" content={`Las Salsas | ${name}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={urlFor(image && image[index])} />
        {/* <meta
          property="og:url"
          content={"https://las-salsas.vercel.app/recipes/" + slug}
        /> */}
        <meta property="og:site_name" content={`Las Salsas | ${name}`} />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={`Las Salsas | ${name}`} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image:src"
          content={urlFor(image && image[index])}
        />
      </Head>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images">
            {image?.map((img, i) => (
              <img
                src={urlFor(img)}
                key={i}
                className={
                  i == index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              ></img>
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
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
            <h3>Cantidad</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Añadir al Carrito
            </button>

            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Comprar ya
            </button>
          </div>
        </div>
      </div>
      <div>
        <Container maxWidth="xl">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Detalles</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {Details?.map((detail, i) => (
                  <li key={i}>
                    <b>{detail.substr(0, detail.indexOf(":") + 1)}</b>
                    {detail.substr(detail.indexOf(":") + 1)}
                  </li>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </div>
      <div className="maylike-products-wrapper">
        <h2>Productos que te pueden interesar</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
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
