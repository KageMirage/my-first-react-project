import React from 'react';
import { useNavigate } from 'react-router-dom';

function Section2() {
  const navigate = useNavigate();

  const categories = [
    { id: 1, title: "Верхняя одежда" },
    { id: 2, title: "Платья и комбинезоны." },
    { id: 3, title: "Топы и блузы" },
    { id: 4, title: "Низ" },
    { id: 5, title: "Домашняя одежда" },
    { id: 6, title: "Спортивная одежда." },
    { id: 7, title: "Аксессуары" }
  ];

  const CategoryClick = (categoryId) => {
    navigate(`/catalog?category=${categoryId}`);
  };

  return (
    <div className="w-full min-h-screen text-[#1E1E1E] py-16 px-4 md:px-8 flex flex-col justify-center font-serif">
      <div className="max-w-450 w-full mx-auto">
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide pb-6 pl-2">
          Категории
        </h2>

        <div className="border-t border-[#1E1E1E]/40">
          {categories.map((cat) => (
            <div key={cat.id} className="border-b border-[#1E1E1E]/40">
              <h3 
                onClick={() => CategoryClick(cat.id)}
                className="text-center text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl py-6 md:py-8 cursor-pointer transition-colors duration-300 hover:bg-[#1E1E1E]/5 select-none"
              >
                {cat.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Section2;