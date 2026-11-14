import { useState } from 'react';
import fireIcon from '../assets/fire.svg';
import dotsImage from '../assets/dots.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const sneakerImage =  'https://images.tcdn.com.br/img/img_prod/740066/tenis_nike_air_max_270_react_optical_preto_cinza_389_1_20200120160045.jpg'


const Hero = () =>{

    const[currentSLide, setCurrentSlide] = useState(0)
    const navigate = useNavigate()


    const slides = [{
        title: '',
        description:  'Descontos imperdíveis em tênis Nike para você renovar seu estilo.',
        image: sneakerImage,
    },{
        title: 'novidades de sapatos',
        description:  'Conheça os lançamentos mais estilosos.',
        image: sneakerImage,
    },{
        title: 'Tênis em Alta',
        description: 'Os modelos mais procurados com descontos especiais.',
        image: sneakerImage,
    },{
        title: 'Promoção Relâmpago',
        description: 'Só hoje: até 60% off em diversas marcas!',
        image: sneakerImage,
    }]


    useEffec(() => {
        const interval = setInterval(() =>{
            setCurrentSlide((prevSLide) => 
                prevSLide ===slides.length -1 ? 0 : prevSLide + 1
        )
        }, 2000)
        return () => clearInterval(interval)
    }, [slides.length])
    

    const goToproducts = () =>{
        navigate('/produtos')
        window.scrollTo(0, 0)
    }
    
    const current = slides[currentSLide]


    return(
    <section className="relative overflow-hidden py-3 px-4 md:px-8 lg:px-16 bg-[#f0f0f0]">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 
        w-[400px] h-[600px] md:w-[500px] md:h-[600px] 
        bg-gradient-to-t from-[#f0f0f0] to-white blur-2xl z-0">
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[500px_auto] items-center gap-10 max-w-7xl mx-auto min-h-[400px]">
        <div className="text-center lg:text-left max-w-[900px] mx-auto lg:mx-0 transition-all duration-300">
          <p className="text-yellow-500 text-sm font-semibold mb-2">
            Melhores ofertas personalizadas:
          </p>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 leading-snug mb-6">
          Queima de Estoque{' '}
          <span className="inline-flex items-center gap-2">
          Nike
            <img
              src={fireIcon}
              alt="Ícone de fogo"
              className="w-16 h-16 md:w-19 md:h-18 inline-block"
            />
          </span>
        </h1>

          <p className="text-gray-600 text-sm md:text-base font-normal mb-6 max-w-xl mx-auto lg:mx-0">
            {current.description}
          </p>

          <button
            onClick={goToProducts}
            className="bg-pink-600 hover:bg-pink-700 text-white px-12 py-2 rounded-lg font-semibold transition"
          >
            Ver Ofertas
          </button>
        </div>

        <div className="relative flex justify-center lg:justify-end items-center w-full">
          <img
            src={current.image}
            alt={current.title}
            className="w-full object-contain drop-shadow-xl transition-all duration-300"
          />

          <img
            src={dotsImage}
            alt="Pontinhos decorativos"
            className="hidden md:block absolute right-[-40px] top-[10%] w-[140px] h-[140px] pointer-events-none"
          />
        </div>
      </div>

      <div className="relative z-10 flex justify-center mt-6 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Selecionar slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-pink-600 scale-110' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
    )
}

export default Hero