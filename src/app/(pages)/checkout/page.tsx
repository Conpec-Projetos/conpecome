'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import pix from '@/assets/pix-icon.png';
import { Toaster, toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import conpec from '@assets/conpeclogo.png';


interface Item {
    name: string, 
    price: number, 
    quantity: number
}

export default function Checkout() {
    const [itemsBought, setItemsBought] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [total, setTotal] = useState<number>(0); 

    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fetchData = async () => {
                try {
                    const itemsFromStorage = JSON.parse(localStorage.getItem('items') || '[]');
                    setItemsBought(itemsFromStorage);
                    const sum = itemsFromStorage.reduce((accumulator: number, currentValue: Item) => accumulator + (currentValue.price * currentValue.quantity), 0)
                    setTotal(sum);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setIsLoading(false);
                }
            };
            fetchData();
        }

    }, [itemsBought]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copiado para a área de transferência!');
        }).catch(() => {
            toast.error('Erro ao copiar para a área de transferência!');
        });
    };

    const createReceit = () => {
        
        return itemsBought.map((item, index) => (

            <div className='flex flex-row justify-between w-screen font-poppins font-bold text-orange-serene text-[25px]' key={index}>
                <div className='mx-10'>{item.name}</div>
                <div className='mx-10'>R${(item.price*item.quantity).toFixed(2)}</div>
            </div>
        ));
    };

    return (
        <div>
            {isLoading ? (
                <p></p>
            ) : (
                
                <div className='flex flex-col items-center justify-evenly h-screen bg-orange-seashell'>


                    <div className='flex flex-row justify-between w-screen'>
                        <div className='flex flex-col justify-center ml-3'>
                            <button onClick={()=>router.push('/order')}>
                                <ArrowLeft className='text-red-imperial font-bold' size={34}></ArrowLeft>
                            </button>
                        </div>
                        <div className='flex flex-col justify-center mr-3'>
                            <Image src={conpec.src} alt='logo' height={64} width={64}></Image>
                        </div>
                    </div>

                    
                    <div className='flex flex-col justify-evenly items-center grow w-screen'>
                        <h1 className='font-bold text-orange-coquelicot text-5xl font-pixelify'>SEU PEDIDO</h1>
                        <div><Image src = {pix.src} alt = 'pix-logo' height={160} width={160}></Image></div>
                        <div className = 'flex flex-row justify-evenly w-screen'>

                            <div className='flex flex-row justify-center rounded-full border-1 border-orange-apricot py-4 w-2/3 bg-white'><h1 className='text-gray-500 font-poppins font-bold'>{process.env.NEXT_PUBLIC_PIX_CODE}</h1></div>

                            <button onClick={()=>copyToClipboard(process.env.NEXT_PUBLIC_PIX_CODE||"")} className='bg-orange-linear rounded-full py-4 px-7'>

                                <h1 className='font-poppins font-bold text-white text-xl'>Copiar</h1>
                            
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col justify-evenly items-center h-3/5 w-screen rounded-t-[50px] bg-orange-antique'>
                
                        <div className='h-1/2'>
                            {createReceit()}
                        </div>

                        <div className='flex flex-row justify-between w-screen font-poppins font-bold text-orange-serene text-[25px]'>
                            <h1 className='mx-10'>Total</h1>
                            <h1 className='mx-10'>R${total.toFixed(2)}</h1>
                        </div>

                        <button onClick={()=>router.push('/log')} className='rounded-full bg-orange-linear text-white font-popping font-extrabold text-lg w-1/3 h-14'><h1>Já paguei</h1></button>
                    </div>

                    
                </div>
            )}
            <Toaster position="bottom-right" richColors closeButton />
        </div>
    );
    //"seu pedido", pixi, código pixi, botão copiar 
}
