import React, { useState } from 'react';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
const CommissionCalculator = () => {
    const [inputs, setInputs] = useState({ locks: 1, stocks: 1, barrels: 1 });
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const calculateCommission = ({ locks, stocks, barrels }) => {
        const sales = locks * 45 + stocks * 30 + barrels * 25;
        const commission = sales > 1800 ? 230 + 0.20 * (sales - 1800) 
                        : sales > 1000 ? 100 + 0.15 * (sales - 1000) 
                        : 0.10 * sales;
        return { sales, commission };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { locks, stocks, barrels } = inputs;
        const isValid = [locks <= 70, stocks <= 80, barrels <= 90].every(Boolean);
        isValid ? setResult(calculateCommission(inputs)) : setError('Invalid input values.');
    };

    return (
        <div className='style'>
            <h1>Commission Calculator</h1>
            <br/>
            <form onSubmit={handleSubmit}>
                {['locks', 'stocks', 'barrels'].map((item, idx) => (
                    <div key={item}>
                        <label>{item.charAt(0).toUpperCase() + item.slice(1)} :&nbsp;</label>
                        <input
                            type="number"
                            value={inputs[item]}
                            onChange={e => setInputs({ ...inputs, [item]: parseInt(e.target.value) })}
                            min="1" max={[70, 80, 90][idx]}
                            required
                        />
                    </div>
                ))}
                <br/>
                <Button variant="success" type="submit">Calculate</Button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
                <div>
                    <br/>
                    <h2>Results</h2>
                    <p>Total Sales : {result.sales.toFixed(2)} ฿</p>
                    <p>Commission: {result.commission.toFixed(2)} ฿</p>
                </div>
            )}
        </div>
    );
};

export default CommissionCalculator;