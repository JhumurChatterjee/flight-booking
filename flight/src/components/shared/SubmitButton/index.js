import React from 'react';
import PropTypes from 'prop-types';

function SubmitButton ({ value, disabled, onClick, className }) {
  return (
    <div className='form-group'>
      <input
        onClick={onClick}
        value={value}
        type='submit'
        className={className}
        disabled={disabled}
      />
    </div>);
}

SubmitButton.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

SubmitButton.defaultProps = {
  disabled: false,
  className: 'btn btn-primary'
}

export default SubmitButton;
