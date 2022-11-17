import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Pagination, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    const [page, setPage] = useState(Number(localStorage.getItem('page')));
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        //console.log({process.env.ENDPOINT})
        axios.get(`${process.env.REACT_APP_ENDPOINT}/crud/students?page=${page}`)
            .then((response) => {
                setPageCount(Math.ceil(response.data.Count / 3))
                setAPIData(response.data.Students);
            })
    }, [page]);

    const handlePageChange = (_, data) => {
        setPage(data.activePage - 1);
        localStorage.setItem('page', data.activePage - 1);
    }

    const setData = (data) => {
        let { Id, FirstName, LastName, Email } = data;
        localStorage.setItem('Id', Id);
        localStorage.setItem('FirstName', FirstName);
        localStorage.setItem('LastName', LastName);
        localStorage.setItem('Email', Email)
    }

    const getData = () => {
        axios.get(`${process.env.REACT_APP_ENDPOINT}/crud/students?page=${page}`)
            .then((response) => {
                setPageCount(Math.ceil(response.data.Count / 3))
                setAPIData(response.data.Students);
            })
    }

    const onDelete = (Id) => {
        axios.delete(`${process.env.REACT_APP_ENDPOINT}/crud/student?id=${Id}`)
            .then(() => {
                getData();
            })
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row key={data.Id} >
                                <Table.Cell>{data.FirstName}</Table.Cell>
                                <Table.Cell>{data.LastName}</Table.Cell>
                                <Table.Cell>{data.Email}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/update'>
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.Id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <div><Label>Currnet Page: {page + 1}</Label></div>
            
            <Pagination 
            activePage={page + 1}
            totalPages={pageCount} 
            onPageChange={handlePageChange}
            />
        </div>
    )
}
