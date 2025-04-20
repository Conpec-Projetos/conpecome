import pacoca from "@assets/pictures/sweet/pacoca.png"
import toddynho from "@assets/pictures/sweet/toddynho.png"
import valsa from "@assets/pictures/sweet/valsa.png"
import cupnoodles from "@assets/pictures/savory/cup-noodles.png"
import ourobranco from "@assets/pictures/sweet/ouro-branco.png"
import kitkat from "@assets/pictures/sweet/kit-kat.png"
import freegells from "@assets/pictures/sweet/freegells.png"
import { Item } from "@/lib/utils"

interface IPicture {
    src: string;
    name: string;
    price: string;
    type: string;
    quantity: number;
}

var pictures: { [index: number] : IPicture; } = {};

pictures[0] = { src: pacoca.src , name: "", price: "", type: "sweet", quantity: 0};
pictures[1] = { src: toddynho.src, name: "", price: "", type: "drink", quantity: 0};
pictures[2] = { src: valsa.src, name: "", price: "", type: "sweet", quantity: 0};
pictures[3] = { src: cupnoodles.src, name: "", price: "", type: "savory", quantity: 0};
pictures[4] = { src: ourobranco.src, name: "", price: "", type: "sweet", quantity: 0};
pictures[5] = { src: kitkat.src, name: "", price: "", type: "sweet", quantity: 0};
pictures[6] = { src: freegells.src, name: "", price: "", type: "sweet", quantity: 0};

export default pictures;