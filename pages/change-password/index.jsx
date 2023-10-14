import AuthCard from '@/Components/UI/AuthCard'
import SiteImage from '@/Components/UI/SiteImage'
import InputField from '@/Components/fields/InputField'
import { AxiosHeadersInstance } from '@/Functions/AxiosHeadersInstance'
import { passwordRegex } from '@/Functions/RegexFunction'
import MainLayout from '@/Layouts/MainLayout'
import { useSnackbar } from '@/custom-hooks/useSnackbar'
import { Button, Checkbox } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function index() {
  const route = useRouter()
  const showSnackbar = useSnackbar()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange'
  });
  function onSubmitChangePassword(data){
    console.log('===submit password===', data)
    verifyPasswordApi(data)
    // reset()
  }
  async function verifyPasswordApi(data){
    try {
      const verifyPasswordRes = await AxiosHeadersInstance(
        `post`,
        `${process.env.NEXT_PUBLIC_API_KEY}/account/verify-current-password/`,
        {},
        {},
        data
      );
      if(verifyPasswordRes.status){
        showSnackbar(`${verifyPasswordRes.data}`,`success`)
        route.push('/reset-password')
        reset()
      }else{
        showSnackbar(`${verifyPasswordRes.error}`,`error`)
      }
      // route.push({pathname: '/verify-email', query: {email , code:verification_code }})
    } catch (error) {
      console.log('=== error ===', error)
    }
  }
  useEffect(() => {
    if(!route.isReady){
      return;
    }
  
  }, [route])
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Change Password`}</title>
    </Head>
    <section className='login'>
      <AuthCard title='Change Password' text='To proceed with changing your password, please provide your current password' logo={false}>
        <form onSubmit={handleSubmit(onSubmitChangePassword)}>
          <div className="grid grid-cols-1">
            <InputField 
            register={register}
            errors={errors}
            errorMessage={{ required: 'Password is required' , 
            pattern: {
              value: passwordRegex,
                  // Change this regex pattern as needed
              message: "Password is invalid",
              },
            }}
            name='current_password' label={''} placeholder={'Password (Required)'} id={'current_password'} type={'password'} maxLength={200} />
            <div className="flex justify-end mb-[24px]">
                <Link href={'/forget-password'} className='login__remember--forget'>Forgot Password?</Link>

            </div>
            <Button className='special_button' type='submit' disabled={!isValid ? true : false}>Next</Button>
          </div>

        </form>
      </AuthCard>
    </section>
  </MainLayout>
  
}
