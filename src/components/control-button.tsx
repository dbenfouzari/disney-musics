import { ButtonHTMLAttributes } from "react";
import classes from "./control-button.module.css";
import { cn } from "@/utils/cn";

export type ControlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ControlButton({ className, ...props }: ControlButtonProps) {
  return <button className={cn(classes.button, className)} {...props} />;
}
