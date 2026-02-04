import { LoaderCircle } from "lucide-react";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin"><LoaderCircle className={className} /></div>
    </div>
  )
}
