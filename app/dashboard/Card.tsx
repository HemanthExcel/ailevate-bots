import React from 'react';

interface CardProps {
  imageSrc: string;
  title: string;
  styleType?: 'default' | 'rounded' | 'bordered';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, styleType = 'default', onClick }) => {
  const cardStyles = {
    default: 'bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer',
    rounded: 'bg-white shadow-md rounded-full overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer',
    bordered: 'bg-white border border-gray-300 rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer',
  };
  
  return (
    <div className={cardStyles[styleType]} onClick={onClick}>
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-3">
        <h3 className="text-xl font-bold text-center">{title}</h3>
      </div>
    </div>
  );
};

export default Card;