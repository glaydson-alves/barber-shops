
import { db } from "@/app/_lib/prisma";
import { Barbershop } from "@prisma/client";
import BarbershopInfo from "./_components/barbershop-info";


interface BarbershopDetailsPageProps {
    params: Barbershop
}

const BarbershopDetailsPage = async ({params}:BarbershopDetailsPageProps) =>{
    if (!params.id) {
        //TODO: redirecionar para home page
        return null;
    }
    
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
    })  
    
    if (!barbershop) {
        return null;
    }

    return ( 
        <BarbershopInfo barbershop={barbershop}/>
    )
}

export default BarbershopDetailsPage