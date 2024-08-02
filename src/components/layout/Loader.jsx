import React, { useState, useEffect } from 'react';
function Loader() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(prev => !prev);
    }, 700); // 
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="  min-h-screen min-w-screen flex items-center justify-center ">
      <div
        className={`transition-opacity duration-1000 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className='font-CormorantGaramond-Regular items-center justify-center flex flex-col w-fit'>
          <h1 className="text-3xl gap-1 flex">
          
            <p className='text-zeta font-bold'>BMY</p>
            <p className='text-primary font-semibold'>Health</p>
          </h1>
          <p className='font-light text-lg text-mist'>Pakistan</p>
        </div>
      </div>
    </div>
  );
}
export default Loader;
