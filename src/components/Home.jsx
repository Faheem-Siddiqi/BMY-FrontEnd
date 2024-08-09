import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Counter from './Home/Counter.jsx';
import Vision from '../assets/images/homeImage1.png';
import Mission from '../assets/images/HomeImage2.png';
import Footer from './layout/Footer.jsx'
import Navbar from './layout/Navs/Navbar.jsx'
import Proposal from './Researcher/proposals/Proposal.jsx';
export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <Navbar />
      <section className="xl:p-10 p-5 bg-alpha">
        <div className="w-full mx-auto text-left">
          <h1 className="text-4xl lg:text-5xl font-bold xl:w-[60%] text-black">
            BMY Health Pakistan,<br /> Benchmarking for your{' '}
            <span className="text-lambda">Healthcare</span>
          </h1>
          <p className="mt-4 text-lg text-gray-700 font-Satoshi-Black">
            We are a firm of Community Health Professionals registered in Pakistan in 2022.
            We have Professionals trained from renowned institutes across Pakistan, with diverse backgrounds.
          </p>
          <button className="mt-6 px-6 py-3 rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon">
            <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
            <Link
              to='/learn-more'
              >
              Learn More</Link>
          </button>
        </div>
      </section>
      <Counter />
      <section className="bg-lightBackground xl:px-10 px-5 py-1 items-center justify-center">
        <header className="bg-white shadow-sm my-10">
          <div className="flex md:flex-row flex-col items-center justify-center overflow-hidden">
            <div data-aos="fade-right" className="md:p-10 p-5 w-full md:w-[50%]">
              <img className="shadow-sm" src={Vision} alt="vision" />
            </div>
            <div data-aos="fade-left" className="md:p-10 px-5 pb-5 w-full md:w-[50%]">
              <h2 className="text-2xl font-WorkSans-Regular font-bold">
                Our Vision
              </h2>
              <p className="font-Satoshi-Black mt-2 text-neutral-700">
                Our vision is to develop systems where innovation and evidence lead change and transform the health system to provide the best care for all.
              </p>
            </div>
          </div>
        </header>
        <header className="bg-white shadow-sm my-10">
          <div className="flex md:flex-row flex-col items-center justify-center overflow-hidden">
            <div data-aos="fade-right" className="md:p-10 px-5 pt-5 w-full md:w-[50%]">
              <h2 className="text-2xl font-WorkSans-Regular font-bold">
                Our Mission
              </h2>
              <p className="font-Satoshi-Black mt-2 text-neutral-700">
                BMY health works towards building systems where evidence-based decisions are taken for healthcare and innovation is promoted to revolutionize health system for a healthier community.
              </p>
            </div>
            <div data-aos="fade-left" className="md:p-10 p-5 w-full md:w-[50%]">
              <img className="shadow-sm" src={Mission} alt="Mission" />
            </div>
          </div>
        </header>
      </section>
      <Footer />
    </>
  );
}
