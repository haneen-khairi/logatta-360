import SiteImage from "@/Components/UI/SiteImage";
import InputField from "@/Components/fields/InputField";
import SelectMenuField from "@/Components/fields/SelectField";
import { AxiosHeadersInstance } from "@/Functions/AxiosHeadersInstance";
import { emailRegex, passwordRegex } from "@/Functions/RegexFunction";
import MainLayout from "@/Layouts/MainLayout";
import { useSnackbar } from "@/custom-hooks/useSnackbar";
import { Button } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function index() {
  const route = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange"
  });
  const showSnackbar = useSnackbar()
  const [countries, setCountries] = useState([])
  const [userInfo, setUserInfo] = useState()
  async function getCountries(){
    try {
      const {data} =  await AxiosHeadersInstance(`get`, `${process.env.NEXT_PUBLIC_API_KEY}/account/countries`) 
      let coun =  data.map((country) =>{
        country.value = country.id
        return country
      })
      setCountries(coun)
    } catch (error) {
      console.log('=== error tests ===', error)

    }
  }
  async function getUserInfo(){
    try {
      const {data} =  await AxiosHeadersInstance(`get`, `${process.env.NEXT_PUBLIC_API_KEY}/account/user/info`) 
      console.log('== user ===', data)
      setUserInfo(data)
    } catch (error) {
      console.log('=== error tests ===', error)

    }
  }
  function onSubmitAccountInfo(data) {


    const fd = new FormData()
    if(data.image.length !== 0){
      fd.append('image', data.image[0])
    }
    fd.append('name', data.name === "" ? userInfo?.name : data.name)
    fd.append('phone', data.phone === "" ? userInfo?.phone_number : data.phone )
    fd.append('country', data.country  === "" ? userInfo?.country.id : data.date)
    fd.append('date', data.date === "" ? userInfo?.date_of_birth : data.date)
    fd.append('gender', data.gender)
    console.log("===submit email===", data);
    submitData(fd)
    // reset()
  }
  async function submitData(data){
    try {
      const resData = await AxiosHeadersInstance('put', `${process.env.NEXT_PUBLIC_API_KEY}/account/user/info/`, {} ,{}, data)
      console.log(resData)
      if(resData.status){
        showSnackbar(resData.data, `success`)
      }else{
        showSnackbar(resData.error, `error`)

      }
    } catch (error) {
      console.log('=== error ===',error)

    }
  }
  useEffect(() => {
    if(!route.isReady){
      return
    }
    getUserInfo()
    getCountries()
  }, [route])
  
  return (
    <MainLayout>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_TITLE}Account information`}</title>
      </Head>
      <section className="manage__account">
        <h2 className="manage__account--header">Account Information</h2>
        
        <p className="manage__account--paragraph">
          You can update your data here
        </p>
        <form onSubmit={handleSubmit(onSubmitAccountInfo)}>
          <div className="flex gap-[16px] items-center mb-[24px]">
            <SiteImage src={userInfo?.profile_picture} />
            <label htmlFor="image" className="manage__account--dropimage">
              <div className="content">
                <h5>Profile Picture</h5>
                <span>Click to browse or drag and drop your files</span>
              </div>
            </label>
            <input
              name="image"
              type="file"
              id="image"
              hidden
              {...register('image')}
              // register={register}
              // errors={errors}
            />
          </div>
          {console.log('errors', errors)}
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-[24px]">
            <InputField
              register={register}
              errors={errors}
              // errorMessage={{ required: "Full name is required" }}
              name="name"
              label={""}
              placeholder={"name"}
              id={"name"}
              type={"text"}
              initialValue={userInfo?.name}
              maxLength={200}
            />
            
            <SelectMenuField
              register={register}
              errors={errors}
              // errorMessage={{ required: "Gender is required" }}
              name="gender"
              label={""}
              placeholder={"gender"}
              id={"gender"}
              type={"text"}
              items={[{value:"M", name:"Male"}, {value:"F", name:"female"}]}
              initialValue={userInfo?.gender}
              maxLength={200}
            />
            <InputField
              register={register}
              errors={errors}
              // errorMessage={{ required: "Phone is required" }}
              name="phone"
              label={""}
              placeholder={"phone"}
              id={"phone"}
              type={"number"}
              initialValue={userInfo?.phone_number}
              maxLength={200}
            />
            <InputField
              register={register}
              errors={errors}
              // errorMessage={{ required: "Date is required" }}
              name="date"
              label={""}
              placeholder={"date"}
              id={"date"}
              type={"date"}
              initialValue={userInfo?.date_of_birth}
              maxLength={200}
            />
            <div className="form__group--links text-right">
              {/* <input
                // register={register}
                // errors={errors}
                // errorMessage={{
                //   required: "Email is required",
                //   pattern: {
                //     value: emailRegex,
                //     // Change this regex pattern as needed
                //     message: "Email is invalid",
                //   },
                // }}
                name="email"
                label={""}
                placeholder={"email"}
                id={"email"}
                type={"email"}
                initialValue={"adeebshaban@mail.com"}
                maxLength={200}
              /> 
              <Link href={"/change-email"}>Change email</Link>
              */}
            </div>
            <SelectMenuField
              register={register}
              errors={errors}
              // errorMessage={{ required: "Country is required" }}
              items={countries}
              name="country"
              id={"country"}
              initialValue={userInfo?.country?.id}
              maxLength={200}
            />
            <div className="form__group--links flex justify-between">
              {/* <InputField
                register={register}
                errors={errors}
                errorMessage={{
                  required: "Password is required",
                  pattern: {
                    value: passwordRegex,
                    // Change this regex pattern as needed
                    message: "Password is invalid",
                  },
                }}
                name="password"
                label={""}
                placeholder={"password"}
                id={"password"}
                type={"password"}
                initialValue={"***************"}
                maxLength={200}
              /> */}
              <Link href={"/change-email"}>Change email</Link>

              <Link href={"/change-password"}>Change Password</Link>
            </div>
          </div>
          <Button
            className="special_button manage__account--button"
            type="submit"
            disabled={!isValid ? true : false}
          >
            Save
          </Button>
        </form>
      </section>
    </MainLayout>
  );
}
