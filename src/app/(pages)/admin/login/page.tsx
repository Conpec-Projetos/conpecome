"use client"
import { Toaster, toast } from 'sonner';
import { Button } from "@mui/material";
import Image from "next/image";
import { ArrowLeft, ComponentIcon} from "lucide-react";
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import conpec from '@/assets/conpeclogo.png'
import { useRouter } from "next/navigation";
import { collection, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@firebase/firebase-config';

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    email: z.string().email({ message: "Email inválido!" }).min(1),
    password: z.string().min(1, { message: "Senha inválida"}),  
    });
  
type FormFields = z.infer<typeof schema>;

export default function LogAdmin() {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const router = useRouter();

    const goToHome = () => {
        router.push('/');
    };

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
      } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });



    useEffect(() => {
        if (errors.email) {
            toast.error(errors.email.message);
        }
    }, [errors.email]);

      const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = {...userCredential.user, timeout: Date.now() + (1000 * 60 * 30)};
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                toast.success('Marcha!!!');
                setTimeout(() => {
                    router.push('/admin/products');
                }, 2000);
            }
        } catch (error) {
            toast.error('Eita, deu ruim!');
        }
      };

    return (
        <div className="flex flex-col bg-orange-seashell h-screen w-screen">
            <Toaster richColors closeButton/>
            <div className="flex flex-col items-center w-full h-1/3 pt-3">
                <div className="flex flex-row w-2/3 h-1/3 items-center">
                    <div className="w-full pl-4">
                        <ArrowLeft onClick={goToHome} className="cursor-pointer hover:text-dark-red hover:scale-105 text-orange-strong font-bold" size={34} />
                    </div>
                    <div className="flex flex-row w-1/2 justify-end pr-4">
                        <Image src={conpec.src} alt="logo" width={100} height={100} className="size-16" />
                    </div>
                </div>
                <h1 className="font-pixelify text-orange-strong text-5xl font-bold justify-center pt-10 items-center">
                    Login
                </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full h-1/2">
                <div className="w-2/3 h-1/4 pb-6">
                    <div className="flex flex-row justify-start w-fit h-2/5 text-orange-linear text font-poppins font-bold text-base ml-5 pt-2">Email</div>
                    <input
                        type="text"
                        placeholder="Insira seu email"
                        {...register('email')}
                        className="flex w-full h-3/5 placeholder-orange-strong placeholder-opacity-60 text-sm bg-background border-orange-strong border-2 rounded-full stroke-orange-strong border-opacity-40 pl-3 font-poppins font-bold text-orange-strong focus:outline-none focus:ring-2 focus:ring-orange-strong"
                    />
                </div>
                <div className="w-2/3 h-1/4 pb-6">
                    <div className="flex justify-start w-fit h-2/5 text-orange-linear font-poppins font-bold text-base ml-5 pt-2">Senha</div>
                    <div className="relative flex items-center h-3/5">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Insira sua senha"
                            {...register('password')}
                            className="flex w-full h-full placeholder-orange-strong placeholder-opacity-60 text-sm bg-background border-orange-strong border-2 rounded-full pl-3 font-poppins font-bold text-orange-strong focus:outline-none focus:ring-2 focus:ring-orange-strong"
                        />
                        <div className="absolute right-5 cursor-pointer" onClick={togglePasswordVisibility}>
                            {showPassword ? <EyeOff className="text-orange-strong" /> : <Eye className="text-orange-strong" />}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center w-full h-1/3">
                    <Button disabled={isSubmitting} type="submit" className="w-1/5 h-2/6 bg-orange-strong rounded-full text-background font-poppins font-bold text-sm">
                        {isSubmitting ? "Carregando..." : "Entrar"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
