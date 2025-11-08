import "@/styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return(
    <>
  <SessionProvider session={session}>
    <div className="flex flex-col min-h-screen ">
<Header/>
<main className="flex-1 m-4">
      <Component {...pageProps} />
      </main>
<Footer />
  
  </div>
      </SessionProvider>

</>
)
}
