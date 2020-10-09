/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import NProgress from 'nprogress'
import smoothscroll from 'smoothscroll-polyfill'
require('typeface-barlow')
import '../styles/tailwind.css'

let loadingTimer
Router.events.on('routeChangeStart', () => {
  NProgress.configure({ showSpinner: false })
  loadingTimer = setTimeout(() => NProgress.start(), 350)
})
Router.events.on('routeChangeComplete', () => {
  clearTimeout(loadingTimer)
  NProgress.done()
})
Router.events.on('routeChangeError', () => {
  clearTimeout(loadingTimer)
  NProgress.done()
})

export default function NusszopfApp({ Component, pageProps }) {
  useEffect(() => {
    // polyfill: https://github.com/iamdustan/smoothscroll
    smoothscroll.polyfill()
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
      </Head>
      <div id="nusszopf" className="flex flex-col h-screen">
        <Component {...pageProps} />
      </div>
    </>
  )
}