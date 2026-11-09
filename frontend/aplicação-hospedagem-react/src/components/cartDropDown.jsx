import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/cartcontext';


const CartDropdown = ({ isOpen, onCLose}) =>{

    const {cartItems, clearCart} = useCart()
    const navigate = useNavigate()
    const dropDownRef = useRef(null)

    useEffect(() =>{
        const handleClickOuside = (event) =>{
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){

            onclose()
            }
        }
        
        if(isOpen){
            document.addEventListener("mousedown",handleClickOuside)
        }
        return () =>{
            document.removeEventListener("mousedown", handleClickOuside)
        }
    }, [isOpen, onCLose])

    if(!isOpen) return null

    const totalValue = cartItems.reduce((acc, item) => (acc + (item.priceDiscount || item.price)), 0);
    const formatPrice = (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

    const handleGoToCart = () => {
    navigate('/pedidos');
    onClose();
    
  }

    return(
        
        <div ref={dropdownRef} className="cart-dropdown">

            <div className="cart-content">

                <h3>Meu Carrinho</h3>

                {cartItems.length > 0 ? (
                    <>

                        <div className="cart-items">

                            {cartItems.map(item => (

                                <div key={item.id} className="cart-item">

                                    <div className="cart-item-image">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />
                                    </div>

                                    <div className="cart-item-info">

                                        <p>{item.name}</p>

                                        <div className="cart-item-prices">

                                            <strong>
                                                {formatPrice(item.priceDiscount || item.price)}
                                            </strong>

                                            {item.priceDiscount && (
                                                <del>
                                                    {formatPrice(item.price)}
                                                </del>
                                            )}

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                        <div className="cart-summary">

                            <div className="cart-total">

                                <span>Valor total:</span>

                                <span className="cart-total-value">
                                    {formatPrice(totalValue)}
                                </span>

                            </div>

                            <div className="cart-actions">

                                <button
                                    onClick={clearCart}
                                    className="clear-cart-button"
                                >
                                    Esvaziar
                                </button>

                                <button
                                    onClick={handleGoToCart}
                                    className="view-cart-button"
                                >
                                    Ver Carrinho
                                </button>

                            </div>

                        </div>

                    </>
                ) : (

                    <p className="empty-cart">
                        Seu carrinho está vazio.
                    </p>

                )}

            </div>

        </div>

    )
    }

export default CartDropdown