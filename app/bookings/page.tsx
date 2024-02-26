import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { authOptions } from "../_lib/auth";

const BookingsPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
       return redirect("/")
    }
    
    //Query no bannco de dados em paralelo
    const [confirmedBookings, finishedBookings] = await Promise.all([
        db.booking.findMany({
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
        }),
        db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              lt: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        }),
    ]);


    return (
      <>
        <Header />

        <div className="px-5 py-6 lg:px-32">
            <h1 className="text-xl font-bold mb-6">Agendamentos</h1>

            {confirmedBookings.length > 0 && (
              <>
                <h2 className="text-gray-400 uppercase font-bold text-sm mb-3">Confirmados</h2>

                <div className="flex flex-col gap-3 lg:w-1/3">
                  {confirmedBookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
              </>
            )}

            {finishedBookings.length > 0 && (
              <>
                <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">Finalizados</h2>

                <div className="flex flex-col gap-3 lg:w-1/3">
                  {finishedBookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
              </>
            )}
        </div>
        <div>

        </div>
      </>
    );
}
 
export default BookingsPage;