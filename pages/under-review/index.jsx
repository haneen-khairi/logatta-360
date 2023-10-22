import AuthCard from '@/Components/UI/AuthCard'
import EmptyStateCard from '@/Components/UI/EmptyStateCard'
import SiteImage from '@/Components/UI/SiteImage'
import InputField from '@/Components/fields/InputField'
import MainLayout from '@/Layouts/MainLayout'
import { Button, Checkbox } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function index() {
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Tests`}</title>
    </Head>
    <section className='section__single'>
      <EmptyStateCard imageSrc='/assets/images/under_review.svg'  title="Your Application is Under Review" text="Our experts will review your information and get back to you in 48 hours" />
    </section>
  </MainLayout>
  
}
