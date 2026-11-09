import { useNavigate } from "react-router-dom";
import {useCart} from '../../contexts/cartcontext';


const ProductCard = ({ product }) =>{

    const {image, price, priceDiscount, id, category, name} = product
    const {cartItems, addToCart, removeFromCart} = useCart()
    const navigate = useNavigate()

    const isInCart = cartItems.some((item) => item.id === id)

    const discountPercentage = 
    typeof price === "number" &&
    typeof priceDiscount === "number" &&
    priceDiscount < price
    ? Math.round(((price - priceDiscount) / price) * 100)
    : null


    const formatPrice = (value) =>{
        if (typeof value !== 'number') return null;
        return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        }).format(value);
    }

    const handleCartClick = () =>{

        if(isInCart){
            removeFromCart(id)
        }
        else{
            addToCart(product)
        }

    }

    const handleViewMore = () =>{
        navigate(`/produto/${id}`);
        window.scrollTo(0, 0);
    }

    
return (
    <div className="product-card">

        <div className="product-card-image">

            {discountPercentage && (
                <span className="product-discount">
                    {discountPercentage}% OFF
                </span>
            )}

            <img
                src={image}
                alt={`imagem do produto ${name}`}
            />

        </div>

        <div className="product-card-info">

            <p className="product-category">
                {category || 'Produto'}
            </p>

            <p className="product-name">
                {name}
            </p>

            <div className="product-prices">

                {typeof price === 'number' && priceDiscount && (
                    <span className="old-price">
                        {formatPrice(price)}
                    </span>
                )}

                <span className="current-price">
                    {formatPrice(priceDiscount ?? price)}
                </span>

            </div>

            <button
                onClick={handleCartClick}
                className={`cart-button ${isInCart ? 'in-cart' : ''}`}
            >
                {isInCart
                    ? 'Adicionado ao carrinho'
                    : 'Adicionar ao carrinho'}
            </button>

            <button
                onClick={handleViewMore}
                className="view-more-button"
            >
                Ver mais
            </button>

        </div>

    </div>
);

} 

export default ProductCard