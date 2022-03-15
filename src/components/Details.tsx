import React from 'react';
import { useLocation } from 'react-router-dom';
import { InitPost } from './Post';

export const Details = () => {
    const { state } = useLocation();
    // console.log('my state', state);
    const post = state as InitPost;
    // console.log('my post', post);

    return (
        <div data-testid="details">
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </div>
    );
};
