import whiteLogo from '../svg/whiteLogo.svg';
import instagram from '../svg/instagram.svg';
import whatsapp from '../svg/whatsapp.svg';
import { Link } from 'react-router-dom';
import phone from '../svg/phone.svg';
import email from '../svg/email.svg';

import { useDispatch } from 'react-redux';
import { toggleCart } from '../../data/allData/redux/addData/cartSlice';

function Footer() {
    const dispatch = useDispatch();

    const handleOpenCart = () => {
        dispatch(toggleCart(true)); // Открываем корзину
    };

    return (
        <footer className="bg-[#600000] text-white pt-12 pb-12 px-6 md:px-12 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col items-start md:items-center">
                
                <div className="mb-10 self-start md:self-center">
                    <img src={whiteLogo} alt="NTS Logo" className="h-28 w-auto md:h-24" />
                </div>

                <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 mb-8 text-base md:text-sm tracking-wide w-full md:w-auto items-start md:items-center">
                    <Link to="/" className="hover:opacity-80 transition-opacity">Главная</Link>
                    <Link to="/catalog" className="hover:opacity-80 transition-opacity">Каталог</Link>
                    <Link to="/favorite" className="hover:opacity-80 transition-opacity">Избранные</Link>
                    <button 
                        type="button" 
                        onClick={handleOpenCart} 
                        className="hover:opacity-80 transition-opacity cursor-pointer text-left md:text-center"
                    >
                        Корзина
                    </button>
                </nav>

                <div className="w-2/3 max-w-50 md:w-full md:max-w-none border-t border-white/40 my-2 md:my-6"></div>

                <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center items-start md:items-center gap-y-5 md:gap-x-8 md:gap-y-4 mt-6 md:mt-0 text-sm tracking-wide w-full md:w-auto">
                    
                    <a href="tel:0010092142" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <img src={phone} alt="Phone" className="w-4 h-4 opacity-90" />
                        <span>(00) 1009-2142</span>
                    </a>

                    <a href="https://wa.me/0023789987" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <img src={whatsapp} alt="WhatsApp" className="w-4 h-4 opacity-90" />
                        <span>(00) 2378-9987</span>
                    </a>

                    <a href="mailto:contact@nstbuotiquo.com" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <img src={email} alt="Email" className="w-4 h-4 opacity-90" />
                        <span>contact@nstbuotiquo.com</span>
                    </a>

                    <a href="https://instagram.com/nstbuotiquo" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <img src={instagram} alt="Instagram" className="w-4 h-4 opacity-90" />
                        <span>@nstbuotiquo</span>
                    </a>

                </div>
            </div>
        </footer>
    );
}

export default Footer;