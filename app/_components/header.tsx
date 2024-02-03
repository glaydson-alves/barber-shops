"use client";

import { MenuIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

const Header = () => {
    // const { data } useSession();

    const handleLoginClick = async ()=>{
        await signIn();
    }
    return ( 
        <Card>
            <CardContent className="p-5 justify-between items-center flex flex-row">
                <Image src="/logo.png" alt="imagem logo barber shops" height={22} width={120}/>

                <Button variant="outline" size="icon">
                    <MenuIcon size={18} />
                </Button>
                
                <Button onClick={handleLoginClick}>Login</Button>
            </CardContent>
        </Card>
     );
}
 
export default Header;