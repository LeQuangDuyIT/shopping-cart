import SearchInput from '../SearchInput/SearchInput';
import './ProductList.css';

const ProductList = props => {
    const { children, productList, handleSearch } = props;
    return (
        <div className='app__main'>
            <SearchInput handleSearch={handleSearch} />
            <p className='product-length'><span>{productList.length}</span> Product(s) found</p>
            <div className="product-list">{children}</div>
        </div>
    );
};
export default ProductList;
