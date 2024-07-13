// import Logo from './assets/images/BMYLogoLetter.png'
import LetterBg from '../assets/images/LetterBg.png'

function Letter() {
  return (
    <>
      <div className='gap-3 flex flex-col md:flex-row items-center bg-primary border m-5'>
        <div className='md:w-[20%] bg-white'>
          <img className='md:my-[25%] h-[70px] md:mx-auto hidden md:block' src={LetterBg} alt="Logo" />
        </div>
        <div className='text-center font-Cambria tracking-widest h-full w-full'>
          <h2 className='text-white  text-3xl border-b border-white border-opacity-20 font-semibold py-4'>BMY Health</h2>
          <div className=' py-2'>
            <p className='text-white  md:text-2xl  xl:text-3xl  font-semibold'>Ethics Review Committee</p>
            <p className='text-white  md:text-2xl  xl:text-3xl  font-semibold  '>Clearance Letter</p>
          </div>
        </div>
      </div>
      <div className='m-5 font-Cambria text-lg ' >
      
<div className='my-2'>
<b>Department:</b> <u >Ethical Review Committee</u>
</div>
<div className='my-2'>
<b >Date:</b> <span >12 Jan 2020</span>
</div>

<div className='my-2'>
<b >Subject:</b> <span >Approval Letter of Research Project “  ” by Ethical Review Committee (ERC), BMY Health</span>
</div>

<div className='my-2'>
<b >Submitted By:</b> <span >Dr. Faheem </span>
</div>

<div className='my-2'>
<b >Protocol Number:</b> <span >BMY-ERC2-06-2024</span>
</div>

<div className='my-4 relative'>
<img className='absolute  w-[240px]  top-0 mx-[35%]' src={LetterBg} alt="Bg" 
        style={{zIndex:'-1'}}/>
The project titled 'Assessing Health and Economic Ramifications of Smog' received clearance from BMY Health on date…, having met the ethical guidelines and standards established by the Ethical Review Committee (ERC) at BMY Health. This clearance ensures that the team demonstrated compliance with all necessary ethical protocols required by BMY Health Ethics Review Committee.
Approved version of manuscript: [link to submission]
</div>


<div className='flex w-full md:flex-row flex-col justify-between '>
<div className=''>
<b >Dated:</b> <span >06-2024</span>
</div>

<b >For Chair</b> 

<div>
  
</div>
</div>


      </div>
    </>
  )
}
export default Letter
