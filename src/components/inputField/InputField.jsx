import React from "react";

const InputField = ({ label, place, className, ...props }) => {
  return (
    <>
      <div className="forminput-container">
        <label htmlFor={field.name} className="form-label">
          {label}
        </label>
        <input
          placeholder={place}
          type="text"
          className={`form-input ${className}   ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
          autoComplete="off"
          // style={{padding:'1.5rem 0rem'}}
        />
        <ErrorMessage
          component="div"
          name={field.name}
          className="form-error"
        />
      </div>
    </>
  );
};

export default InputField;
