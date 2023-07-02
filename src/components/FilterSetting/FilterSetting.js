import './FilterSetting.css';
import { genderList, sizeList, FILTER_CRITERIAS } from '../../utils/constants';

const FilterSetting = props => {
    const { checkCriteriaAdded, getCriteriaToFilter, handleShowAll } = props;
    const { SIZE, GENDER, FREESHIP } = FILTER_CRITERIAS;
    return (
        <div className="filter-space">
            <div>
                <p className="show-all" onClick={handleShowAll}>Show All</p>
            </div>
            <div>
                <h4>Size:</h4>
                <div className="filter-type by-size">
                    {sizeList.map(size => (
                        <button
                            key={size}
                            className={checkCriteriaAdded(size) ? 'added' : ''}
                            onClick={() => getCriteriaToFilter(SIZE, size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h4>Gender:</h4>
                <div className="filter-type by-gender">
                    {genderList.map(gender => (
                        <button
                            key={gender}
                            className={checkCriteriaAdded(gender) ? 'added' : ''}
                            onClick={() => getCriteriaToFilter(GENDER, gender)}
                        >
                            {gender}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h4>Shipping:</h4>
                <div className="filter-type by-freeship">
                    <button
                        className={checkCriteriaAdded(true) ? 'added' : ''}
                        onClick={() => getCriteriaToFilter(FREESHIP, true)}
                    >
                        Feeship
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterSetting;
