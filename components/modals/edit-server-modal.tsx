"use client";
import '../../list.css'
import * as z from "zod"
import axios from "axios"
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
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { useModal } from "@/hooks/use-modal-store";

import { Button } from "@/components/ui/button";
import {useForm}    from "react-hook-form";
import {zodResolver} from  "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { FileUpload } from "../file-upload";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const formShema = z.object({
    name: z.string().min(1, {
        message: "Server name is required.",
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required.",
    }),
});

export const EditServerModal = () => {
    const {isOpen, onClose, type, data} = useModal()
    const router = useRouter();

    const isModalOpen = isOpen && type === "editServer";
    const {server} = data;
    const form = useForm({
        resolver: zodResolver(formShema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    })
    useEffect(() => {
        if (server){
            form.setValue("name", server.name);
            form.setValue("imageUrl", server.imageUrl);
        }
    }, [server, form]);

    const isLoading = form.formState.isSubmitted;
    const onSubmit = async (values: z.infer<typeof formShema>) => {
        try{
            await axios.patch(`/api/servers/${server?.id}`, values)
            form.reset();
            router.refresh();
        } catch(error) {
            console.log(error);
        }
    };

    const handClose= () => {
        form.reset();
        onClose();
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={handClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Editing Your Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your server a personality with a name and an image.
                        <br />
                        You can always change it later.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({field}) =>(
                                        <FormItem>
                                            <FormControl>
                                                {/* sdfsdfsdfdf */}
                                                {/* <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                /> */}
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormItem>
                                            <FormLabel
                                                className="upppercase text-xs 
                                                font-bold text-zinc-500
                                                dark:text-secondary/70"
                                            >
                                                Server name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className="bg-zinc-300/50 border-0
                                                focus-visible:ring-0 text-black
                                                focus-visible:ring-offest-0"
                                                    placeholder="Enter server name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant={"primary"}  disabled={isLoading} className="button-style">
                                {/* <img src={discord} alt="" className="w-12 h-12" /> */}
                                {isLoading ? "Loading..." : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
    
};
