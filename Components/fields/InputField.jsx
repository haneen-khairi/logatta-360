import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import SiteImage from "../UI/SiteImage";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";

export default function InputField({
  type,
  initialValue = "",
  name,
  style,
  label,
  className,
  id,
  errors,
  placeholder = `Please type some text`,
  readonly = false,
  onValueChange = (e) => {},
  register = null,
  errorMessage = {},
  validations = [],
  maxLength = 250,
}) {
  // Create an object to store the visibility state for each input
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <>
      {/* <label htmlFor={id}>{label}</label> */}
      <div className="field relative">
        {type === "email" ? (
          <Input
            maxLength={maxLength}
            name={name}
            placeholder={placeholder}
            // className="form__group--input"
            classNames={{
              input: ["form__group--input--main"],
              inputWrapper: ["form__group--input" , className],
            }}
            id={id}
            type={type}
            defaultValue={initialValue }
            style={style}
            readOnly={readonly}
            // onChange={onValueChange}
            startContent={
              <SiteImage className="icon" src={"/assets/images/mail.svg"} />
            }
            {...register(name, errorMessage )}
          />
        ) : type === "password" ? (
          <Input
            maxLength={maxLength}
            name={name}
            placeholder={placeholder}
            id={id}
            classNames={{
              input: ["form__group--input--main"],
              inputWrapper: ["form__group--input" , className],
            }}
            // onChange={onValueChange}
            defaultValue={initialValue}
            style={style}
            readOnly={readonly}
            startContent={
              <SiteImage className="icon" src={"/assets/images/password.svg"} />
            }
            endContent={
              <button
                className="focus:outline-none form__group--input-password"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            {...register(name, errorMessage )}
          />
        ) : className === "verify" ? (
          <Input
            maxLength={maxLength}
            name={name}
            placeholder={placeholder}
            id={id}
            classNames={{
              input: ["form__group--input--main"],
              inputWrapper: ["form__group--verify"],
            }}
            onKeyUp={onValueChange}
            type={type}
            defaultValue={initialValue}
            style={style}
            readOnly={readonly}
            {...register(name, errorMessage )}
          />
        ) : (
          <input
            maxLength={maxLength}
            name={name}
            placeholder={placeholder}
            id={id}
            className="form__group--input w-full"
            // classNames={{
            //   input: ["form__group--input--main"],
            //   inputWrapper: ["form__group--input" , className],
            // }}
            type={type}
            
            defaultValue={initialValue}
            style={style}
            // onChange={onValueChange}
            readOnly={readonly}
            {...register(name, errorMessage )}
          />
        )}


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
    </>
  );
}
