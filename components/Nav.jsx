"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [providers, setProviders] = useState(null);

  useEffect( () => {
    const initProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    initProviders();
  }, [])

  // to SingIn
  const ProvidersButton = (
    providers && (
      Object.values(providers).map( (provider) => (
        <button
          key={provider.name}
          onClick={() => signIn(provider.id)}
          className='black_btn'
        >Sing In</button>
      ))
    )
  )

  return (
    <nav className='flex justify-between mt-4'>
      <Link href='/' className='flex gap-2 items-center'>
        <Image
          width={30}
          height={30}
          src='/assets/images/logo.svg'
          alt='image'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop navigation */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn
          ? (
            <div className='flex gap-3 md:gap-5'>
              <Link
                href='/create-prompt'
                className='black_btn'
              >
                Create Post
              </Link>
              <button
                onClick={signOut}
                className='outline_btn'
              >
                Sing Out
              </button>
              <Link href='/profile'>
                <Image
                  width={37}
                  height={37}
                  src='/assets/images/logo.svg'
                  alt='profile'
                  className='rounded-full'
                />
              </Link>
            </div>
          )
          : (
            <div>
              {ProvidersButton}
            </div>
          )
        }
      </div>

      {/* Mobile navigation */}
      <div className='sm:hidden flex relative'>
        {isUserLoggedIn
          ? (
            <div>
              <Image
                  width={37}
                  height={37}
                  src='/assets/images/logo.svg'
                  alt='profile'
                  className='rounded-full'
                  onClick={() => setToggleDropDown(prev => !prev)}
              />

              {toggleDropDown && (
                <div className='dropdown'>
                  <Link
                    href='profile'
                    className='dropdown_link'
                    onClick={() => setToggleDropDown(false)}
                  >
                    MyProfile
                  </Link>
                  <Link
                    href='create-prompt'
                    onClick={() => toggleDropDown(false)}
                    className='dropdown_link'
                  >
                    Create Prompt
                  </Link>
                  <button 
                    onClick={() => {
                      setToggleDropDown(false);
                      signOut();
                    }}
                    className='mt-5 w-full black_btn'
                  >
                    Sing Out
                  </button>
                </div>
              )}
            </div>
          )
          : (
            <div>
              {ProvidersButton}
            </div>
          )
        }
      </div>
    </nav>
  )
}

export default Nav