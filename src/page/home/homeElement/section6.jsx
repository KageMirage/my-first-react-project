import React, { useState } from 'react';
import { sendContactForm } from '../../../data/allData/contact';
import image from '../svg/s6.svg';

function Section6() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const { error } = await sendContactForm(formData);

    if (!error) {
      setStatus('success');
      setFormData({ full_name: '', phone: '', message: '' });
    } else {
      setStatus('error');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-300 mx-auto px-5 py-10 font-sans">
      <h3 className="text-[32px] md:text-[42px] font-normal mb-8 text-[#1a1a1a]">
        Обратная связь
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2">
        
        <div className="w-full h-full">
          <img 
            src={image} 
            alt="Обратная связь" 
            className="w-full h-full object-cover hidden md:block"
          />
        </div>
        
        <form 
          onSubmit={handleSubmit} 
          className="bg-[#5c0000] p-8 md:p-14 flex flex-col justify-between"
        >
          <div>
            <h4 className="text-white text-xl font-normal mb-6">
              Написать нам
            </h4>
            
            <input 
              type="text" 
              name="full_name"
              placeholder="ФИО" 
              value={formData.full_name}
              onChange={handleChange}
              required 
              className="w-full bg-white text-black px-4 py-3 mb-4 outline-none text-base"
            />
            
            <input 
              type="tel" 
              name="phone"
              placeholder="Телефон" 
              value={formData.phone}
              onChange={handleChange}
              required 
              className="w-full bg-white text-black placeholder-[#b0b0b0] px-4 py-3 mb-4 outline-none text-base"
            />
            
            <textarea 
              name="message"
              placeholder="Напишите..." 
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required 
              className="w-full bg-white text-black placeholder-[#b0b0b0] p-4 outline-none text-base resize-none"
            />
          </div>

          {status === 'success' && (
            <p className="text-green-300 text-sm mt-3">Спасибо! Ваше сообщение успешно отправлено.</p>
          )}
          {status === 'error' && (
            <p className="text-red-300 text-sm mt-3">Ошибка при отправке. Попробуйте еще раз.</p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-8 border border-white/60 bg-transparent hover:bg-white/10 text-white py-3.5 text-center text-sm tracking-wide transition-colors duration-200 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Отправка...' : 'Отправить'}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Section6;