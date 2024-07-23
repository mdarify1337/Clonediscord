"use client"


import { 
    CreateServerModal
    
} 
    from "@/components/modals/create-server-modal";
import InviteModal from "@/components/modals/inivite-modal";
import { useEffect, useState } from "react";
import React from "react";
import  {EditServerModal}  from "@/components/modals/edit-server-modal";
import MemberModal from "@/components/modals/member-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import LeaveServerModal from "@/components/modals/leave-server-modal";
import DeleteServerModal from "@/components/modals/delete-server-modal";

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
            <CreateServerModal/>
            <InviteModal/>
            <EditServerModal/>
            <MemberModal/>
            <CreateChannelModal/>
            <LeaveServerModal/>
            <DeleteServerModal/>
        </>
    )
}
