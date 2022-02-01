import { useState, useEffect } from 'react';

import s from './inputForm.module.css';

const initialValue = {
  operandA: '',
  operation: '',
  operandB: '',
  result: '',
  error: '',
};

const InputForm = () => {
  const [state, setState] = useState(initialValue);

  const operations = ['+', '-', '/', '*']; 

  const handleChange = ({ target }) => {
    setState(prevState => ({
      ...prevState,
      [target.name]: target.value,
      error: '',
    }));
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    if (state.operation === '+') {
      const calculationResult =
        Number(state.operandA) + Number(state.operandB);
        setState(prevState => ({ ...prevState, result: calculationResult }));
    }

    if (state.operation === '-') {
      const calculationResult =
        Number(state.operandA) - Number(state.operandB);
        setState(prevState => ({ ...prevState, result: calculationResult }));
    }

    if (state.operation === '/') {
      const calculationResult =
        Number(state.operandA) / Number(state.operandB);
      Number(state.operandB) === 0
        ? setState(prevState => ({
            ...prevState,
            error: 'Error: dividing by zero',
            result: 'Undefined',
          }))
        : setState(prevState => ({
            ...prevState,
            result: calculationResult,
          }));
    }

    if (state.operation === '*') {
      const calculationResult =
        Number(state.operandA) * Number(state.operandB);
        setState(prevState => ({ ...prevState, result: calculationResult }));
    }
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleFormSubmit}>
        <label className={s.label}>
          <h4 className={s.labelTitle}>Operand A</h4>
          <input
            className={s.input}
            type="number"
            name="operandA"
            value={state.operandA}
            onChange={handleChange}
            required
          />
        </label>
        <label for='operation' className={s.label}>
          <h4 className={s.labelTitleOperation}>Operation</h4>
          {/* <input
            className={s.input}
            list="operations"
            name="operation"
            value={state.operation}
            placeholder="Please select an operation"
            type="text"
            autoComplete="off"
            onChange={handleChange}
            required
          />
          <datalist id="operations">
            {operations.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </datalist> */}

          <select name="operation" className={s.input} onChange={handleChange}  >          
            {operations.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className={s.label}>
          <h4 className={s.labelTitle}>Operand B</h4>
          <input
            type="number"
            name="operandB"
            className={s.input}
            value={state.operandB}
            onChange={handleChange}
            required
          />
        </label>
        <div className={s.buttonWrapper}>
          <button type="submit" className={s.button}>
            Calculate
          </button>
        </div>
      </form>

      <div className={s.rightSideWrapper}>
        <div>
          <p className={s.currentOperation}>
            {state.operandA} {state.operation} {state.operandB}
          </p>
        </div>
        <div className={s.resultWrapper}>
          <p className={s.currentResultTitle}>Result</p>
          <p className={s.currentResult}>{state.result}</p>
        </div>
        {state.error && (
          <div className={s.errorWrapper}>
            <p className={s.errorText}>{state.error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default InputForm;
