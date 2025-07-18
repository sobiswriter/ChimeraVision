import { cn } from "@/lib/utils";

type AIAvatarProps = {
  className?: string;
};

export function AIAvatar({ className }: AIAvatarProps) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-slate-100",
        className
      )}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path d="M12 7V3" />
        <path d="M12 21v-4" />
        <path d="M17 12h4" />
        <path d="M3 12h4" />
        <path d="m16.24 7.76-.71-.71" />
        <path d="M8.46 15.54l-.7-.7" />
        <path d="m16.95 16.95-.7.7" />
        <path d="m7.76 7.76.71-.71" />
      </svg>
    </div>
  );
}
