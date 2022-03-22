import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';

import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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

    // // pagination
    const [page, setPage] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);
    const rowsPerPage = 20;

    useEffect(() => {
        getPostData();
        const myTimeout = setInterval(() => {
            setPageNumber((pageNumber) => pageNumber + 1);
        }, 10000);

        return () => {
            clearInterval(myTimeout);
        };
    }, [pageNumber]);

    const handleChangePage = async (event: unknown, newPage: number) => {
        console.log('my page changed',newPage);
        
        setPage(newPage);
    };

    const getPostData = async () => {
        try {
            const response = await axios.get(
                `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`
            );
            setData((data) => [...data, ...response.data.hits]);
            const pageLength = [...data, ...response.data.hits].length;
            setTotalElements(pageLength);
        } catch (error) {
            console.error(error);
        }
    };
    const getDetails = (post: InitPost) => {
        navigate(`/details/${post.objectID}`, { state: post });
    };

    return (
        <Container maxWidth="xl" data-testid="post-list" >
            <h1>All blog posts</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="left">Author</TableCell>
                            <TableCell align="left">Source Url</TableCell>
                            <TableCell align="left">Create at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((item, i) => {
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
                                        onClick={() => getDetails(item)}>
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
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* pagination */}

<TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={totalElements}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                data-testid={"pagination"}
            /> 
            <br />
            <br />
            <br />
            <br />
        </Container>
    );
};
