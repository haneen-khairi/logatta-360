import SiteImage from "../UI/SiteImage";


export default function TextareaField({
    initialValue = "",
    name,
    style,
    label,
    id,
    errors,
    placeholder = `Please type some text`,
    readonly = false,
    register = null,
    errorMessage = {},
    validations = [],
    maxLength = 1000,

}) {

  return <>
  {/* <label htmlFor={id}>{label}</label> */}
  <div className="field relative">
    <textarea
      maxLength={maxLength}
      name={name}
      placeholder={placeholder}
      className="form__group--textarea"
      id={id}
      defaultValue={initialValue}
      style={style}
      readOnly={readonly}
      {...register(name, errorMessage )}
    ></textarea>
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
    {/* {errors[name] && <span className="error">{errors[name].message}</span>} */}

  </>
}
