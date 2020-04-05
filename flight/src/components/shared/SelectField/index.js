import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.css';

function SelectField({ fieldName, label, error, id, onChange, options, prompt, selectedOption }) {
  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      <label htmlFor={id}>{label}</label>
      <select id={id} className="form-control" name={fieldName} onChange={onChange} value={selectedOption}>
        {prompt && prompt.length > 0 &&
          <option key='prompt-message' value=''>{prompt}</option>
        }

        {options.map((option, index) => {
          return <option key={index} value={option.value}>{option.name}</option>
        })}
      </select>
      {error && <small className='form-text error'>{error}</small>}
    </div>
  );
}

SelectField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  prompt: PropTypes.string,
  selectedOption: PropTypes.string
}

export default SelectField;
