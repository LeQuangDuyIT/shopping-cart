import './CartIcon.css';
const CartIcon = props => {
    const { totalQuantity } = props;
    return (
        <div className="cart-icon__wrap">
            <i className="fa-sharp fa-solid fa-cart-shopping fa-xl"></i>
            <div className="cart-length">{totalQuantity}</div>
        </div>
    );
};
export default CartIcon;
