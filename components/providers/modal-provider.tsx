"use client"


import { 
    CreateServerModal
    
} 
    from "@/components/modals/create-server-modal";
import InviteModal from "@/components/modals/inivite-modal";
import { useEffect, useState } from "react";
import React from "react";

export default function ModalProvider(){
    const [isMounted, SetMounted] = useState<boolean>(false);
    useEffect(() => {
        SetMounted(true);
        return () => {
            SetMounted(false);
        }
    }, []);
    if (!isMounted)
        return null;
    console.log("isMounted == > ", isMounted);
    return (
        <>
            {/* <CreateServerModal/> */}
            <InviteModal/>
            {/* <InitialModal/> */}
        </>
    )
}
