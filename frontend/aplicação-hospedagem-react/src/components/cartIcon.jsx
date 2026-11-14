
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../contexts/cartcontext';
import { useNavigate } from 'react-router-dom';

const CartIcon = () =>{
    const {cartItems} = useCart()
    const navigate = useNavigate()


    return(

        <button onClick={() => navigate('pedidos')}>
      <FiShoppingCart />
      {cartItems.length > 0 && (
        <span >
          {cartItems.length}
        </span>
      )}
    </button>

    )

}

export default CartIcon