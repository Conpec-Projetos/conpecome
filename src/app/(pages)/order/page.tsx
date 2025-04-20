"use client"
import EmblaCarousel from '@/components/ui/carousel/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import pictures  from '@/assets/pictures/pictures';
import "./embla.css";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';
import { useEffect } from 'react';

export default function Order() {
    const OPTIONS: EmblaOptionsType = { dragFree: true, loop: false}
    const SLIDE_COUNT = Object.keys(pictures).length;
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
    const [value, setValue] = useState("1");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const [counters, setCounters] = useState<number[]>(Array(SLIDE_COUNT).fill(0));

    useEffect(() => {
        toast.loading('Carregando estoque...');
        setTimeout(() => {
            setIsLoading(false);
            toast.dismiss();
            toast.success('Estoque carregado!');
        }, 2000);
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };

    const incrementCounter = (index: number, quantity: number) => {
        setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.min(newCounters[index] + 1, quantity);

            if (newCounters[index] + 1 > quantity) {
                toast.info('Você atingiu o limite desse produto no estoque!');
            }

            return newCounters;
        });
    };

    const decrementCounter = (index: number) => {
        setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.max(newCounters[index] - 1, 0);
            return newCounters;
        });
    };

    const handleCheckout = () => {
        const itemsBought = SLIDES.filter((index) => counters[index] > 0).map((index) => ({
            id: index + 1,
            name: pictures[index].name,
            price: pictures[index].price,
            quantity: counters[index],
        }));

        if (itemsBought.length === 0) {
            toast.error('Selecione ao menos um item para comprar!');
            return;
        }

        localStorage.setItem('items', JSON.stringify(itemsBought));

        router.push(`/checkout`);
    };

    return (
        <div>
        {isLoading ? (
            <p></p>
        ) : (
        <div className='flex flex-col justify-evenly items-center caret-transparent h-screen'>
            <TabContext value={value}>
                <Box sx={{ minWidth: 350, display: 'flex', justifyContent: 'space-around' }}>
                    <TabList onChange={handleChange} aria-label="Food Tab" textColor='inherit' TabIndicatorProps={{ style: {
                        backgroundColor: '#FF5C00'
                    }}} >
                        <Tab label="Doces" value="1" sx={{color: '#ff6600', fontWeight: 900}}/>
                        <Tab label="Salgados" value="2" sx={{color: '#ff6600', fontWeight: 900}}/>
                        <Tab label="Bebidas" value="3" sx={{color: '#ff6600', fontWeight: 900}}/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <EmblaCarousel 
                      slides={SLIDES} 
                      type='sweet' 
                      options={OPTIONS} 
                      counters={counters}
                      incrementCounter={incrementCounter}
                      decrementCounter={decrementCounter}
                    />
                </TabPanel>
                <TabPanel value="2">
                    <EmblaCarousel 
                      slides={SLIDES} 
                      type='savory' 
                      options={OPTIONS} 
                      counters={counters}
                      incrementCounter={incrementCounter}
                      decrementCounter={decrementCounter}
                    />
                </TabPanel>
                <TabPanel value="3">
                    <EmblaCarousel 
                      slides={SLIDES} 
                      type='drink' 
                      options={OPTIONS} 
                      counters={counters}
                      incrementCounter={incrementCounter}
                      decrementCounter={decrementCounter}
                    />
                </TabPanel>
            </TabContext>
            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'start', width: '90%', height: '10%'}}>
                <div className="flex">
                    <p className='text-bold text-3xl text-orange-600'>Já  pode?</p>
                    <Button className='hover:drop-shadow-orange' transition='active' onClick={handleCheckout}>
                        <Check className="bg-orange-600 text-tertiary rounded-md" size={34} />
                    </Button>
                </div>
            </Box>
        </div>
        )}
        <Toaster position="bottom-left" richColors closeButton />
        </div>
    )
}
