
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cartcontext';
import './ProductCardList.css';

const ProductCardList = ({
  id,
  image,
  name,
  category,
  price,
  priceDiscount,
  fullProduct,
}) => {

  const [cartItems, removeFromCart, addToCart] = useCart();
  const navigate = useNavigate();

  const product = fullProduct || {
    id, image, name, category, price, priceDiscount
  };

  const isInCart = cartItems.some((item) => item.id === id);

  const formatPrice = (value) => {
    if (typeof value !== 'number') return 'R$ 0,00';

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="product-card">

      <div className="product-image">
        <img src={image} alt={name} />
      </div>

      <div className="product-info">

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
          onClick={() => {
            navigate(`/produto/${id}`);
            window.scrollTo(0, 0);
          }}
          className="details-button"
        >
          Ver mais
        </button>

        <Link to={`/produto/${id}`} className="sr-only">
          {name}
        </Link>

      </div>
    </div>
  );
};

export default ProductCardList;
