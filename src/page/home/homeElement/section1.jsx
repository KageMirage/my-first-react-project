import leftSvg from '../svg/left.svg';
import rightSvg from '../svg/right.svg';
import centerSvg from '../svg/center.svg';
import leftUpIcon from '../../../assets/svg/leftUp.svg';
import { Link } from 'react-router-dom';

function HomeS1() {
    return (
        <section className="relative w-full min-h-screen bg-[#6c0303] flex flex-col justify-end lg:justify-center items-center overflow-hidden pb-10 lg:pb-0">
            
            <div className="absolute inset-0 z-0 flex w-full h-full pt-0 ">
                <div className="relative w-full h-full lg:block">
                    <img
                        src={leftSvg}
                        alt="Left fashion"
                        className="object-cover w-auto h-full mx-auto"
                    />
                </div>

                <div className="relative hidden w-full h-full bg-[#dc0000] lg:block">
                    <img
                        src={centerSvg}
                        alt="Center fashion"
                        className="object-cover w-auto h-full mx-auto"
                    />
                </div>

                <div className="relative hidden w-full h-full lg:block">
                    <img
                        src={rightSvg}
                        alt="Right fashion"
                        className="object-cover w-auto h-full mx-auto"
                    />
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 text-center">
                
                <h1 className="text-black text-5xl top-17 md:text-7xl lg:text-[150px] font-serif tracking-wide drop-shadow-md lg:absolute lg:z-20 lg:bottom-1/2 lg:-translate-y-10 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:mb-0">
                    Новинки
                </h1>

                <div className="w-full max-w-md lg:max-w-2xl bg-white/10 backdrop-blur-md border border-white/10 rounded-none py-8 px-6 lg:pt-14 lg:pb-10 flex flex-col items-center shadow-2xl lg:mt-32">
                    <p className="mb-6 text-black text-base md:text-lg lg:text-[19px] tracking-wide max-w-xs md:max-w-md">
                        Сочетание комфорта и элегантности для нового сезона.
                    </p>

                    <div className="flex items-center gap-4 md:gap-6">
                        <Link 
                            to="/catalog" 
                            className="bg-[#590404] hover:bg-[#400202] text-white text-xs md:text-base tracking-wider uppercase py-3 px-8 md:px-10 transition-colors duration-300 flex items-center justify-center"
                        >
                            Каталог
                        </Link>
                        <Link
                            to="/catalog"
                            className="bg-[#590404] hover:bg-[#400202] p-3 md:p-4 transition-colors duration-300 flex items-center justify-center"
                        >
                            <img src={leftUpIcon} alt="Arrow" className="w-3 h-3 md:w-4 md:h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeS1;