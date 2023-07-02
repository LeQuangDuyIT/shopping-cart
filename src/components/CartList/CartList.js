import CartIcon from '../CartIcon/CartIcon';
import './CartList.css';
import { useState } from 'react';

const CartList = props => {
    const { children, cart } = props;
    const totalCart = cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
    const [openCart, setOpenCart] = useState(false);

    const onToggleCart = () => {
        setOpenCart(!openCart);
    };

    return (
        <div className="cart__wrap">
            <div className="toggle-btn" onClick={onToggleCart} style={openCart ? {transform: 'none', zIndex: '1'} : null}>
                {openCart ? <i className="fa-solid fa-xmark"></i> : <CartIcon totalQuantity={totalQuantity} />}
            </div>
            {openCart && (
                <div className="cart__core">
                    <div className="cart-head">
                        <CartIcon totalQuantity={totalQuantity} />
                        <h2>Cart</h2>
                    </div>
                    <div className="cart-body">{children}</div>
                    <div className="cart-foot">
                        <div className="cart__bill">
                            <p>SUBTOTAL</p>
                            <div className="subtotal-value">
                                <p className="subtotal-value__main">$ {totalCart}</p>
                            </div>
                        </div>
                        <button>CHECKOUT</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartList;
