import { CustomNotification } from "@/components/ui/custom-notification";
import { Variant } from "@/types";
import { Bounce, toast } from "react-toastify";




export const useToast = () => {
    const toastHook = (variant: Variant, content: string) => {
        return toast(CustomNotification, {
            data: {
                variant: variant,
                content: content,

            },
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }


    return toastHook;



}