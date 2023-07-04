import { useEffect, useState } from 'react';
import './CartItem.css';

const CartItem = props => {
    const { id, title, price, thumbnailMain, quantity, handleUpdateCart, handleRemoveProduct } = props;

    const [productQuantity, setProductQuantity] = useState(quantity);

    useEffect(() => {
        setProductQuantity(quantity);
    }, [quantity]);

    const onChangeQuantity = unit => {
        const allowUpdateCart = !(quantity <= 1 && unit === -1);
        if (allowUpdateCart) {
            handleUpdateCart(id, unit);
        }
    };

    const onInputQuantity = e => {
        const inputValue = e.target.value;
        if (inputValue && inputValue !== '0') {
            setProductQuantity(inputValue);
            handleUpdateCart(id, inputValue - productQuantity);
        }
    };

    return (
        <div className="cart-item__wrap">
            <div className="cart-item__core">
                <div className="product-info">
                    <div className="product-info__thumbnail">
                        <img src={thumbnailMain} alt={title} />
                    </div>
                    <div className="product-info__title">{title}</div>
                </div>
                <div className="product-money">
                    <p className="product-money__value">$ {price.toFixed(2)}</p>
                    <div className="change-quantity-btn">
                        <button onClick={() => onChangeQuantity(-1)} style={{ opacity: quantity <= 1 ? 0.2 : 1 }}>
                            <i className="fa-solid fa-minus fa-2xs"></i>
                        </button>
                        <input
                            type="number"
                            name="productQuantity"
                            value={productQuantity}
                            onChange={onInputQuantity}
                        />
                        <button onClick={() => onChangeQuantity(1)}>
                            <i className="fa-solid fa-plus fa-xs"></i>
                        </button>
                    </div>
                    <button className="delete-product" onClick={() => handleRemoveProduct(id)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
