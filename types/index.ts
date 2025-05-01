import { ToastContentProps } from "react-toastify";

export type CustomNotificationProps = ToastContentProps<{
    variant: Variant;
    content: string;
}>;

export type Variant = "success" | "error" | "info" | "warning";