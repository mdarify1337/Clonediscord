import { SignIn } from "@clerk/nextjs";
import type { AppProps } from 'next/app';
import '../../../../globals.css'

export default function Page({Component, pageProps}: AppProps) {
    return <SignIn {...pageProps}/>
}