import { format } from "date-fns";
import Header from "../_components/header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious, } from "../_components/ui/carousel";


export default async function Home() {
  const session = await getServerSession(authOptions);
  // chamar prisma e pegar barbearias
  const [barbershops, recommendedBarbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    db.barbershop.findMany({
      orderBy: {
        id: "asc",
      },
    }),
    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div>
      <Header />
      
      <div className="relative lg:flex lg:w-full lg:justify-between lg:px-32 lg:py-16">
        <Image
          className="hidden lg:block absolute inset-0"
          src="/background1.png"
          fill
          style={{ objectFit: 'cover', opacity: 0.2 }}
          alt="background"
        />
        <div className="lg:w-1/2 z-10">
          <div className="px-5 pt-5 lg:w-1/2  lg:px-0">
            <h2 className="text-xl font-bold">
              {session?.user ? `Olá, ${session.user.name?.split(" ")[0]}!` : "Olá! Vamos agendar um corte hoje?"}
            </h2>
            <p className="capitalize text-sm">
              {format(new Date(), "EEEE',' dd 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>

          <div className="px-5 mt-6 lg:px-0">
            <Search />
          </div>
        </div>
      

        <div className="mt-6 z-10">
          {confirmedBookings.length > 0 && (
              <>
                <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold">Agendamentos</h2>
                <Carousel className="px-5 lg:px-0">
                  <CarouselContent className="px-5 flex gap-3 [&::-webkit-scrollbar]:hidden">
                    {confirmedBookings.map((booking) => (
                      <BookingItem key={booking.id} booking={booking} />
                    ))}
                  </CarouselContent>
                </Carousel>
              </>
            )}

        </div>
      </div>

      <div className="mt-6  lg:px-32">
        <h2 className="px-5 lg:px-1 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>
        
        <Carousel className="px-5 lg:px-0">
          <CarouselContent className="flex px-5 gap-4 [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop:any) => (
              <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              </div>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex"/>
          <CarouselNext className="hidden lg:flex"/>
        </Carousel>
        
      </div>

      <div className="mt-6 mb-[4.5rem]  lg:px-32">
        <h2 className="px-5 lg:px-1 text-xs mb-3 uppercase text-gray-400 font-bold">Populares</h2>

        <Carousel className="px-5 lg:px-0">
          <CarouselContent className="flex px-5 gap-4 [&::-webkit-scrollbar]:hidden">
            {recommendedBarbershops.map((barbershop:any) => (
              <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              </div>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex"/>
          <CarouselNext className="hidden lg:flex"/>
        </Carousel>
      </div>

    </div>

  );
}