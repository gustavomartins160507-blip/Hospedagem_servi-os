import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cartcontext';

const ProductCardList = ({
  id,
  image,
  name,
  category,
  price,
  priceDiscount,
  fullProduct,
  
}) => {

    const [cartItems, removeFromCart, addToCart] = useCart
    const navigate = useNavigate()
    const product = fullProduct || {id, image, name, category, price, priceDiscount}
    const isINCart = cartItems.some((item) => item.id === id)

    const formatPrice = (value) =>{
    
        if (typeof value !== 'number') return 'R$ 0,00';
        return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        }).format(value);

    }

    const handleCartClick = () =>{

        if(isINCart) {
            removeFromCart(id)
        }
        else{
            addToCart(product)
        }
    }
    
    return(

        <div>
            <div>
            <img src={image} alt={name} />
            </div>
            <div>
                <p>{category || 'produto'}</p>
                <p>{name}</p>
            </div>
        </div>

        /////em andamento resto do codigo dps....
    )
}