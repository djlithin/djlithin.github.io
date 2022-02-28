import { useState } from "react"
// import { Modal, Button } from "reactstrap"
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle } from "reactstrap"
import { Button } from 'react-bootstrap';

const CoinDetModal = function(props){

    const [modalView, setmodalView] = useState(props.show)
    // const handleClose = ()=> setmodalView(!modalView)
    
      
    // return(<div>Hello Modal</div>
    return (
        <>
               
            <Modal
                show={modalView}
                onHide={props.close}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Hiiiiii   ******* {props.coinDet.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                I will not close if you click outside me. Don't even try to press
                escape key.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>
                    Close
                </Button>
                <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CoinDetModal