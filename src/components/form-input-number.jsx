import React from 'react';
import PropTypes from 'prop-types';

const FormInputNumber = ({
  id, handleChange, value, increment, decrement, label,
}) => (
  <div className="form-input-number">
    <label htmlFor={id}>{label}</label>
    <span
      onClick={decrement}
      onKeyPress={() => {}}
      role="link"
      tabIndex={0}
      className="form-input-number__decrement"
    >
      -
    </span>
    <input
      id={id}
      type="number"
      min="1"
      max="200"
      onChange={handleChange}
      value={value}
      required
    />
    <span
      onClick={increment}
      onKeyPress={() => {}}
      role="link"
      tabIndex={0}
      className="form-input-number__increment"
    >
      +
    </span>
  </div>
);

const { string, func, number } = PropTypes;

FormInputNumber.propTypes = {
  id: string.isRequired,
  handleChange: func.isRequired,
  value: number.isRequired,
  label: string.isRequired,
  increment: func.isRequired,
  decrement: func.isRequired,
};

export default FormInputNumber;
