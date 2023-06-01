import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute (props) {
    console.log('private route checker running');
    // console.log(props);
    if(props.user == null) {
        // this call doesn't have data so we ignore it
        return props.children;
    }
    else {
        if (!props || !props.user || !props.user.email) {
            //this call looks like a user that isn't logged in
            return <Navigate to="/" replace />;
            //return '';
        }
        else {
            //this call has data and looks like a  user that is logged in
            return props.children;
        }
    }
};

export default PrivateRoute