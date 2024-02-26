"use client";

import Header from "@/app/_components/header";
import SideMenu from "@/app/_components/side-menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface BarbershopInfoProps {
    barbershop: Barbershop
}

const BarbershopInfo = ({barbershop}:BarbershopInfoProps) => {
    const router = useRouter()
    const handleBackClick = () => {
        router.replace("/")
    }

    return (
        <div>
            <div className="hidden lg:block">
                <Header/>
            </div>
            <div className="hidden lg:flex lg:px-32 lg:py-6">
                <div className="h-[487px] w-[758px] relative">
                    <Image 
                        src={barbershop.imageUrl} 
                        fill 
                        alt={barbershop.name} 
                        style={{objectFit: "cover",}}
                        className="rounded-lg" 
                    />
                </div>
                <div>
                                                        
                </div>
            </div>
            <div className="h-[250px] w-full lg:h-[487px] lg:w-[758px] lg:px-32 lg:py-6 relative lg:hidden">
                <Button onClick={handleBackClick} size="icon" variant="outline" className="z-50 absolute top-4 left-4 lg:hidden">
                    <ChevronLeftIcon />
                </Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="z-50 absolute top-4 right-4 lg:hidden">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="p-0">
                        <SideMenu/>
                    </SheetContent>

                </Sheet> 

                <Image 
                    src={barbershop.imageUrl} 
                    fill 
                    alt={barbershop.name} 
                    style={{objectFit: "cover",}}
                    className="opacity-75 lg:rounded-lg" 
                />
            </div>
            <div className="px-5 py-3 pb-6 border-b border-solid border-secondary lg:flex lg:justify-between lg:w-[758px] lg:ms-32 lg:px-0 lg:border-hidden">
                <div>
                    <h1 className=" text-xl font-bold">{barbershop.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        <MapPinIcon className="text-primary" size={18}/>
                        <p className="text-sm">{barbershop.address}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-1 mt-2 lg:bg-secondary lg:px-5 lg:py-3 lg:rounded-lg">
                    <StarIcon className="text-primary" size={18}/>
                    <p className="text-sm">5,0 (899 avaliações)</p>
                </div>
            </div>
        </div>
    );
}

export default BarbershopInfo;