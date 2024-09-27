import { cn } from "@/lib/utils";

export default function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(buttonClassName, className)} {...props} />;
}

// - Export the `buttonClassName` constant.
export const buttonClassName =
  "flex items-center justify-center gap-2 rounded-full bg-crybaby hover:bg-crybaby/80 active:bg-crybaby/60 px-3 py-2 font-semibold text-white transition-colors  disabled:bg-gray-200";