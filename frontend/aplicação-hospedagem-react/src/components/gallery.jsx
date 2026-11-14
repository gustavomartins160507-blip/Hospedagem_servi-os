import { useState } from 'react';
import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';

const Gallery = ({images, width = '100%', height = 'auto', radius = 'xl', showThumbs}) => {
    const [currentIndex, setCurrentIndex] = usestate(0)


    if(!images || images.length === 0) return null


    const handleNext = () =>{

        if(currentIndex < imagens.length -1){
            setCurrentIndex(currentIndex + 1)
        }
    }

    const handlePrev = () =>{
        if(currentIndex > 0){
            setCurrentIndex(currentIndex - 1)
        }
    }

    return (
  <div
    style={{
      position: "relative",
      margin: "0 auto",
      width: width,
      height: height
    }}
  >
    <div
      style={{
        width: "100%",
        height: "400px",
        overflow: "hidden",
        borderRadius: radius === "xl" ? "0.75rem" : radius
      }}
    >
      <img
        src={images[currentIndex].src}
        alt={`Slide ${currentIndex + 1}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center"
        }}
      />
    </div>

    {/* Botão Anterior */}
    <button
      onClick={handlePrev}
      disabled={currentIndex === 0}
      aria-label="Imagem anterior"
      style={{
        position: "absolute",
        left: "8px",
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "white",
        padding: "8px",
        borderRadius: "50%",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        opacity: currentIndex === 0 ? 0.3 : 1,
        zIndex: 10,
        transition: "opacity 0.2s",
        border: "none"
      }}
    >
      <img src={arrowLeft} alt="Anterior" style={{ width: "24px", height: "24px" }} />
    </button>

    {/* Próximo Botão */}
    <button
      onClick={handleNext}
      disabled={currentIndex === images.length - 1}
      aria-label="Próxima imagem"
      style={{
        position: "absolute",
        right: "8px",
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "white",
        padding: "8px",
        borderRadius: "50%",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        opacity: currentIndex === images.length - 1 ? 0.3 : 1,
        zIndex: 10,
        transition: "opacity 0.2s",
        border: "none"
      }}
    >
      <img src={arrowRight} alt="Próxima" style={{ width: "24px", height: "24px" }} />
    </button>

    {/* Indicadores (Dots) */}
    <div
      style={{
        position: "absolute",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "8px",
        zIndex: 10
      }}
    >
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          aria-label={`Ir para slide ${index + 1}`}
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            transition: "all 0.2s",
            backgroundColor: currentIndex === index ? "#db2777" : "rgba(209,213,219,0.8)",
            transform: currentIndex === index ? "scale(1.1)" : "scale(1)",
            border: "none",
            padding: 0
          }}
        />
      ))}
    </div>

    {/* Miniaturas (Thumbnails) */}
    {showThumbs && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
          gap: "8px",
          flexWrap: "wrap"
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={`Miniatura ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "80px",
              height: "64px",
              objectFit: "cover",
              border: `2px solid ${currentIndex === index ? "#db2777" : "transparent"}`,
              cursor: "pointer",
              transition: "border 0.2s",
              borderRadius: radius === "xl" ? "0.75rem" : radius
            }}
          />
        ))}
      </div>
    )}
  </div>
);
}