import { MenuIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";

const Header = () => {
    return ( 
        <Card>
            <CardContent className="p-5 justify-between items-center flex flex-row">
                <Image src="/logo.png" alt="imagem logo barber shops" height={22} width={120}/>

                <Button variant="outline" size="icon">
                    <MenuIcon size={18} />
                </Button>
            </CardContent>
        </Card>
     );
}
 
export default Header;