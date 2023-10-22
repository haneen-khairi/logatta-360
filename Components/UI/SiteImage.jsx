import { Image } from '@nextui-org/react'
import React from 'react'

export default function SiteImage({
    src,
    className = ""
}) {
  return <Image className={`${className} rounded-none`} removeWrapper={true} src={src}  />
}
