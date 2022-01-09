import Modal from 'react-modal'
import { useState, FormEvent } from 'react';
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import closeImage from '../../assets/close.svg';
import incomeImage from '../../assets/income.svg';
import outcomeImage from '../../assets/outcome.svg';

import { api } from '../../services/api';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

interface Transaction {
    Title: string;
    Value: Number;
    IsActive: string;
    Category: string;
}

export function NewTransactionModal( { isOpen, onRequestClose} : NewTransactionModalProps){
    const [transaction, setTransaction] = useState<Transaction>({ 
        Title: 'John Wick', 
        IsActive: 'deposit',
        Value: 0,
        Category: 'deposit'
    });
    
    const [type, setType] = useState('deposit')

    function handleCreateNewTransaction(event : FormEvent) {
        event.preventDefault();

        api.post('/transactions', transaction);
    }

    function handleTransactionChanges(event : React.ChangeEvent<HTMLInputElement>) {
        var { value, name } = event.target;
        setTransaction({ ...transaction, [name]: value });
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
                    name="Title"
                    placeholder="Título" 
                    type="text"
                    value={ transaction.Title } 
                    onChange={ event => handleTransactionChanges(event) }
                />
                <input 
                    name="Value"
                    type="number" 
                    placeholder="Valor"
                    value={ Number(transaction.Value) }
                    onChange={ event => handleTransactionChanges(event) }
                />

                <TransactionTypeContainer>
                    <RadioBox 
                        name="IsActive"
                        type="button" 
                        onClick={ () => {
                            const type = 'deposit';
                            setType(type) 
                            setTransaction({...transaction, IsActive: type })
                        } }
                        isActive={ type === 'deposit' }
                        activeColor="green"
                    >
                        <img src={ incomeImage } alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox 
                        type="button" 
                        onClick={ () => {
                            const type = 'withdraw';
                            setType(type) 
                            setTransaction({...transaction, IsActive: type })
                        } }
                        isActive={ type === 'withdraw' }
                        activeColor="red"
                    >
                        <img src={ outcomeImage } alt="Entrada"/>
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    name="Category"
                    placeholder="Categoria"
                    value={ transaction.Category }
                    onChange={ event => handleTransactionChanges(event) }
                />

                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}