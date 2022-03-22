import React from 'react';
import { useLocation } from 'react-router-dom';
import { InitPost } from './PostInfiniteScroll_AnotherWay';

export const Details = () => {
    const { state } = useLocation();
    // console.log('my state', state);
    const post = state as InitPost;
    // console.log('my post', post);

    return (
        <div data-testid="details-test-id">
            <h1>Post Details</h1>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </div>
    );
};
