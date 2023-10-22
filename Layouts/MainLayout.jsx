import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function MainLayout({
    children,
    hideNavbar = false,
    image = null
}) {
  return <>
    {!hideNavbar && <Header image={image} />}
    <div className="main__container">
      {children}
    </div>
    <Footer />
  </>
}
