import AuthCard from "@/Components/UI/AuthCard";
import SiteImage from "@/Components/UI/SiteImage";
import InputField from "@/Components/fields/InputField";
import { AxiosHeadersInstance } from "@/Functions/AxiosHeadersInstance";
import { AxiosInstance } from "@/Functions/AxiosInstance";
import { emailRegex } from "@/Functions/RegexFunction";
import MainLayout from "@/Layouts/MainLayout";
import { useSnackbar } from "@/custom-hooks/useSnackbar";
import { Button, Checkbox } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function index() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const route = useRouter()
  const showSnackbar = useSnackbar()
  function onSubmitChangeEmail(data) {
    console.log("===submit email===", data);
    changeEmail(data);
    // reset()
  }
  async function changeEmail(data) {
    try {
      const changeEmailRes = await AxiosHeadersInstance(
        `post`,
        `${process.env.NEXT_PUBLIC_API_KEY}/account/request-email-change/`,
        {},
        {},
        data
      );
      if(changeEmailRes.status){
        showSnackbar(`${changeEmailRes.data}`,`success`)
        reset()
        route.push({pathname: '/change-email/verify/', query: {email : data.email}})
      }else{
        showSnackbar(`${changeEmailRes.error}`,`error`)
      }
    } catch (error) {
      console.log('=== error ===', error)
    }
  }
  return (
    <MainLayout>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_TITLE}Change email`}</title>
      </Head>
      <section className="login">
        <AuthCard
          title="Change Email Adderss"
          text="To proceed with changing your email, please provide your current email address"
          logo={false}
        >
          <form onSubmit={handleSubmit(onSubmitChangeEmail)}>
            <div className="grid grid-cols-1 gap-y-[24px]">
              <InputField
                register={register}
                errors={errors}
                errorMessage={{
                  required: "Email is required",
                  pattern: {
                    value: emailRegex,
                    // Change this regex pattern as needed
                    message: "Email is invalid",
                  },
                }}
                name="email"
                label={""}
                placeholder={"Email"}
                id={"email"}
                type={"email"}
                maxLength={200}
              />

              <Button
                className="special_button"
                type="submit"
                disabled={!isValid ? true : false}
              >
                {/* {" "} */}
                Next
              </Button>
            </div>
          </form>
        </AuthCard>
      </section>
    </MainLayout>
  );
}
