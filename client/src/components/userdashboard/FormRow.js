const FormRow = ({ type, name, value, handleChange, labelText }) => {
    return (
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label>
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className='form-input fonts'
        //   style={{width:"40%"}}
        />
      </div>
    )
  }
  
  export default FormRow
  