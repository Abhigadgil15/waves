import React from "react";
import { Table, Pagination } from "react-bootstrap";
// import Loading from '../../../../utils/loader';
import Loading from "@utils/loader.jsx";
import Moment from "react-moment";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const ProductsTable = ({ prods,prev,next,edit,removeModal,handleClose,handleModal,handleRemove}) => {
    


const goToEdit = (id) =>{
    edit(id);
}

const goToPrev = (page) =>{
    prev(page);
}

const goToNext = (page) =>{
    next(page);
}

  return (
    <>
      {prods && prods.docs ? (
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
              {prods.docs.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Moment to={item.date}></Moment>
                  </td>
                  <td> {item.model}</td>
                  <td>{item.available}</td>
                  <td
                    className="action_btn remove_btn"
                    onClick={() => handleModal(item._id)}
                  >
                    Remove
                  </td>
                  <td
                    className="action_btn edit_btn"
                    onClick={() => goToEdit(item._id)}
                  >
                    Edit
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {prods.hasPrevPage ? (
              <>
                <Pagination.Prev onClick={() => goToPrev(prods.prevPage)} />
                <Pagination.Item onClick={() => goToPrev(prods.prevPage)}>
                  {prods.prevPage}
                </Pagination.Item>
              </>
            ) : null}
            <Pagination.Item active>{prods.page}</Pagination.Item>
            {prods.hasNextPage ? (
              <>
              
                <Pagination.Item onClick={() => goToNext(prods.nextPage)}>
                  {prods.nextPage}
                </Pagination.Item>
                <Pagination.Next onClick={() => goToNext(prods.nextPage)} />
              </>
            ) : null}
          </Pagination>
          <hr/>
          <LinkContainer to="/dashboard/products/add_product">
            <Button variant="secondary">Add Product</Button>
            </LinkContainer>
        </>
      ) : (
        <Loading />
      )}
      <Modal show={removeModal} onHide ={handleClose}>
        <Modal.Header>
            <Modal.Title>Do you want to remove this data?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>This item will be forever deleted</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="danger" onClick={handleRemove}>
                Delete
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductsTable;
