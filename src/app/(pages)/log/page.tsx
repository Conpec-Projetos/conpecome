"use client"
import { Toaster, toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import conpec from '@assets/conpeclogo.png';
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    name: z.string().max(100, { message: "Nome gigante!" }).min(1, { message: "Insira seu nome!" }),
    email: z.string().email({ message: "Email inválido!" }).min(1, { message: "Insira seu email!" }),
});

type FormFields = z.infer<typeof schema>;

export default function Log() {

    const router = useRouter();

    const saveInput = (email: string) => {
        toast.success('Marcha, bom ao mosso!')
        setTimeout(() => {
            router.push('/')
        }, 3000);
    }

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
        try {
            saveInput(data.email)
        } catch (error) {
            toast.error('Eita, deu ruim!');
        }
    };


    return (
        <div className='flex flex-col space-y-3 w items-center caret-transparent h-screen bg-orange-seashell'>
            <div className='flex flex-row justify-between w-screen'>
                <div className='flex flex-col justify-center ml-3'>
                    <button onClick={() => router.push('/checkout')}>
                        <ArrowLeft className='text-red-imperial font-bold' size={34}></ArrowLeft>
                    </button>
                </div>
                <div className='flex flex-col justify-center mr-3'>
                    <Image width={10} height={10} src={conpec.src} alt='logo' className='size-16'></Image>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col grow w-4/5 justify-between'>
                <div className='flex flex-col justify-evenly h-3/4'>
                    <div className='flex flex-row justify-center'>
                        <h1 className='font-pixelify text-5xl caret-transparent select-none font-semibold text-orange-coquelicot'>Informações</h1>
                    </div>

                    <div className='flex flex-row justify-center w-full'>
                        <div className='flex flex-col justify-center w-full md:w-2/3 h-full font-poppins'>
                            <h1 className='caret-transparent select-none font-extrabold text-orange-linear text-large'>Nome</h1>
                            <input {...register("name")} type="text" placeholder='Inserir nome'
                                className='rounded-full px-7 font-extrabold text-sm py-4 text-orange-600 w-full placeholder-orange-sandy border-1 border-orange-peach' />
                        </div>
                    </div>

                    <div className='flex flex-row justify-center w-full'>
                        <div className='flex flex-col justify-center w-full md:w-2/3 h-full font-poppins'>
                            <h1 className=' caret-transparent select-none font-extrabold text-orange-linear text-base'>Email</h1>
                            <input {...register("email")} type="email" placeholder='Inserir email'
                                className='rounded-full px-7 font-extrabold text-sm py-4 text-orange-600 w-full placeholder-orange-sandy border-1 border-orange-peach' />
                            {errors.email && (
                                <p className="text-slate-200">{errors.email.message}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-evenly items-center h-3/4'>
                    <div></div>
                    <Button disabled={isSubmitting} transition='shadow' className='font-poppins font-extrabold text-lg text-tertiary px-14 py-6 select-none bg-orange-linear rounded-full'>
                        {isSubmitting ? "Carregando..." : "Enviar"}
                    </Button>
                </div>
            </form>
            <Toaster position="bottom-left" richColors closeButton />
        </div>
    );
}
