import Modal from 'react-modal'
import { useState, FormEvent, useContext } from 'react';
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import closeImage from '../../assets/close.svg';
import incomeImage from '../../assets/income.svg';
import outcomeImage from '../../assets/outcome.svg';

import { api } from '../../services/api';
import { TransactionsContext, TransactionInput } from '../../TransactionsContext';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal( { isOpen, onRequestClose} : NewTransactionModalProps){
    const { createTransaction } = useContext(TransactionsContext);
    const defaultTransaction = {
        title: 'John Wick', 
        type: 'deposit',
        value: 0,
        category: ''
    };

    const [transaction, setTransaction] = useState<TransactionInput>({ ...defaultTransaction });
    
    const [type, setType] = useState('deposit')

    async function handleCreateNewTransaction(event : FormEvent) {
        event.preventDefault();

        await createTransaction(transaction);

        setTransaction({...defaultTransaction})
        onRequestClose();
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
                    name="title"
                    placeholder="Título" 
                    type="text"
                    value={ transaction.title } 
                    onChange={ event => handleTransactionChanges(event) }
                />
                <input 
                    name="value"
                    type="number" 
                    placeholder="Valor"
                    value={ Number(transaction.value) }
                    onChange={ event => handleTransactionChanges(event) }
                />

                <TransactionTypeContainer>
                    <RadioBox 
                        name="type"
                        type="button" 
                        onClick={ () => {
                            const type = 'deposit';
                            setType(type) 
                            setTransaction({...transaction, type: type })
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
                            setTransaction({...transaction, type: type })
                        } }
                        isActive={ type === 'withdraw' }
                        activeColor="red"
                    >
                        <img src={ outcomeImage } alt="Entrada"/>
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    name="category"
                    placeholder="Categoria"
                    value={ transaction.category }
                    onChange={ event => handleTransactionChanges(event) }
                />

                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}