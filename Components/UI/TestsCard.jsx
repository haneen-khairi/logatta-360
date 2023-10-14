import React from 'react'
import SiteImage from './SiteImage'
import Link from 'next/link'

export default function TestsCard({
    imageSrc,
    title,
    link = ""
}) {
  return <div className="card card__tests">
    <SiteImage className='w-full' src={imageSrc} />
    <a href={link} className="card__tests--body flex items-center">
        <SiteImage src={'/assets/images/link.svg'} />
        <h4 className='card__tests--body-title'>{title}</h4>
    </a>
  </div>
}
