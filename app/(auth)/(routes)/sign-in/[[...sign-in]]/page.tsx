"use client"
import { SignIn, useUser } from "@clerk/nextjs";
import type { AppProps } from 'next/app';
import '../../../../globals.css';
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page({ Component, pageProps }: AppProps) {
  return <SignIn {...pageProps} />;
}
