import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import Provider from '@/components/Provider';

export const metadata = {
  title: 'Promtopia',
  description: 'Discover & share IA Prompts'
}

const interFont = Inter({
  subsets: ['latin']
});

const RootLayout = ({ children }) => {

  return (
    <html lang='en'>
      <body className={interFont.className}>
        <Provider>
          <div className='app-bg'>
            <div className='gradient' />
          </div>
          <div className='app'>
            <header className='w-full'>
              <Nav />
            </header>
            <main>
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout