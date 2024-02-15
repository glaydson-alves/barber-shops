"use client"

import { CalendarDays, CircleUserIcon, LogOutIcon } from 'lucide-react';
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

const NavMenu = () => {
    const { data } = useSession();
    const handleLoginClick = async () => {
    await signIn("google");
    };
    const handleLogoutClick = () => signOut();
    return (
        <div className='flex gap-6 items-center'>

            <Link href="/bookings" className="flex gap-2 items-center hover:text-gray-300">
              <CalendarDays size={18} />
              Agendamentos
            </Link>

            <div className='flex gap-2'>
                {data?.user ? (
                    <div className="flex gap-3 items-center">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="secondary" size="icon" className="w-full px-2 rounded-full">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="flex items-center">
                                            <AvatarImage className="w-8 h-8 rounded-full" src={data.user?.image ?? ""} />
                                        </Avatar>

                                        <h2 className="font-bold hover:text-gray-300">{data.user.name}</h2>
                                    </div>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[80%]">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-center">Sair?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-center">
                                        Deseja sair de seu perfil?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-row gap-3">
                                    <AlertDialogCancel className="w-full mt-0">Cancelar</AlertDialogCancel>
                                    <AlertDialogAction  className="w-full" onClick={handleLogoutClick}>
                                    Sair<LogOutIcon size={18} className="ms-2"/></AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                ) : (
                    <div>
                        <Button
                            variant="default" size="icon"
                            className="w-full justify-start gap-2 px-4 hover:bg-[#94764f] rounded-full"
                            onClick={handleLoginClick}
                        >
                            <CircleUserIcon size={24}  />
                            Perfil
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default NavMenu;