import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Inputs = ({
  name = '',
  placeholder,
  value = '',
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames(
          'form-control form-control-lg rounded-0 border-left-0 border-right-0 border-top-0',
          {
            'is-invalid': error
          }
        )}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

Inputs.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

Inputs.defaultProps = {
  type: 'text'
};

export default Inputs;
