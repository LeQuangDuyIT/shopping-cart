import './ProductItem.css';
import getIntegerAndDecimal from '../../utils/getIntegerAndDecimal';
import { useState } from 'react';

const ProductItem = props => {
    const { id, title, thumbnailMain, thumbnailExtra, price, size, gender, freeship, handleAddProduct } = props;
    const { integerPart, decimalPart } = getIntegerAndDecimal(price);

    const [isHovered, setIsHovered] = useState(false);

    const onAddProduct = () => {
        handleAddProduct(id);
    };

    return (
        <div className="product-item__wrap">
            <div
                className="product-item"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="thumbnail">
                    <img src={!isHovered ? thumbnailMain : thumbnailExtra} alt={title} />
                    <div className="size-tags">
                        {size.map(sizeItem => (
                            <span key={sizeItem} className="size-tag">
                                {sizeItem}
                            </span>
                        ))}
                    </div>
                </div>
                <p className="title">{title}</p>
                <div className="price">
                    <p>
                        $ <span className="outstanding">{integerPart}</span>.{decimalPart}
                    </p>
                </div>
                <button className="add-btn" onClick={onAddProduct}>
                    Add to cart
                </button>
                <div className="product-tags">
                    {freeship && <div className="tag freeship-tag">Freeship</div>}
                    {gender === 'Unisex' && <div className="tag unisex-tag">Unisex</div>}
                </div>
            </div>
        </div>
    );
};
export default ProductItem;
