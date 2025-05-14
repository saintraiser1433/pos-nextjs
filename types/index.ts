import { UseFormSetValue } from "react-hook-form";
import { ToastContentProps } from "react-toastify";

export type CustomNotificationProps = ToastContentProps<{
  variant: Variant;
  content: string;
}>;

export type ComboBoxItemProps = {
  value: string;
  label: string;
};


export type ImageDropProps = {
  preview: string | null;
  setPreview: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  onDrop: (acceptedFiles: File[]) => void;
}

export type SetValueProps = {
  setValue: UseFormSetValue<any>
}

export type Variant = "success" | "error" | "info" | "warning";