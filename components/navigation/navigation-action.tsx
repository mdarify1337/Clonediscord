"use client"

import { Plus } from 'lucide-react'
import React from 'react'
import AciontTooltip from '../action-tooltip'
// import AciontTooltip from "@/components"
import { useModal } from '@/hooks/use-modal-store'


export default function NavigationAction() {
    const {onOpen} = useModal();
    console.log("onOpen == ", onOpen);
    return (
        // <p>helll</p>
        <div className=''>
            <AciontTooltip
                side="right"
                align="center"
                label="Add a server"
            >
                <button
                    onClick={() => onOpen("createServer")}
                    className='group flex items-center'>
                    <div className="flex mx-3 h-[48px]
            w-[48px] rounded-[24px] group-hover:rounded-[16px]
            transition-all overflow-hidden items-center justify-center
            dark:bg-neutral-700 border-green-700 bg-background
            group-hover:bg-emerald-500">
                        <Plus
                            size={25}
                            className='group-hover:text-white transition
                 text-emerald-600'
                        />
                    </div>
                </button>
            </AciontTooltip>
        </div>
    )
}

