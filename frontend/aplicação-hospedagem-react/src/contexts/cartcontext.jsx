import {Children, createContext, useContext, useEffect, useState } from 'react'

export const CartContext = createContext(null)

export const useCart = () => useContext(CartContext)

export const CartProvider = ({Children}) =>{
    const [cartItems, setCartItems] = useState(() =>{
        const stored = localStorage.getitem('cartItems')
        return stored ? JSON.parse(stored) : []
    })


    useEffect(() =>{
        localStorage.setitem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product) =>{
        setCartItems((prev) =>{
            if(prev.some((item) => item.id === product.id)) return prev
            return [...prev, product]
        })
    }

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id))
    }   

    const clearCart = () =>{
        setCartItems([])
        localStorage.removeItem('cartitems')
    }

    const isInCart = (id) => cartItems.some((item) => item.id ===id)

    const toggleCartItem = (product) =>{
        if(isInCart(product.id)){
            removeFromCart(product.id)
        }
        else{
            addToCart(product)
        }
    }


      return (
    <CartContext.Provider
      value={{
        cartItems,
        CartItems: cartItems,
        addToCart,
        AddToCart: addToCart,
        removeFromCart,
        RemoveFromCart: removeFromCart,
        clearCart,
        isInCart,
        toggleCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}