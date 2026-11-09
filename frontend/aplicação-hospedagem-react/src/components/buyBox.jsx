import {useContext} from "react"
import {useCart} from '../contexts/cartcontext'

const BuyBox =({
    name,
  reference,
  stars,
  rating,
  price,
  priceDiscount,
  description,
  product, 
  children, 

}) =>{

    const {addTocart} = useContext(useCart)

    const handleAddToCart = () =>{

    addTocart(product)

    }

    return(

        
        <div className="product-details">

            <h1>{name}</h1>

            <p className="product-reference">{reference}</p>

            <div className="product-rating">
                <span className="product-stars">{stars} ★</span>
                <span className="rating-count">({rating} avaliações)</span>
            </div>

            <div className="product-price">
                <span className="current-price">
                    R${priceDiscount ? priceDiscount.toFixed(2) : price.toFixed(2)}
                </span>

                {priceDiscount && (
                    <span className="old-price">
                        R${price.toFixed(2)}
                    </span>
                )}
            </div>

            <p className="product-description">{description}</p>

            {children}

            <button
                onClick={handleAddToCart}
                className="buy-button"
            >
                Comprar
            </button>

        </div>

    )
}
export default BuyBox