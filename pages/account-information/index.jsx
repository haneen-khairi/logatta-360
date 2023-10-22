import Loaders from "@/Components/UI/Loaders";
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
import { Controller, useForm } from "react-hook-form";

export default function index() {
  const route = useRouter()
  const showSnackbar = useSnackbar()
  const [countries, setCountries] = useState([])
  const [userInfo, setUserInfo] = useState()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileSrc, setSelectedFileSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    let fileType = file.name?.split(".")[file.name.split(".").length - 1].toLowerCase();

    const imageTypes = ['web','png','jpg','jpeg']
    console.log('=== file ===', fileType , imageTypes.includes(fileType))
    if(!imageTypes.includes(fileType)){
      showSnackbar('This file is not supported' , 'error')
      setSelectedFile(null)
      setSelectedFileSrc(null)
    }else{
      setSelectedFile(file)
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileURL = e.target.result;
          setSelectedFileSrc(fileURL);
        };
        reader.readAsDataURL(file);
      }

    }
  };

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
      let user = {
        name: data.name,
        date: data.date_of_birth,
        gender: data.gender,
        phone_number: data.phone_number,
        country: data.country.id
      }
      console.log('=== user ===', user)
      reset({...user})
    } catch (error) {
      console.log('=== error tests ===', error)

    } finally {
      setIsLoading(false)
    }
  }
  function onSubmitAccountInfo(data) {
    const fd = new FormData()
    if(selectedFile !== null){
      fd.append('profile_picture', selectedFile)
    }
    fd.append('name', data.name === "" ? userInfo?.name : data.name)
    fd.append('phone_number', data.phone === "" ? userInfo?.phone_number : data.phone )
    fd.append('country_id', data.country  === "" ? userInfo?.country.id : data.country)
    fd.append('date_of_birth', data.date === "" ? userInfo?.date_of_birth : data.date)
    fd.append('gender', data.gender === "" ? userInfo?.gender : data.gender)
    submitData(fd)
  }
  async function submitData(data){
    try {
      const resData = await AxiosHeadersInstance('put', `${process.env.NEXT_PUBLIC_API_KEY}/account/user/info/`, {} ,{}, data)
      console.log(resData)
      if(resData.status){
        showSnackbar(resData.data, `success`)
        getUserInfo()
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
    setIsLoading(true)
    getUserInfo()
    getCountries()
  }, [route])
  
  return (
    <MainLayout image={selectedFileSrc}>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_TITLE}Account information`}</title>
      </Head>
      <section className="manage__account">
        <h2 className="manage__account--header">Account Information</h2>
        
        <p className="manage__account--paragraph">
          You can update your data here
        </p>
        {isLoading ? 
          <Loaders />
        : <form onSubmit={handleSubmit(onSubmitAccountInfo)}>
          <div className="flex gap-[16px] items-center mb-[24px]">
            <SiteImage src={selectedFileSrc === null ? userInfo?.profile_picture : selectedFileSrc} className="manage__account--image" />
            <label htmlFor="image" className="manage__account--dropimage">
              <div className="content">
                <h5>Profile Picture</h5>
                <span>Click to browse or drag and drop your files</span>
              </div>
            </label>
            <Controller
            name="image"
            control={control}
            defaultValue=""
            render={({ field }) => (

              <input
                {...field}
                type="file"
                id="image"
                hidden
                accept="image/x-png,image/png, image/jpeg, image/jpg , image/png, image/svg,  image/webp"
                onChange={handleFileChange}
                // {...register('image')}
                // register={register}
                // errors={errors}
              />
              )}
            />
          </div>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-[24px]">
            <InputField
              register={register}
              errors={errors}
              errorMessage={{ required: "Full name is required" }}
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
              items={[{value:"M", name:"Male"}, {value:"F", name:"Female"}]}
              initialValue={userInfo?.gender === "M" ? "Male" : "Female"}
              maxLength={200}
            />
            <InputField
              register={register}
              errors={errors}
              errorMessage={{ required: "Phone is required" }}
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
              initialValue={userInfo?.country?.name}
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
            disabled={!(isValid && isDirty || selectedFileSrc !== null) ? true : false}
          >
            Save
          </Button>
        </form>}
      </section>
    </MainLayout>
  );
}
