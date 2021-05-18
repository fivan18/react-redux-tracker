import React from 'react';
import PropTypes from 'prop-types';

const FormInputSelect = ({
  id, handleChange, value, label, options,
}) => (
  <div className="form-input-select">
    <select
      id={id}
      onChange={handleChange}
      value={value}
      required
    >
      <option value="none">
        --
        {' '}
        {label}
        {' '}
        --
      </option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </div>
);

const { string, func, arrayOf } = PropTypes;

FormInputSelect.propTypes = {
  id: string.isRequired,
  handleChange: func.isRequired,
  value: string.isRequired,
  label: string.isRequired,
  options: arrayOf(
    string,
  ).isRequired,
};

export default FormInputSelect;
