import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.css';

function DateField ({ fieldName, value, label, type, id, onChange, error, maxLimit, minLimit }) {
  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        onChange={onChange}
        value={value}
        type={type}
        name={fieldName}
        className='form-control'
        max={maxLimit}
        min={minLimit}
      />
      {error && <small className='form-text error'>{error}</small>}
    </div>
  );
}

DateField.propTypes = {
  error: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLimit: PropTypes.string,
  minLimit: PropTypes.string
}

DateField.defaultProps = {
  type: 'date'
}

export default DateField;
