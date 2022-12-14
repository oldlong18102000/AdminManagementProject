import { Modal, Button } from 'react-bootstrap'
import { PropsModalConfirm } from '../model/ProductTableModel'
import axios from "axios";
import { deleteProductDataAPI } from '../redux/Action';


const ModalConfirm = (props) => {

    const { show, handleClose, dataProductDelete, handleOpacity, setDataProductDelete, handleFetchData, setDataDeleteLength, dispatch } = props;

    const deleteProductData = async () => {
        console.log(dataProductDelete)
        // const res = await axios.post("https://api.gearfocus.div4.pgtest.co/apiAdmin/products/edit",
        //     `{"params":[${dataProductDelete.map((item) => { return (`{"id":"${item}","delete":1}`) })}]}`,
        //     {
        //         headers: {
        //             Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
        //         }
        //     })
        const json = await dispatch(deleteProductDataAPI(dataProductDelete))
        console.log(dataProductDelete)
        handleOpacity(dataProductDelete)
        handleFetchData()
        setDataProductDelete([])
        setDataDeleteLength(0)
        handleClose()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteProductData}>
                        YES
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        NO
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm;