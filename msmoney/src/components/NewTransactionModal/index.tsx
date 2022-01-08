import Modal from 'react-modal'
import { useState, FormEvent } from 'react';
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import closeImage from '../../assets/close.svg';
import incomeImage from '../../assets/income.svg';
import outcomeImage from '../../assets/outcome.svg';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

interface Transaction {
    Title: string;
    Price: string;
    IsActive: string;
    Category: string;
}

export function NewTransactionModal( { isOpen, onRequestClose} : NewTransactionModalProps){
    const [transaction, setTransaction] = useState<Transaction>({ 
        Title: 'John Wick', 
        IsActive: 'deposit',
        Price: 'asdsa',
        Category: 'deposit'
    });
    
    const [type, setType] = useState('deposit')

    function handleCreateNewTransaction(event : FormEvent) {
        event.preventDefault();
    }

    return (
        <Modal
            isOpen={ isOpen }
            onRequestClose={ onRequestClose }
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <Container onSubmit={ (event) => handleCreateNewTransaction(event) }>
                <button 
                    type="button" 
                    onClick={ onRequestClose } 
                    className="react-modal-close">
                    <img src={ closeImage } alt="Fechar modal"/>
                </button>
                <h2>Registrar transação</h2>
                <input 
                    placeholder="Título" value={ transaction.Title } 
                    onChange={ event => {
                        console.log(event.target);
                        setTransaction({ ...transaction, Title: event.target.value });
                    } }
                />
                <input type="number" placeholder="Valor"/>

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button" 
                        onClick={ () => setType('deposit') }
                        isActive={ type === 'deposit' }
                        activeColor="green"
                    >
                        <img src={ incomeImage } alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox 
                        type="button" 
                        onClick={ () => setType('withdraw') }
                        isActive={ type === 'withdraw' }
                        activeColor="red"
                    >
                        <img src={ outcomeImage } alt="Entrada"/>
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input placeholder="Categoria"/>
                <button type="submit">Cadastrar</button>
            </Container>

        </Modal>
    )
}