import { useState } from 'react';
import './SearchInput.css';
import mockupDatas from '../../utils/mockupDatas';

const keyDatas = mockupDatas.map(product => product.title.toLowerCase());

const SearchInput = props => {
    const { handleSearch } = props;
    const [inputValue, setInputValue] = useState('');
    const [showSuggest, setShowSuggest] = useState(false);
    const [suggestKeyList, setSuggestKeyList] = useState([]);
    const [selectedSuggestIndex, setSelectedSuggestIndex] = useState(-1);

    const onInputChange = e => {
        const value = e.target.value;
        setInputValue(value);
        setSuggestKeyList(keyDatas.filter(key => key.includes(value) || value.includes(key)));
        setShowSuggest(true);
    };

    const handleKeyDown = e => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedSuggestIndex(prevIndex => {
                const newIndex = prevIndex > 0 ? prevIndex - 1 : suggestKeyList.length - 1;
                setInputValue(suggestKeyList[newIndex]);
                return newIndex;
            });
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedSuggestIndex(prevIndex => {
                const newIndex = prevIndex < suggestKeyList.length - 1 ? prevIndex + 1 : 0;
                setInputValue(suggestKeyList[newIndex]);
                return newIndex;
            });
        }
    };

    const onSelectSuggest = key => {
        setInputValue(key);
        handleSearch(key);
        setShowSuggest(false);
    };

    const onSubmitSearch = e => {
        e.preventDefault();
        handleSearch(inputValue.toLowerCase());
        setShowSuggest(false);
        setSelectedSuggestIndex(-1);
    };

    return (
        <div className="search-space">
            <form className="search-bar" onSubmit={onSubmitSearch}>
                <button type="submit">
                    <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                </button>
                <input
                    type="text"
                    placeholder="Enter keyword to search"
                    value={inputValue}
                    onChange={onInputChange}
                    onFocus={() => setShowSuggest(true)}
                    onBlur={() => setShowSuggest(false)}
                    onKeyDown={handleKeyDown}
                />
                {inputValue !== '' && (
                    <button onClick={() => setInputValue('')}>
                        <i className="fa-solid fa-xmark fa-xl"></i>
                    </button>
                )}
                {showSuggest && suggestKeyList.length > 0 && inputValue !== '' && (
                    <div className="suggest-key">
                        <ul>
                            {suggestKeyList.map((key, index) => (
                                <li
                                    key={key}
                                    className={selectedSuggestIndex === index ? 'selected' : ''}
                                    onMouseDown={e => e.preventDefault()}
                                    onClick={() => onSelectSuggest(key)}
                                >
                                    <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                                    {key}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </div>
    );
};
export default SearchInput;
