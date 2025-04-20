import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import conpec from '@assets/conpeclogo.png';

interface HeaderProps {
    path: string;
}

export const Header = ({path}: HeaderProps) => {

    const router = useRouter();

    const goTo = () =>{
        router.push(path);
    };

    return (
        <div className='flex flex-row justify-between w-screen'>
            <div className='flex flex-col justify-center ml-3'>
                <button onClick={ goTo }>
                    <ArrowLeft className='text-red-imperial font-bold' size={34}></ArrowLeft>
                </button>
            </div>
            <div className='flex flex-col justify-center mr-3'>
                <Image src={conpec.src} alt='logo' width={64} height={64}></Image>
            </div>
        </div>
    );
};
