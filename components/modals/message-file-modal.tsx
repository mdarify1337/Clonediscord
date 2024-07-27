"use client";
import '../../list.css'
import * as z from "zod"
import axios from "axios"
import qs from "query-string"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";


import { Button } from "@/components/ui/button";
import {useEffect, useState } from "react";
import {useForm}    from "react-hook-form";
import {zodResolver} from  "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { FileUpload } from "../file-upload";
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
// import { Button } from "../ui/button";

const formShema = z.object({
    FileUrl: z.string().min(1, {
        message: "Attachment  is required.",
    }),
});

export const MessageFileModal = () => {
    const {isOpen, onClose, type, data} = useModal()
    const router = useRouter();
    const isModalOpen = isOpen && type === "messageFile";
    const {apiUrl, query} = data;

    const form = useForm({
        resolver: zodResolver(formShema),
        defaultValues: {
            FileUrl: "",
        }
    })
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formShema>) => {
        try{
            const url = qs.stringifyUrl({
                url: apiUrl || "",
               query,
            })
            await axios.post(url, {
                ...values,
                content: values.FileUrl,
            });
            form.reset();
            router.refresh();
            // window.location.reload();
            handleClose();
        } catch(error) {
            console.log(error);
        }
    };
    const handleClose = () => {
        form.reset();
        onClose();
      };
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose} >
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Add an attachment
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 font-bold">
                        Send a file as a message
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="FileUrl"
                                    render={({field}) =>(
                                        <FormItem>
                                            <FormControl>
                                                {/* sdfsdfsdfdf */}
                                                {/* <FileUpload
                                                    endpoint="messageFile"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                /> */}
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button 
                                    variant={"primary"}  
                                    disabled={isLoading} 
                                    className="button-style">
                                {/* <img src={discord} alt="" className="w-12 h-12" /> */}
                                {isLoading ? "Loading..." : "Send"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
