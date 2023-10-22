import AuthCard from "@/Components/UI/AuthCard";
import SiteImage from "@/Components/UI/SiteImage";
import InputField from "@/Components/fields/InputField";
import { AxiosInstance } from "@/Functions/AxiosInstance";
import MainLayout from "@/Layouts/MainLayout";
import { useSnackbar } from "@/custom-hooks/useSnackbar";
import { Button, Input } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export default function index() {
  const route = useRouter()
  const { email } = route.query
  const showSnackbar = useSnackbar()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  function onSubmitVerify(data) {
    const verification_code = Object.keys(data)
    .filter(key => key.startsWith('number')) // Filter keys that start with 'number'
    .sort() // Optional: Sort the keys if they might not be in order
    .map(key => data[key]) // Map to their corresponding values
    .join(''); // Join the values into a string

    console.log('=== number ===',+verification_code); 
    // const verification_code = parseInt(Object.values(data).join(''));
    verifyEmailApi(verification_code)
    // reset()
  }
  function handleKeyUp(e, fieldName) {
    if (e.target.value.length === 1) {
      const fieldIndex = Number(fieldName.split('number')[1]);
      const nextFieldIndex = fieldIndex + 1;

      if (nextFieldIndex <= 6) {
        const nextFieldName = `number${nextFieldIndex}`;
        const nextInput = document.querySelector(`input[name="${nextFieldName}"]`);

        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };
  function resendCode() {
    console.log("=====resend=====");
  }
  async function verifyEmailApi(data){
    try {
      const verifyRes = await AxiosInstance(
        `post`,
        `${process.env.NEXT_PUBLIC_API_KEY}/account/password/verify/`,
        {},
        {},
        {email , 
          code: data}
      );
      if(verifyRes.status){
        showSnackbar(`${verifyRes.data}`,`success`)
        reset()
      }else{
        showSnackbar(`${verifyRes.error}`,`error`)
      }
      route.push({pathname: '/forget-password/reset-password', query: {email , code:data }})
    } catch (error) {
      console.log('=== error ===', error)
    }
  }
  useEffect(() => {
    if(!route.isReady){
      return;
    }
  
    console.log('=== email ===', email)
  }, [route])
  return (
    <MainLayout>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_TITLE}Verify Email`}</title>
      </Head>
      <section className="login">
        <AuthCard
          title="Verify your email"
          text="To proceed with resetting your password, please check your email and enter the code sent"
          logo={false}
        >
          <form onSubmit={handleSubmit(onSubmitVerify)}>
          <div className="grid grid-cols-6 md:gap-x-[24px] md:gap-x-[16px]">
          {Array(6)
          .fill(null)
          .map((_, index) => (
            <Controller
            key={index}
            name={`number${index + 1}`}
            control={control}
            defaultValue=""
            rules={{ required: true, maxLength: 1 }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                classNames={{
                  input: ["form__group--input--main"],
                  inputWrapper: ["form__group--verify"],
                }}
                placeholder=""
                onKeyUp={(e) => handleKeyUp(e, field.name)}
              />
            )}
          />
          ))}
      </div>
              {/* <InputField
                register={register}
                errors={errors}
                errorMessage={{ required: "Number", maxLength: 1 }}
                className="verify"
                name="number1"
                label={""}
                placeholder={``}
                id={"number1"}
                type={"text"}
                maxLength={1}
              />
              <InputField
                register={register}
                errors={errors}
                errorMessage={{ required: "Number", maxLength: 1 }}
                className="verify"
                name="number2"
                label={""}
                placeholder={``}
                id={"number2"}
                type={"text"}
                maxLength={1}
              />
              <InputField
                register={register}
                errors={errors}
                errorMessage={{ required: "Number", maxLength: 1 }}
                className="verify"
                name="number3"
                label={""}
                placeholder={``}
                id={"number3"}
                type={"text"}
                maxLength={1}
              />
              <InputField
                register={register}
                errors={errors}
                errorMessage={{ required: "Number", maxLength: 1 }}
                className="verify"
                name="number4"
                label={""}
                placeholder={``}
                id={"number4"}
                type={"text"}
                maxLength={1}
              />
              <InputField
                register={register}
                errors={errors}
                errorMessage={{ required: "Number", maxLength: 1 }}
                className="verify"
                name="number5"
                label={""}
                placeholder={``}
                id={"number5"}
                type={"text"}
                maxLength={1}
              />
              <InputField
                register={register}
                errors={errors}
                errorMessage={{ required: "Number", maxLength: 1 }}
                className="verify"
                name="number6"
                label={""}
                placeholder={``}
                id={"number6"}
                type={"text"}
                maxLength={1}
              />
            */}
            {/* </div>  */}
            <Button
              className="special_button w-full"
              type="submit"
              disabled={!isValid ? true : false}
            >
              Verify
            </Button>
          </form>
          <div className="dont_have_acoount flex justify-center">
            <p>Haven’t received a code?</p>
            <Button onClick={resendCode}>
              Resend Code <SiteImage src={"/assets/images/chevron_right.svg"} />
            </Button>
          </div>
        </AuthCard>
      </section>
    </MainLayout>
  );
}
