import React from "react";
import Link from "next/link";
import Typed from "react-typed";

const HeroBanner = ({ heroBanner }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="pt-16 sm:pb-40 lg:pt-40 lg:pb-48 pb-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              New Shades
            </h1>
            <p className="mt-4 text-lg text-gray-500 lg:text-xl">
              Con su diseño minimalista y su estilo único, estos lentes de sol
              polarizados con certificación UV:400, son adecuados para{" "}
              <Typed
                strings={[
                  "cualquier ocasión.",
                  "ciclistas.",
                  "motociclistas.",
                  "proteger tus ojos.",
                ]}
                typeSpeed={80}
                backSpeed={100}
                loop
              />
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl lg:block md:block hidden"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="lg:flex items-center sm:space-x-0 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-96 overflow-hidden rounded-lg lg:ml-20 shadow-xl lmao">
                        <img
                          src="https://s.alicdn.com/@sc04/kf/H8a22eb6385f842cca929b1435290824fQ.jpg_960x960.jpg"
                          alt="New Shades"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline lg:hidden md:hidden">
                <div className="h-80 w-80 overflow-hidden rounded-lg shadow-xl">
                  <img
                    src="https://s.alicdn.com/@sc04/kf/H8a22eb6385f842cca929b1435290824fQ.jpg_960x960.jpg"
                    alt="New Shades"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <Link href="/product/black-and-red">
                <button className="mt-6 lg:mt-0 inline-block rounded-md border border-transparent bg-red-600 py-3 px-24 lg:px-8 md:px-8 text-center font-medium text-white hover:bg-red-700 lg:hover:shadow-xl lg:hover:-translate-y-2 transition duration-300 ease-in-out">
                  Comprar ahora
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
