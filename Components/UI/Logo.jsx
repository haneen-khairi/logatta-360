import { Image } from '@nextui-org/react'
import React from 'react'

export default function Logo({
    width = 55 ,
    height = 55 ,
    className = "" ,
    src = "/assets/images/Logo/logo.svg"
}) {
  return <Image className={className} src={src} removeWrapper={true} width={width} height={height} />
}
