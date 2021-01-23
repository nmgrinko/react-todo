import React from 'react';
import { connect } from 'react-redux'

import './Loading.css';

let Loading = ({ loading }) => (
    loading ?
        <div className = "lds-css">
            <div className = "lds-double-ring">
                <div></div>
                <div></div>
            </div>
        </div>:
    null
);


const mapStateToProps = (state) => ({ loading : state.loading })

export default connect(mapStateToProps, null)(Loading)


