import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
} from '@mui/material';

export interface InitPost {
    title: string;
    url: string;
    created_at: Date;
    author: string;
    objectID: number;
}

export const Post = () => {
    const [data, setData] = useState<InitPost[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getPostData();
        const myTimeout = setInterval(fetchData, 10000);

        return () => {
            clearInterval(myTimeout);
        };
    }, []);

    const fetchData = () => {
        // console.log('Scroll');

        setPageNumber((pageNumber) => pageNumber + 1);
        getPostData();
    };

    const getPostData = async () => {
        try {
            const response = await axios.get(
                `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`
            );
            // console.log('pre data',data);
            // console.log(response.data.hits);

            setData((data) => [...data, ...response.data.hits]);
        } catch (error) {
            console.error(error);
        }
    };

    const getDetails = (post: InitPost) => {
        // navigate({
        //     pathname: '/details',
        //     state: post
        // })
        // navigate(`/details/${countryName}`,state: post);
        navigate(`/details/${post.objectID}`, { state: post });
    };

    return (
        <Container maxWidth="xl">
            <InfiniteScroll
                dataLength={data.length} //This is important field to render the next data
                next={fetchData}
                hasMore={data.length < 1500}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="left">Author</TableCell>
                                <TableCell align="left">Source Url</TableCell>
                                <TableCell align="left">Create at</TableCell>
                                {/* <TableCell align="left">View details</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, i) => {
                                const { title, author, url, created_at } = item;
                                return (
                                    <TableRow
                                        key={i}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                        onClick={() =>
                                            getDetails(item)
                                        }>
                                        <TableCell component="th" scope="row">
                                            {title}
                                        </TableCell>
                                        <TableCell align="right">
                                            {author}
                                        </TableCell>
                                        <TableCell align="right">
                                            {url}
                                        </TableCell>
                                        <TableCell align="right">
                                            {created_at}
                                        </TableCell>
                                        {/* <TableCell align="right">
                                            <Button
                                                size="medium"
                                                variant="contained"
                                                onClick={() =>
                                                    getDetails(item)
                                                }>
                                                Details
                                            </Button>
                                        </TableCell> */}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </InfiniteScroll>
        </Container>
    );
};
