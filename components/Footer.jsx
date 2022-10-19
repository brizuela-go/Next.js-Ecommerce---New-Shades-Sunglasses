import React from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';
import Link from 'next/link';

// get current year
const year = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="footer-container">
      <p>{year} New Shades</p>
      <p className="icons">
        <Link href="https://www.instagram.com/">
          <a>
            <AiFillInstagram />
          </a>
        </Link>
        <Link href="https://twitter.com/"> 
        <a>
          <AiOutlineTwitter />
        </a>
        </Link>
      </p>
    </div>
  )
}

export default Footer