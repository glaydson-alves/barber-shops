
import { db } from "@/app/_lib/prisma";
import { Barbershop } from "@prisma/client";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";


interface BarbershopDetailsPageProps {
    params: Barbershop
}

const BarbershopDetailsPage = async ({params}:BarbershopDetailsPageProps) =>{
    const session = await getServerSession(authOptions)
    if (!params.id) {
        //TODO: redirecionar para home page
        return null;
    }
    
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true,
        }
    })  
    
    if (!barbershop) {
        return null;
    }

    return ( 
        <div>
            <BarbershopInfo barbershop={barbershop}/>

            <div className="px-5 grid grid-cols-1 lg:grid-cols-2 gap-4 py-6 lg:px-32 lg:w-[1024px]">
                {barbershop.services.map((service: any) => (
                    <div key={service.id} className="w-full lg:w-[369px]">
                        <ServiceItem barbershop={barbershop} service={service} isAuthenticated={!!session?.user}/>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default BarbershopDetailsPage