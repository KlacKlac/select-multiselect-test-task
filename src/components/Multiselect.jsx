import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import Pagination from './Pagination.jsx';

import {addUserAction} from '../actions';
import {EVENT_NAMES} from '../constants';

const itemsPerPage = 2;

export const Multiselect = ({selectedCategoryId, items, addUserEvent}) => {
    const [currentPage, setCurrentPage] = useState(undefined);
    const [searchText, setSearchText] = useState(undefined);
    const [itemsByCategory, setItemsByCategory] = useState(undefined);
    const [itemsBySearchText, setItemsBySearchText] = useState(undefined);
    const [currentPageItems, setCurrentPageItems] = useState(undefined);
    const [source, setSource] = useState(undefined);
    const [selectedItemsIds, setSelectedItemsIds] = useState([]);
    const input = useRef(null);
    
    // следим за событиями пользователя, если последнее событие - выбор категории,
    // отбираем по выбранной категории items
    useEffect(() => {
        setSearchText(undefined);
        if (input.current) {
            input.current.value = null;
        }
        if (selectedCategoryId) {
            setSearchText(undefined);
            setItemsByCategory(items.filter((item) => item.parent_id === selectedCategoryId));
            setCurrentPage(1);
        } else {
            setItemsByCategory(undefined);
            setCurrentPage(undefined);
            setCurrentPageItems(undefined);
        }
    }, [selectedCategoryId]);

    // отбираем на текущую страницу нужное количество элементов
    useEffect(() => {
        setSource(itemsBySearchText ? itemsBySearchText : itemsByCategory)
        if (currentPage && (itemsBySearchText || itemsByCategory)) {
            const currentItems = itemsBySearchText ? itemsBySearchText : itemsByCategory;
            const newItems = [];
            for (let i = (currentPage - 1) * itemsPerPage; i <= currentPage * itemsPerPage - 1; i++) {
                if (currentItems[i]) {
                    newItems.push(currentItems[i]);
                }
            }
            setCurrentPageItems(newItems);
        }
    }, [currentPage, itemsByCategory, itemsBySearchText]);

    useEffect(() => {
        if (searchText) {
            const newItems = itemsByCategory.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
            setItemsBySearchText(newItems);
        } else {
            setItemsBySearchText(undefined);
        }
        setCurrentPage(1);
    }, [searchText]);

    return source && currentPageItems
        ? (
            <div className="multiselect">
                <input
                    ref={input}
                    type="text"
                    className='multiselect__search'
                    onChange={({target}) => setSearchText(target.value.trim())}
                />
                {currentPageItems.map((item) => (
                    <p
                        key={item.id}
                        className={`multiselect__option ${selectedItemsIds.includes(item.id) ? 'multiselect__option_selected' : ''}`}
                        onClick={() => {
                            if (selectedItemsIds.includes(item.id)) {
                                setSelectedItemsIds(selectedItemsIds.filter((id) => id !== item.id))
                            } else {
                                setSelectedItemsIds([...selectedItemsIds, item.id])
                            }
                            addUserEvent({
                                eventName: EVENT_NAMES.selectItem,
                                eventValue: item.name,
                            });
                        }}>
                        {item.name}
                    </p>
                ))}
                {source.length > 2 && (
                    <Pagination
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        pagesCount={Math.ceil(source.length / 2)}
                    />
                )}
            </div>
        )
        : null;
}

const mapStateToProps = (state) => ({
    selectedCategoryId: state.selectedCategoryId,
    items: state.items.data,
});

const mapDispatchToProps = (dispatch) => ({
    addUserEvent: (userAction) => dispatch(addUserAction(userAction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Multiselect);