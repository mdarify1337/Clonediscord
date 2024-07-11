"use client"


import { CreateServerModal } from "@/components/modals/create-server-modal";
import React from "react";
import { useEffect, useState } from "react";


export default function ModalProvider(){
    const [isMounted, SetMounted] = useState<boolean>(false);
    useEffect(() => {
        SetMounted(true);
    }, []);
    if (!isMounted)
        return null;
    return (
        <React.Fragment>
            <CreateServerModal/>
        </React.Fragment>
        
    )
}