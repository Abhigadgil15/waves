import React from 'react';
import { Table,Pagination } from 'react-bootstrap';
import Moment from 'react-moment';
// import Loading from 'utils/loader';

const ProductsTable = ({prods}) =>{
    return(
        <>
        { prods && prods.docs ?
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Created</th>
                    <th>Model</th>
                    <th>Available</th>
                </tr>
            </thead>
            <tbody>
                {prods.docs.map((item) =>(
                    <tr key={item._id}>
                        <td><Moment to={item.date}></Moment></td>
                    </tr>
                ))}
            </tbody>

        </Table>
        </> :null
        }
        </>
    )
}
export default ProductsTable;