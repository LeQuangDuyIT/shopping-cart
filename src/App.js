import './App.css';
import mockupDatas from './utils/mockupDatas';
import { FILTER_CRITERIAS } from './utils/constants';
import FilterSetting from './components/FilterSetting/FilterSetting';
import ProductList from './components/ProductList/ProductList';
import ProductItem from './components/ProductItem/ProductItem';
import { useEffect, useState } from 'react';
import CartList from './components/CartList/CartList';
import CartItem from './components/CartItem/CartItem';

function App() {
    const { SIZE, GENDER, FREESHIP } = FILTER_CRITERIAS;
    let initialCriteria = {
        [SIZE]: [],
        [GENDER]: '',
        [FREESHIP]: ''
    };
    const [productList, setProductList] = useState(mockupDatas);
    const [filterCriteria, setFilterCriteria] = useState(initialCriteria);
    const [cart, setCart] = useState([]);

    const handleAddProduct = id => {
        if (!cart.find(product => product.id === id)) {
            const newProduct = { ...mockupDatas.find(product => product.id === id), quantity: 1 };
            setCart([...cart, newProduct]);
        } else {
            handleUpdateCart(id, 1);
        }
    };

    const handleUpdateCart = (id, unit) => {
        const updateProduct = cart.find(product => product.id === id);
        updateProduct.quantity += unit;
        setCart(cart.map(product => (product.id === id ? updateProduct : product)));
    };

    const handleRemoveProduct = id => {
        setCart(cart.filter(product => product.id !== id));
    };

    const checkCriteriaAdded = criteria => {
        const filterCriteriaValue = [...filterCriteria[SIZE], filterCriteria[GENDER], filterCriteria[FREESHIP]];
        return filterCriteriaValue.includes(criteria);
    };

    const getCriteriaToFilter = (type, criteria) => {
        let newFilterCriteria;
        if (checkCriteriaAdded(criteria)) {
            switch (type) {
                case SIZE:
                    newFilterCriteria = {
                        ...filterCriteria,
                        [SIZE]: filterCriteria[SIZE].filter(size => size !== criteria)
                    };
                    break;
                default:
                    newFilterCriteria = { ...filterCriteria, [type]: '' };
                    break;
            }
        } else {
            switch (type) {
                case SIZE:
                    newFilterCriteria = { ...filterCriteria, [SIZE]: [...filterCriteria[SIZE], criteria] };
                    break;
                default:
                    newFilterCriteria = { ...filterCriteria, [type]: criteria };
                    break;
            }
        }
        setFilterCriteria(newFilterCriteria);
    };

    const handleFilter = () => {
        const SIZE_CRITERIA = filterCriteria[SIZE];
        const GENDER_CRITERIA = filterCriteria[GENDER];
        const FREESHIP_CRITERIA = filterCriteria[FREESHIP];

        let filteredProductList = [...mockupDatas];
        if (SIZE_CRITERIA.length > 0) {
            filteredProductList = filteredProductList.filter(product =>
                SIZE_CRITERIA.some(size => product.size.includes(size))
            );
        }
        if (GENDER_CRITERIA !== '') {
            switch (GENDER_CRITERIA) {
                case 'Unisex':
                    filteredProductList = filteredProductList.filter(product => product.gender === 'Unisex');
                    break;
                default:
                    filteredProductList = filteredProductList.filter(
                        product => product.gender === GENDER_CRITERIA || product.gender === 'Unisex'
                    );
                    break;
            }
        }
        if (FREESHIP_CRITERIA) {
            filteredProductList = filteredProductList.filter(product => product.freeship);
        }
        filteredProductList = [...new Set(filteredProductList)];
        setProductList(filteredProductList);
    };

    useEffect(() => {
        const allEmpty = Object.values(filterCriteria).every(value => value.length === 0);
        if (!allEmpty) {
            handleFilter();
        } else {
            setProductList(mockupDatas);
        }
    }, [filterCriteria]);

    const handleShowAll = () => {
        setFilterCriteria(initialCriteria);
    };

    const handleSearch = keyword => {
        const searchResult = mockupDatas.filter(product => product.title.toLowerCase().includes(keyword));
        setProductList(searchResult);
    };

    return (
        <div className="container">
            <FilterSetting
                filterCriteria={filterCriteria}
                checkCriteriaAdded={checkCriteriaAdded}
                getCriteriaToFilter={getCriteriaToFilter}
                handleShowAll={handleShowAll}
            />
            <ProductList productList={productList} handleSearch={handleSearch}>
                {productList.map(product => (
                    <ProductItem key={product.id} {...product} handleAddProduct={handleAddProduct} />
                ))}
            </ProductList>
            <CartList cart={cart}>
                {cart.map(product => (
                    <CartItem
                        key={product.id}
                        {...product}
                        handleUpdateCart={handleUpdateCart}
                        handleRemoveProduct={handleRemoveProduct}
                    />
                ))}
            </CartList>
        </div>
    );
}

export default App;
