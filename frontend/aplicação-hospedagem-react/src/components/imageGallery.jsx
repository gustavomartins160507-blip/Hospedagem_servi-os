import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const imageGallery = ({images}) =>{
    const [selectedIndex, setSelectedIndes] = useState(0)
    const [prevImages, setPrevImages] = useState(images)

    if(images !== prevImages){
        setPrevImages(images)
        setSelectedIndex(0)
    }

    if(!images || images.length === 0){

        return(
            <div>
                Sem imagem
            </div>

        )
    }

    const selectNext = () => setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    const selectPrev = () => setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));


    return(
        <div className="flex flex-col gap-4">
      {/* Imagem Principal */}
      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        <img
          src={images[selectedIndex]}
          alt="Imagem principal do produto"
          className="w-full h-full object-contain transition-opacity duration-300"
        />
        
        {/* Setas (apenas se houver mais de uma imagem) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={selectPrev} 
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white focus:outline-none shadow-sm"
            >
              <FiChevronLeft size={24} />
            </button>
            <button 
              onClick={selectNext} 
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white focus:outline-none shadow-sm"
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas Selecionáveis */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((imgSrc, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`aspect-square w-full bg-gray-100 rounded-md overflow-hidden border-2 transition-all ${
                selectedIndex === index 
                  ? 'border-pink-500 shadow-md' 
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img 
                src={imgSrc} 
                alt={`Miniatura ${index + 1}`} 
                className="w-full h-full object-contain" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
    )
}

export default imageGallery