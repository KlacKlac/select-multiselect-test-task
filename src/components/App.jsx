import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import Multiselect from './Multiselect.jsx';
import Select from './Select.jsx';

import './App.sass';
import {getCategories, getItems, resetStore} from '../actions';
import {REQUEST_STATUS} from '../constants';

const App = (props) => {
    const {categoriesStatus, getData} = props;

    useEffect(() => {
        if (categoriesStatus === REQUEST_STATUS.notRequested) {
            getData();
        }
    }, []);

    const renderContent = () => {
        switch (categoriesStatus) {
            case REQUEST_STATUS.error:
                return <p className="error">При загрузке данных произошла ошибка :(</p>
            case REQUEST_STATUS.fetching:
                return <p>Запрашиваем данные...</p>
            case REQUEST_STATUS.received:
                return (
                    <div className="form">
                        <Select />
                        <Multiselect />
                    </div>
                );
            default:
                return <p>Нет данных для отображения</p>
        }
    };

    return (
        <div className="container">
            {renderContent()}
        </div>
    );
};

const mapStateToProps = (state) => ({
    categoriesStatus: state.categories.status,
});
const mapDispatchToProps = (dispatch) => ({
    getData: () => {
        getCategories(dispatch);
        getItems(dispatch);
    },
    resetData: () => {
        dispatch(resetStore())
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);