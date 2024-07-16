"use client"


import { CreateServerModal } from "@/components/modals/create-server-modal";
import React from "react";
import { useEffect, useState } from "react";
import { InitialModal } from "../modals/initial-modal";


export default function ModalProvider(){
    const [isMounted, SetMounted] = useState<boolean>(false);
    useEffect(() => {
        SetMounted(true);
    }, []);
    if (!isMounted)
        return null;
    console.log("isMounted == > ", isMounted);
    return (
        <>
            <CreateServerModal/>
            {/* <InitialModal/> */}
        </>
    )
}
