import React from 'react';
import NumberFormat from 'react-number-format';


const Phone = (props) => {
	console.log(props.value);
	return (
  <div className="form-group">
    <label for={props.name} className="form-label">{props.title}</label>
    <phone
      className="form-control"
      id={props.name}
      name={props.name}
      type={props.inputType}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      {...props} />
  </div>
)
}

export default Phone;
