import React, { useState, useRef } from 'react';
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
                                        className='py-2 px-5 rounded-md  cursor-pointer text-white w-fit bg-epsilon'>Uplsoad</label>
                                    <input
                                        name='upload-sign'
                                        id='upload-sign' className='w-0' type="file" />
                                    <button
                                        className='py-2 px-5 rounded-md  hover:text-white border   text-epsilon  border-epsilon w-fit duration-500 hover:bg-epsilon'>Submit</button>
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
                                    className='py-2 px-5 rounded-md cursor-pointer text-white w-fit bg-epsilon'>Submit</button>
                                <button
                                    onClick={handleSignClear}
                                    className='py-2 px-5 rounded-md  hover:text-white border   text-epsilon  border-epsilon w-fit duration-500 hover:bg-epsilon'>Clear</button>
                            </div>
                        </>
                        )}
                    </div>
                </section>
            </header>
        </>
    )
}
