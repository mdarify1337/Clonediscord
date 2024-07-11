"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

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

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { useModal } from "@/hooks/use-modal-store";

const formShema = z.object({
    name: z.string().min(1, {
        message: "Server name is required.",
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required.",
    }),
});

export const InitialModal = () => {
    const {isOpen, onClose, type} = useModal()

    const [isMounted, SetMounted] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        SetMounted(true);
    }, []);
    const format = useForm({
        resolver: zodResolver(formShema),
        defaultValues: {
            name: "",
            imageUrl: "",
        },
    });
    const isLoading = format.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formShema>) => {
        try{
            await   axios.post("/api/servers", values);
            format.reset();
            router.refresh();
            window.location.reload();
        } catch(error) {
            console.log(error);
        }
        console.log(values);
    };
    if (!isMounted) return null;
    const handClose= () => {
        format.reset();
        onClose();
    }
    return (
        <Dialog open={true} onOpenChange={handClose} >
            <DialogContent className="bg-white text-black p-4 overflow-hidden">
                <DialogHeader className="pt-8 p-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        CusTomize Your Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your server a personality with a name and an image.
                        <br />
                        You can always change it later.
                    </DialogDescription>
                </DialogHeader>
                <Form {...format}>
                    <form onSubmit={format.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={format.control}
                                    name="imageUrl"
                                    render={({field}) =>(
                                        <FormItem>
                                            <FormControl>
                                                {/* sdfsdfsdfdf */}
                                                <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={format.control}
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
                            {/* <FormField
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Server Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter server name" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Server Image URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter image URL" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             */}
                        </div>
                        <DialogFooter className="bg-gray-100 px-3 py-4">
                            <Button variant="primary" disabled={isLoading}>
                                {isLoading ? "Loading..." : "Create Server"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
