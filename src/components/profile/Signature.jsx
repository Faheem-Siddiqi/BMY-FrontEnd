import React, { useState, useRef } from 'react';
import { IoTrashBin } from "react-icons/io5";
import Sign from '../../assets/images/sign.png'
import SignatureCanvas from 'react-signature-canvas';
export default function
    () {
    const [signPad, setSignPad] = useState(null);
    const [signUrl, setSignUrl] = useState('');
    const handleSignClear = () => {
        if (signPad) {
            signPad.clear();
        }
    };
    const handleSignSubmit = () => {
        if (signPad) {
            setSignUrl(signPad.getTrimmedCanvas().toDataURL('image/png'));
            console.log(signUrl);
        }
    };
    return (
        <>
            <h1 className='text-3xl font-bold font-Satoshi-Black'>Signature</h1>
            <header className='bg-white shadow-sm my-5 p-10'>
                <section>
                    <div className='my-2'>
                        <h1 className='font-bold  text-xl'>Signature</h1>
                        <p className='font-semibold my-2'>Add your signature</p>
                        {signUrl === 'no' && (
                            <div>
                                <span className=''>Upload your signature or</span>
                                <span className='ml-1 text-epsilon cursor-pointer font-semibold  border-b border-b-epsilon' onClick={() => setSignUrl('')}>Change to Create Sign</span>
                                <div className='border-2  my-5 rounded-xl w-full md:w-[60%] overflow-hidden bg-iota border-epsilon border-dashed '>
                                    <label htmlFor="upload-sign">
                                        <img
                                            className='m-auto' src={Sign} alt="sign" /></label>
                                </div>
                                <div className='flex gap-3 md:flex-row flex-col'>
                                    <label
                                        htmlFor='upload-sign'
                                        className=" py-2 px-5 rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                                        <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                        Upload
                                    </label>
                                    <input
                                        name='upload-sign'
                                        id='upload-sign' className='w-0' type="file" />
                                    <button
                                        className=" py-2 px-5 rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                                        <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}
                        {signUrl !== 'no' && (<>
                            <span className=''>Click on the box below to draw you signature using Mouse or pen or</span>
                            <span className='ml-1 text-epsilon cursor-pointer font-semibold border-b border-b-epsilon' onClick={() => setSignUrl('no')}>Change to Upload Sign</span>
                            <div className='border-2 my-5 rounded-xl w-full md:w-[60%] overflow-hidden border-epsilon border-dashed'>
                                <SignatureCanvas
                                    penColor='green'
                                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                                    ref={(ref) => setSignPad(ref)}
                                />
                            </div>
                            <div className='flex gap-3   md:flex-row flex-col'>
                                <button
                                    onClick={handleSignSubmit}
                                    className=" py-2 px-5 rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                                    <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                    Submit
                                </button>
                                <button
                                    onClick={handleSignClear}
                                    className="  py-2 px-5 rounded-md  group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out ">
                                    <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                                        <IoTrashBin /> <span className='mx-2'>Undo</span>
                                    </span>
                                    <span className="ease absolute flex h-full w-full transform items-center justify-center text-epsilontransition-all duration-300 group-hover:translate-x-full">Undo</span>
                                    <span className="invisible relative"> x Undo </span>
                                </button>
                            </div>
                        </>
                        )}
                    </div>
                </section>
            </header>
        </>
    )
}
