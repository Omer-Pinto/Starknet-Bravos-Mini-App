import React, {useEffect, useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import executeGetTransactionByHashRpc from "../getTransactionByHashRpc";

export default function TextBoxWithButton() {
    const [inputValue, setInputValue] = useState<string>('');
    const [displayValue, setDisplayValue] = useState<string>('');
    const [res, setRes] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const fetchRpcResultAsync = async (): Promise<string> => {
        return await executeGetTransactionByHashRpc(inputValue)
    };

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const result = await fetchRpcResultAsync();
            setRes(result);
        };

        fetchData();
    }, [inputValue]);

    const handleClick = () => {
        setDisplayValue(res);
    };

    return (
        <div className="container mt-3">
            <Form>
                <Form.Group>
                    <Form.Label>Enter text:</Form.Label>
                    <Form.Control
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <Button variant="primary" onClick={handleClick} className="mt-2">
                        Print Text
                    </Button>
                </Form.Group>
            </Form>
            {displayValue && (
                <div className="mt-3">
                    <h5>Result:</h5>
                    <pre>{displayValue}</pre>
                </div>
            )}
        </div>
    );
}
