import Modal from 'react-modal'
import { Container } from './styles'
import closeImage from '../../assets/close.svg';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal( { isOpen, onRequestClose} : NewTransactionModalProps){
    return (
        <Modal
            isOpen={ isOpen }
            onRequestClose={ onRequestClose }
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <Container>
                <button 
                    type="button" 
                    onClick={ onRequestClose } 
                    className="react-modal-close">
                    <img src={ closeImage } alt="Fechar modal"/>
                </button>
                <h2>Registrar transação</h2>
                <input placeholder="Título"/>
                <input type="number" placeholder="Valor"/>
                <input placeholder="Categoria"/>
                <button type="submit">Cadastrar</button>
            </Container>

        </Modal>
    )
}