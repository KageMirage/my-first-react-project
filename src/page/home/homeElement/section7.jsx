import React from 'react';
import img1 from '../svg/1.svg';
import img2 from '../svg/2.svg';
import img3 from '../svg/3.svg';
import img4 from '../svg/4.svg';
import img5 from '../svg/5.svg';

function Section7() { 
    return (
        <div className="w-full font-sans py-12 hidden lg:block">
            <h3 className="text-center text-[42px] tracking-wide uppercase font-normal mb-12 text-[#000000]">
                instagram
            </h3>
            
            <div className="grid grid-cols-5 gap-0 w-full">
                <div className="aspect-4/5 w-full overflow-hidden">
                    <img src={img1} alt="instagram 1" className="w-full h-full object-cover block" />
                </div>
                <div className="aspect-4/5 w-full overflow-hidden">
                    <img src={img2} alt="instagram 2" className="w-full h-full object-cover block" />
                </div>
                <div className="aspect-4/5 w-full overflow-hidden">
                    <img src={img3} alt="instagram 3" className="w-full h-full object-cover block" />
                </div>
                <div className="aspect-4/5 w-full overflow-hidden">
                    <img src={img4} alt="instagram 4" className="w-full h-full object-cover block" />
                </div>
                <div className="aspect-4/5 w-full overflow-hidden">
                    <img src={img5} alt="instagram 5" className="w-full h-full object-cover block" />
                </div>
            </div>
        </div>
    );
}

export default Section7;