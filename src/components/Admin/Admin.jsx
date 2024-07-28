import React, {useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Bena from '../../assets/images/Profile.png'
import AddErc from './AddErcs.jsx'
import AddTeamMembers from '../Researcher/group-members/AddTeamMembers'
export default function Admin() {

    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: false,
        });
        AOS.refresh();
      }, []);

  return (
<>
<div className='font-WorkSans-Regular bg-iota pb-20'>
    <div className=''>
    <div className="relative ">
      <img
        src='https://bmyhealth.com/wp-content/uploads/2024/02/1.jpg'
        className="absolute inset-0 object-cover w-full h-full"
        alt=""
      />
      <div className="relative bg-opacity-75 bg-deep-purple-accent-700">
        <svg
          className="absolute inset-x-0 md:-bottom-6 -bottom-4 text-white"
          viewBox="0 0 1160 180"
        >
          <path
            fill="#F3FFF3"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg>
        <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2
              
              data-aos="fade-right" 
              className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                The quick, brown fox <br className="hidden md:block" />
                jumps over a lazy dog
              </h2>
              <p 
              
              data-aos="fade-right" 
              className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudan, totam rem aperiam, eaque ipsa
                quae.
              </p>
            </div>
            <div 
            data-aos="fade-left" className="w-full max-w-xl xl:px-8 xl:w-5/12">
<div class="w-full max-w-md py-4 px-6 bg-white border border-gray-200 rounded-lg shadow  :bg-gray-800 :border-gray-700">
    <div 
    
    class="flex items-center justify-between mb-4">
        <h5 class="text-2xl m-5 font-bold leading-none text-gray-900 :text-white">ERC Panel</h5>
   </div>
   <div class="">
        <ul role="list" class="">
            <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="w-10 h-10 rounded-full" src={Bena} alt="Neil image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate :text-white">
                            Neil Sims
                        </p>
                        <p class="text-sm text-gray-500 truncate :text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                    <div class="inline-flex items-center font-semibold text-epsilon ">
                        Head
                    </div>
                </div>
            </li>
            <li class="py-3 sm:py-4">
                <div class="flex items-center ">
                    <div class="flex-shrink-0">
                    <img class="w-10 h-10 rounded-full" src={Bena} alt="Neil image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900  :text-white">
                            Bonnie Green
                        </p>
                        <p class="text-sm text-gray-500  ">
                            email@windster.com
                        </p>
                    </div>
                    <div class="inline-flex items-center font-semibold text-epsilon ">
                    </div>
                </div>
            </li>
            <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                    <img class="w-10 h-10 rounded-full" src={Bena} alt="Neil image"/>                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate :text-white">
                            Michael Gough
                        </p>
                        <p class="text-sm text-gray-500 truncate :text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                </div>
            </li>
            <li class="py-3 sm:py-4">
                <div class="flex items-center ">
                    <div class="flex-shrink-0">
                    <img class="w-10 h-10 rounded-full" src={Bena} alt="Neil image"/>                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate :text-white">
                            Lana Byrd
                        </p>
                        <p class="text-sm text-gray-500 truncate :text-gray-400">
                            email@windster.com
                        </p>

                     
                    </div>
                </div>
            </li>
            <li class="pt-3 pb-0 sm:pt-4">
                <div class="flex items-center ">
                    <div class="flex-shrink-0">
                    <img class="w-10 h-10 rounded-full" src={Bena} alt="Neil image"/>                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate :text-white">
                            Thomes Lean
                        </p>

                        <AddErc/>
                        <p class="text-sm text-gray-500 truncate :text-gray-400">
                            email@windster.com
                        </p>
                    </div>
                </div>
            </li>
        </ul>
   </div>
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
