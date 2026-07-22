import React from 'react';
import first from '../svg/s41.svg';
import second from '../svg/s42.svg';
import third from '../svg/s43.svg';

function Section4() {
    return (
        <div className="max-w-325 mx-auto px-5 py-10 font-sans">
            <h3 className="text-[64px] font-normal mb-8 text-[#1a1a1a]">
                В тренде
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2.9fr] gap-6 items-start">
                
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col">
                        <div className="w-full">
                            <img 
                                src={first} 
                                alt="Сумки" 
                                className="w-full h-61 object-cover block"
                            />
                        </div>
                        <h4 className="text-lg font-semibold text-[#1a1a1a] mb-1">Сумки</h4>
                        <p className="text-sm text-[#767676]">Все еще в тренде</p>
                    </div>

                    <div className="flex flex-col">
                        <div className="w-full">
                            <img 
                                src={second} 
                                alt="Туфли" 
                                className="w-full h-60 object-cover block"
                            />
                        </div>
                        <h4 className="text-lg font-semibold text-[#1a1a1a] mb-1">Туфли</h4>
                        <p className="text-sm text-[#767676]">Все еще в тренде</p>
                    </div>
                </div>
                
                <div className="flex flex-col">
                    <div className="w-full ">
                        <img 
                            src={third} 
                            alt="Наборы косметики" 
                            className="w-full h-full  block"
                        />
                    </div>
                    <h4 className="text-lg font-semibold text-[#1a1a1a] mb-1">Наборы косметики</h4>
                    <p className="text-sm text-[#767676]">Все еще в тренде</p>
                </div>

            </div>
        </div>
    );
}

export default Section4;