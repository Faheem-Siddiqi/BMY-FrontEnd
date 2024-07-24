import { useState ,useEffect } from "react";
import React from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from "react-scroll-trigger";
export default function Counter() {
  
  const [counterOn, setCounterOn] = useState(true);
  return (
    <>
      <section className=" xl:p-10 p-5 bg-lightBackground">
        <div className="text-left mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold md:w-[60%]">
            We’re a <span className="text-green-600">Team</span> of International Experts!
          </h1>
          <p className="mt-4  text-neutral-600 font-Satoshi-Black">
            We believe in setting new trends and designing innovative solutions for health problems, improving implementation of health projects through better planning, and working on all factors involved in making implementation a success.
          </p>
        </div>
        <ScrollTrigger
        className="mt-10"
          onEnter={() => { setCounterOn(true); }}
          onExit={() => { setCounterOn(false); }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6  min-h-[15rem] rounded-lg shadow-lg   border border-opacity-15 text-center">
              <h2 className="text-5xl my-5 font-bold text-green-600 font-WorkSans-Regular">
                {counterOn && (
                  <CountUp start={0} end={110} duration={2} delay={0} />
                )}
              </h2>
              <p className="my-5 text-gray-600 font-Satoshi-Black">Healthcare Professionals trained in Research Methodology</p>
            </div>
            <div className="bg-white p-6  min-h-[15rem] rounded-lg shadow-lg  border border-opacity-15 text-center">
              <h2 className="text-5xl my-5 font-bold text-green-600 font-WorkSans-Regular">
                {counterOn && (
                  <CountUp start={0} end={110} duration={2} delay={0} />
                )}
                +
              </h2>
              <p className="my-5 text-gray-600">Healthcare Researchers Successfully Completed Internship</p>
            </div>
            <div className="bg-white p-6  min-h-[15rem] rounded-lg shadow-lg  border border-opacity-15 text-center">
              <h2 className="text-5xl my-5 font-bold text-green-600 font-WorkSans-Regular">
                {counterOn && (
                  <CountUp start={0} end={110} duration={2} delay={0} />
                )}
              </h2>
              <p className="my-5 text-gray-600 font-Satoshi-Black">Research Internship Batches Facilitated</p>
            </div>
            <div className="bg-white p-6  min-h-[15rem] rounded-lg shadow-lg  border border-opacity-15 text-center">
              <h2 className="text-5xl my-5 font-bold text-green-600 font-WorkSans-Regular">
                {counterOn && (
                  <CountUp start={0} end={500} duration={2} delay={0} />
                )}
                +</h2>
              <p className="my-5 text-gray-600 font-Satoshi-Black">Positive Reviews</p>
            </div>
          </div>
        </ScrollTrigger>
        <button class=" mt-6 px-6 py-3 rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
          <span class="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
          Learn More
        </button>
      </section>
    </>
  );
}
