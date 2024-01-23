import { Inter } from 'next/font/google'
import './globals.css'
// import { Header } from '@/components/HeaderAndFooter/Header'
import Footer from '@/components/HeaderAndFooter/Footer'
import NewHeader from '@/components/HeaderAndFooter/NewHeader'
import NextTopLoader from 'nextjs-toploader';
import Parentheader from '@/components/HeaderAndFooter/Parentheader';
import Head from 'next/head';
// import AmpImage from '@/components/homepage/AmpImage';

const inter = Inter({ subsets: ['latin'] })

// export const ADMINURL = "https://stg.lazzyreaders.com/"

export const metadata = {
  title: 'Lazzyreaders',
  description: 'Lazzyreaders',
}

export const AdminUrl = 'https://stg.lazzyreaders.com'

export const config = { amp: true }


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />

      </Head>
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} easing="ease" />

        <Parentheader />
        <div className='max-w-[1280px] mx-auto'>
          
          {children}
        </div>
        <Footer />
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <amp-script layout="container" src="https://cdn.ampproject.org/v0/amp-script-0.1.js"></amp-script>


      </body>
    </html>
  )
}

