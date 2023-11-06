import AuthCard from '@/Components/UI/AuthCard'
import EmptyStateCard from '@/Components/UI/EmptyStateCard'
import Loaders from '@/Components/UI/Loaders'
import SiteImage from '@/Components/UI/SiteImage'
import TestsCard from '@/Components/UI/TestsCard'
import InputField from '@/Components/fields/InputField'
import { AxiosHeadersInstance } from '@/Functions/AxiosHeadersInstance'
import MainLayout from '@/Layouts/MainLayout'
import { Button } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import  { useEffect, useState } from 'react'

export default function index() {
  const route = useRouter()
  const [pdfLink, setPdfLink] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [tests, setTests] = useState([
  ])
  async function getTests(){
    try {
      const testRes =  await AxiosHeadersInstance(`get`, `${process.env.NEXT_PUBLIC_API_KEY}/tests/suggested-tests/`) 
      console.log('=== get tests ===', testRes)
      if(testRes.status){
        setTests(testRes.data.suggested_urls)
        setPdfLink(testRes.data.pdf_results_url)
        setIsLoading(false)
      }
    } catch (error) {
      console.log('=== error tests ===', error)

    } finally {
      // Set isLoading to false whether the token check succeeds or fails
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }
  useEffect(() => {
    if(!route.isReady){
      return
    }
    setIsLoading(true)
    getTests()
    return () => {
      
    }
  }, [route])
  
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Tests`}</title>
    </Head>
    {isLoading ? (
      <Loaders />
    ):
      tests.length > 0 ? <section className='tests'>
      <div className="tests__content">
        <h4 className="tests__content--header">Tests</h4>
        <p className="tests__content--paragraph">We recommend you take the following tests</p>
      </div>
      <div className="tests__cards">
      {pdfLink !== "null" && <div className="grid grid-col-1">
          <div className="tests__cards--full">
            <h4 className="tests__cards--full-header">Your Brain Profile Assessment Results</h4>
            <p className="tests__cards--full-paragraph">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            <Button as={Link} href={pdfLink} target="_blank"  color='white' className="tests__cards--full-button">
            Download PDF <SiteImage src={'/assets/images/download_icon.svg'} />
            </Button>
          </div>
        </div>}
        <div className="grid lg:grid-cols-2 lg:grid-cols-1 lg:gap-x-[40px] sm:mb-[24px]  ">
          {tests.length > 0 && tests.map((test) => <TestsCard key={test.id} imageSrc={test.image} title={test.title} link={test.url} />)}
        </div>
      </div>
    </section> : <section className='section__single'>
       <EmptyStateCard className='card__test' imageSrc='/assets/images/empty-test.svg' title="You haven’t reached the test yet" text="Our experts are currently preparing your assessment. We will get back to you soon." />
    </section>}
  </MainLayout>
  
}
