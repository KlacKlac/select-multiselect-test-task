import React from 'react';
import {connect} from 'react-redux';

import {addUserAction} from '../actions';
import {EVENT_NAMES} from '../constants';

const Pagination = ({setCurrentPage, currentPage, pagesCount, addUserEvent}) => {
    return (
        <div className="pagination">
            {currentPage > 1 && (
                <button
                    className="pagination__button pagination__button_back"
                    onClick={() => {
                        setCurrentPage(currentPage - 1)
                        addUserEvent({eventName: EVENT_NAMES.prevPage});
                    }}>
                    Назад
                </button>
            )}
            <p className="pagination__number">{currentPage}</p>
            {currentPage < pagesCount && (
                <button
                    className="pagination__button pagination__button_next"
                    onClick={() => {
                        setCurrentPage(currentPage + 1)
                        addUserEvent({eventName: EVENT_NAMES.nextPage});
                    }}>
                    Вперед
                </button>
            )}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    addUserEvent: (userAction) => dispatch(addUserAction(userAction))
});

export default connect(null, mapDispatchToProps)(Pagination);