
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ListTodo } from "lucide-react"
import { cn } from "@/lib/utils"

interface TopicCardProps {
  title: string
  image?: string
  badge?: {
    icon: string
    text: string
  }
  isAd?: boolean
  sponsor?: string
  isFocused?: boolean
}

export function TopicCard({ 
  title, 
  image, 
  badge, 
  isAd, 
  sponsor, 
  isFocused 
}: TopicCardProps) {
  return (
    <Card className="group relative h-full w-full overflow-hidden border-0">
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform group-hover:scale-105" 
          loading="eager"
        />
      </div>
      
      {badge && !isAd && (
        <div className="absolute left-4 top-4 z-10">
          <Badge variant="secondary" className="flex items-center gap-1.5 bg-white/90 px-2 py-1 text-primary shadow-sm backdrop-blur-sm">
            <ListTodo className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{badge.text}</span>
          </Badge>
        </div>
      )}
      
      {sponsor && isAd && (
        <div className="absolute right-4 top-4 z-10">
          <Badge variant="secondary" className="bg-white/90 px-2 py-1 text-primary shadow-sm backdrop-blur-sm">
            <span className="text-xs font-medium">Sponsored</span>
          </Badge>
        </div>
      )}
      
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b from-black/10 to-black/70 transition-opacity duration-200",
        isFocused ? "opacity-90" : "opacity-100"
      )} />
      
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="text-2xl font-black leading-tight text-white">
          {title}
        </h3>
        {sponsor && isAd && (
          <p className="mt-1 text-sm text-white/80">
            By {sponsor}
          </p>
        )}
      </div>
    </Card>
  )
}
