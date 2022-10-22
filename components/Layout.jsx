import React from "react";
import Head from "next/head";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <html lang="es" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <title>New Shades</title>
        <link
          rel="icon"
          href="https://cdn.sanity.io/images/w0zrwraf/production/7967fc1fb7c18d8b3e9fe5ee212e2073f049daca-1920x1920.png"
        />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="New Shades, Lentes Polarizados para Cualquier Ocasión"
        />
        <meta
          name="image"
          content="https://cdn.sanity.io/images/w0zrwraf/production/7967fc1fb7c18d8b3e9fe5ee212e2073f049daca-1920x1920.png"
        />
        <meta itemProp="name" content={`New Shades`} />
        <meta
          itemProp="description"
          content="New Shades, Lentes Polarizados para Cualquier Ocasión"
        />
        <meta
          itemProp="image"
          content="https://cdn.sanity.io/images/w0zrwraf/production/7967fc1fb7c18d8b3e9fe5ee212e2073f049daca-1920x1920.png"
        />
        <meta property="og:title" content={`New Shades`} />
        <meta
          property="og:description"
          content={`New Shades, Lentes Polarizados para Cualquier Ocasión`}
        />
        <meta
          property="og:image"
          content="https://cdn.sanity.io/images/w0zrwraf/production/7967fc1fb7c18d8b3e9fe5ee212e2073f049daca-1920x1920.png"
        />
        <meta
          property="og:url"
          content={"https://new-shades-sunglasses.vercel.app"}
        />
        <meta property="og:site_name" content={`New Shades`} />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={`New Shades`} />
        <meta
          property="twitter:description"
          content="New Shades, Lentes Polarizados para Cualquier Ocasión"
        />
        <meta
          property="twitter:image:src"
          content="https://cdn.sanity.io/images/w0zrwraf/production/7967fc1fb7c18d8b3e9fe5ee212e2073f049daca-1920x1920.png"
        />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
