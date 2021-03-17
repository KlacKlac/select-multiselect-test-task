import React from 'react';
import {connect} from 'react-redux';

import {addUserAction, setSelectedCategoryId} from '../actions';
import {EVENT_NAMES} from '../constants';

const Select = ({categories, addUserEvent,setCategoryId }) => {
    return categories.length
        ? (
            <select
                className="select"
                onChange={({target}) => {
                    setCategoryId(target.value);
                    let flagsIsFilled = false;
                    categories.forEach((category) => {
                        if (category.id === target.value) {
                            flagsIsFilled = !!category.flags;
                        }
                    });
                    if (!flagsIsFilled) {
                        addUserEvent(
                            {
                                eventName: EVENT_NAMES.selectCategory,
                                eventValue: target.value,
                            }
                        );
                    }
                }}>
                <option value="">Выберите категорию</option>
                {categories.map((category) => (
                    <option
                        key={category.id}
                        className='option'
                        value={category.id}>
                            {category.name}
                    </option>
                ))}
            </select>
        )
        : <p>Нет данных для отображения</p>
}

const mapStateToProps = (state) => ({
    categories: state.categories.data,
});

const mapDispatchToProps = (dispatch) => ({
    addUserEvent: (userAction) => dispatch(addUserAction(userAction)),
    setCategoryId: (categoryId) => dispatch(setSelectedCategoryId(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Select);