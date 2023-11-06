
import React, { useEffect, useState } from "react";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuItem, NavbarMenuToggle, NavbarMenu, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem} from "@nextui-org/react";
import Logo from "@/Components/UI/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import SiteImage from "@/Components/UI/SiteImage";
import { logout } from "@/Functions/GlobalFunctions";
import { AxiosHeadersInstance } from "@/Functions/AxiosHeadersInstance";
export default function Header({
  image = null
}) {
  const route = useRouter()
  const [token, setToken] = useState()
  const [userInfo, setUserInfo] = useState()
  // const {}
  function getToken(){
    if(typeof window !== undefined){
      setToken(localStorage.getItem('token'))
    }
  }
  function onLogout(){
    logout()
    window.location.href = '/'
  }
  async function getUserInfo(){
    try {
      const {data} =  await AxiosHeadersInstance(`get`, `${process.env.NEXT_PUBLIC_API_KEY}/account/user/info`) 
      setUserInfo(data)
      console.log('=== data ===', data)
    } catch (error) {
      console.log('=== error tests ===', error)

    }
  }
  const menuItems = [
    "Home",
    "Contact Us",
    // "Activity",
    // "Analytics",
    // "System",
    // "Deployments",
    // "My Settings",
    // "Team Settings",
    // "Help & Feedback",
    // "Log Out",
  ];
  useEffect(()=> {
    if(!route.isReady){
      return
    }
    getToken()
    if(token){
      getUserInfo()
    }

  }, [route, token])
  return (
    <Navbar className="navbar"  isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Logo className="w-[80%]" />
        </NavbarBrand>
      </NavbarContent>
      
      {token ? <>
        <NavbarContent className="navbar__menu hidden sm:flex gap-4" justify="center">
        <Link href={'/'} >
          <Logo className="w-full" />
        </Link>
        <NavbarItem as={Link} href="/" isActive={route.pathname === '/' ? true : false} className="navbar__menu--link">
          {/* <Link className="" href="/"> */}
            Home
          {/* </Link> */}
        </NavbarItem>
        <NavbarItem as={Link} href="/tests" isActive={route.pathname === '/tests' ? true : false} className="navbar__menu--link">
          Tests
        </NavbarItem>
        <NavbarItem as={Link} href="/plan" isActive={route.pathname === '/plan' ? true : false} className="navbar__menu--link">
          Plan
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="dropdown" justify="end">
        
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                

                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent min-h  "
                startContent={
                  <SiteImage className="navbar__profile--pic" src={ image !== null ? image :  userInfo?.profile_picture === null  ? '/assets/images/Profile_photo.svg'  : userInfo?.profile_picture} />
                }
                endContent={
                  <SiteImage src={'/assets/images/arrow_drop_down.svg'} />
                }
                radius="sm"
                variant="light"
              >
                <p className="hidden sm:flex">{userInfo?.name}</p>
              </Button>
              
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem 
            as={Link}
            href="/account-information"
            showDivider
              key="Account Information"
              startContent={
                <SiteImage src={'/assets/images/setting.svg'}/>
              }
            >
                Account Information
              {/* <Link href="/account-information">
              </Link> */}
            </DropdownItem>
            <DropdownItem
              key="Logout"
              onClick={onLogout}
              startContent={
                <SiteImage  src={'/assets/images/logout.svg'}/>

              }
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      </>:<>
      <NavbarContent className="navbar__menu hidden sm:flex gap-4" justify="center">
        <Link href={'/'} className="mr-[56px]">
          <Logo />
        </Link>
        <NavbarItem isActive={route.pathname === '/' ? true : false} className="navbar__menu--link">
          <Link className="" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={route.pathname === '/contact-us' ? true : false} className="navbar__menu--link">
          <Link className="" href="/contact-us">
          Contact Us
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        
        <NavbarItem>
          <Button as={Link} className="navbar__signup" href="/create-account" variant="flat">
            sign up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} className="navbar__login" href="/login" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
      </>
      }

      <NavbarMenu>
        { !token ?<> <NavbarMenuItem isActive={route.pathname === '/' ? true : false} className="navbar__menu--link">
          <Link className="" href="/">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={route.pathname === '/contact-us' ? true : false} className="navbar__menu--link">
          <Link className="" href="/contact-us">
          Contact Us
          </Link>
        </NavbarMenuItem></> : <>
        <NavbarMenuItem  isActive={route.pathname === '/' ? true : false} className="navbar__menu--link">
        <Link className="" href="/">
          Home
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem isActive={route.pathname === '/tests' ? true : false} className="navbar__menu--link">
        <Link className="" href="/tests">

        Tests
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem  isActive={route.pathname === '/plan' ? true : false} className="navbar__menu--link">
        <Link className="" href="/plan">

        Plan
        </Link>
      </NavbarMenuItem></> }
        {/* {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))} */}
      </NavbarMenu>
    </Navbar>
  );
}
