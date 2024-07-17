import { useEffect, useState } from "react";

export default function UseOrigin() {
    const [mounted, SetMounted] = useState<boolean>(false)
    useEffect(() => {
        SetMounted(true);
    }, []);
    const origin = typeof window !== "undefined" 
        && window.location.origin ? window.location.origin : ""
    if (!mounted)
        return "";
    return origin;
}