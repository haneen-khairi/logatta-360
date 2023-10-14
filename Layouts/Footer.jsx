import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return <footer className='footer'>
    <div className="grid grid-col-12">
      <p className='footer__copyrights'>© 2023 Uplift360. All rights reserved</p>
      <div className='footer__links'>
          <Link href={'/terms-conditions'} className='footer__links--a'>Terms and Conditions</Link>
          <Link href={'/privacy-policy'} className='footer__links--a'>Private Policy</Link>
      </div>
    </div>
  </footer>
}
