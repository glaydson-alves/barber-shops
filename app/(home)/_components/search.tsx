"use client" // é um client components que siginifica que haverá interação com usuário quando clicar ou escrever/ pode usar state

import { Input } from "@/app/_components/ui/input"
import { Button } from "@/app/_components/ui/button"
import { SearchIcon } from "lucide-react"

const Search = () => {
    return(
        <div className="flex items-center gap-2">
            <Input placeholder="Busque por uma barbearia..." />
            <Button variant="default" className="hover:bg-[#94764f]">
                <SearchIcon size={18} />
            </Button>
        </div>
    )
}

export default Search 