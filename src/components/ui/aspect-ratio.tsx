
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"

const AspectRatio = ({ 
  ratio, 
  className, 
  maxWidth,
  ...props 
}: React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> & { 
  maxWidth?: string | number
}) => {
  return (
    <div 
      className={cn("mx-auto w-full", className)}
      style={{ maxWidth: maxWidth ? `${maxWidth}px` : "none" }}
    >
      <AspectRatioPrimitive.Root ratio={parseFloat(String(ratio))} {...props} />
    </div>
  )
}

export { AspectRatio }
