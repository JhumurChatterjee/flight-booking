import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.css';

function TextField ({ fieldName, value, label, error, type, id, onChange, autoComplete, autoFocus, placeholder }) {
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
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        placeholder={placeholder}
      />
      {error && <small className='form-text error'>{error}</small>}
    </div>
  );
}

TextField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool
}

TextField.defaultProps = {
  type: 'text'
}

export default TextField;
