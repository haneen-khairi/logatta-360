import React from 'react'
import SiteImage from '../UI/SiteImage'

export default function SelectMenuField({
    type,
    initialValue = "",
    placeholder,
    name,
    style,
    label,
    id,
    errors,
    items = [],
    readonly = false,
    register = null,
    errorMessage = {},
    onValueChange = (e) => {}

}) {
  const handleChange = (e) => {
    const selectedValue = e.target.value; // Extracting selected value
    onValueChange(selectedValue); // Call the parent handler with selected value
    console.log('=== e ====',selectedValue)
  };
  return <div className='field relative'>
    {/* <label htmlFor={id}>{name}</label> */}
  <select
        name={name}
        className="form__group--input w-full"
        id={id}
        type={type}
        defaultValue={initialValue}
        style={style}
        readOnly={readonly}
        onChange={handleChange}
        {...register(name, errorMessage )}
      >
    {initialValue !== "" ? <option value="" style={{display: 'none'}}>{initialValue}</option> : <option value="">{"Select on option"}</option> }
    {items.map((item, index) => <option key={index} value={item.value}>{item.name}</option> )}
      </select>
      {errors[name] && <div
          className="flex items-center justify-start gap-x-[8px] error_message"
        >
          <SiteImage
            alt="exclamation mark"
            width={16}
            height={16}
            src="/assets/images/error_icon.svg"
          />

          <p className="text-error">{errors[name].message}</p>
        </div>}
  </div>
}
