
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel"
import { TopicCard } from './TopicCard'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'

interface AdItem {
  id: number
  title: string
  image: string
  sponsor: string
}

interface BeltItem {
  id: number
  title: string
  image?: string
  fallbackSrc?: string
  badge?: {
    icon: string
    text: string
  }
  isAdStack?: boolean
  ads?: AdItem[]
  isAd?: boolean
  sponsor?: string
}

interface BeltSection {
  id: number
  title: string
  items: BeltItem[]
}

const processBeltItems = (section: BeltSection): BeltItem[] => {
  const processedItems: BeltItem[] = []
  
  section.items.forEach(item => {
    if (item.isAdStack && item.ads) {
      item.ads.forEach(ad => {
        processedItems.push({
          id: ad.id,
          title: ad.title,
          image: ad.image,
          fallbackSrc: ad.image,
          isAd: true,
          sponsor: ad.sponsor
        } as BeltItem)
      })
    } else {
      processedItems.push(item)
    }
  })
  
  return processedItems
}

const weeklyOffers: BeltSection = {
  id: 1,
  title: "Weekly Topics",
  items: [
    {
      id: 101,
      title: "The Perfect Sunday Breakfast",
      image: "/lovable-uploads/cbfe3137-a8fe-47b7-b7bb-4e2fdcd931fc.png",
      fallbackSrc: "/lovable-uploads/cbfe3137-a8fe-47b7-b7bb-4e2fdcd931fc.png",
      badge: {
        icon: "ListTodo",
        text: "Shopping list"
      }
    }, 
    {
      id: 102,
      title: "Stacked Ads",
      isAdStack: true,
      ads: [
        {
          id: 1021,
          title: "Viladomy Pitkovic",
          image: "/lovable-uploads/90f118dd-41bc-482c-98b0-3763799f43e1.png",
          sponsor: "Central Group"
        },
        {
          id: 1022,
          title: "Partners Banka",
          image: "/lovable-uploads/ae63401e-b7d6-4f1f-817d-2c379b21bd15.png",
          sponsor: "Partners Banka"
        }
      ]
    }, 
    {
      id: 103,
      title: "Bakery Fresh",
      image: "/lovable-uploads/449d2a80-7b69-4959-8a66-f74b63814e56.png",
      fallbackSrc: "/lovable-uploads/449d2a80-7b69-4959-8a66-f74b63814e56.png"
    }, 
    {
      id: 104,
      title: "Stacked Ads",
      isAdStack: true,
      ads: [
        {
          id: 1041,
          title: "Misa Ice Cream",
          image: "/lovable-uploads/d136c32a-fa95-4a02-ac7a-ca96bdad4f58.png",
          sponsor: "Misa"
        },
        {
          id: 1042,
          title: "U-mai Caviar",
          image: "/lovable-uploads/80409ac3-087c-453d-a031-d3dc5358c401.png",
          sponsor: "U-mai"
        }
      ]
    }
  ]
}

const TopicsBelt = () => {
  const isMobile = useIsMobile()
  const [currentSlide, setCurrentSlide] = useState(0)
  const processedItems = processBeltItems(weeklyOffers)
  const [mobileApi, setMobileApi] = useState<CarouselApi>()
  
  const firstSet = processedItems.slice(0, 4)
  const secondSet = processedItems.slice(4)
  
  while (secondSet.length < 4 && processedItems.length > 0) {
    const indexToAdd = secondSet.length % processedItems.length
    secondSet.push(processedItems[indexToAdd])
  }

  // Update current slide when the mobile API changes slides
  useEffect(() => {
    if (!mobileApi) return

    const onSelect = () => {
      setCurrentSlide(mobileApi.selectedScrollSnap() || 0)
    }

    mobileApi.on("select", onSelect)
    
    // Initial call to set the current slide
    onSelect()

    return () => {
      mobileApi.off("select", onSelect)
    }
  }, [mobileApi])

  return (
    <div className="py-8">
      <div className="mb-8">
        <div className="mb-4 px-4">
          <h2 className="text-xl font-semibold">{weeklyOffers.title}</h2>
        </div>
        
        {isMobile ? (
          <Carousel 
            className="w-full"
            opts={{
              loop: true,
            }}
            setApi={setMobileApi}
          >
            <CarouselContent>
              {processedItems.map((item) => (
                <CarouselItem key={item.id}>
                  <AspectRatio ratio={3/2.5} className="w-full">
                    <TopicCard 
                      title={item.title}
                      image={item.image}
                      badge={item.badge}
                      isAd={item.isAd}
                      sponsor={item.sponsor}
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        ) : (
          <div className="relative px-4">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem className="basis-full">
                  <div className="grid grid-cols-4 gap-4">
                    {firstSet.map((item) => (
                      <AspectRatio key={item.id} ratio={3/2.5} className="overflow-hidden">
                        <TopicCard 
                          title={item.title}
                          image={item.image}
                          badge={item.badge}
                          isAd={item.isAd}
                          sponsor={item.sponsor}
                        />
                      </AspectRatio>
                    ))}
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-full">
                  <div className="grid grid-cols-4 gap-4">
                    {secondSet.map((item) => (
                      <AspectRatio key={item.id} ratio={3/2.5} className="overflow-hidden">
                        <TopicCard 
                          title={item.title}
                          image={item.image}
                          badge={item.badge}
                          isAd={item.isAd}
                          sponsor={item.sponsor}
                        />
                      </AspectRatio>
                    ))}
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="-left-12" />
              <CarouselNext className="-right-12" />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopicsBelt
