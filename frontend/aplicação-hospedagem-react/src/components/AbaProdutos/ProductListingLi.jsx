
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/cartcontext';
import './ProductListingLi.css';

const ProductListingLi = ({ products }) => {

    const { CartItems, AddToCart, RemoveFromCart } = useCart();

    const formatPrice = (value) => {

        if (typeof value !== "number") return "R$ 0,00";

        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    return (

        <div className="product-list">

            {products.map((product) => {

                const hasDiscount =
                    typeof product.priceDiscount === "number" &&
                    product.priceDiscount < product.price;

                let discountPercentage = 0;

                if (hasDiscount) {
                    discountPercentage = Math.round(
                        ((product.price - product.priceDiscount) / product.price) * 100
                    );
                }

                const isInCart = CartItems.some(
                    (item) => item.id === product.id
                );

                const handleToggleCart = () => {

                    if (isInCart) {
                        RemoveFromCart(product.id);
                    } else {
                        AddToCart(product);
                    }
                };

                return (

                    <div key={product.id} className="product-list-card">

                        <Link
                            to={`/produto/${product.id}`}
                            className="product-list-link"
                        >

                            {hasDiscount && (
                                <div className="discount-badge">
                                    {discountPercentage}% OFF
                                </div>
                            )}

                            <div className="product-list-image">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                />
                            </div>

                        </Link>

                        <div className="product-list-info">

                            <span className="product-list-category">
                                {product.category}
                            </span>

                            <h3 className="product-list-name">
                                {product.name}
                            </h3>

                        </div>

                        <div className="product-list-prices">

                            {hasDiscount ? (

                                <div className="discount-prices">

                                    <del>
                                        {formatPrice(product.price)}
                                    </del>

                                    <strong>
                                        {formatPrice(product.priceDiscount)}
                                    </strong>

                                </div>

                            ) : (

                                <strong>
                                    {formatPrice(product.price)}
                                </strong>

                            )}

                        </div>

                        <div className="product-list-buttons">

                            <button
                            
                                onClick={handleToggleCart}
                                className={`add-cart-button ${isInCart ? 'added' : ''}`}
                            >
                                {isInCart
                                    ? 'Adicionado ao carrinho'
                                    : 'Adicionar ao carrinho'}
                            </button>

                            <Link

                                to={`/produto/${product.id}`}
                                className="more-details-button"

                            >
                                Ver mais
                                
                            </Link>

                        </div>

                    </div>

                );
            })}

        </div>
    );
};

export default ProductListingLi;
