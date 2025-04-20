"use client";
import { Toaster, toast } from "sonner";
import { Item } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Header } from "@components/ui/header/header";
import add_icon from "@assets/add-icon.png";
import { NewProduct } from "@/components/ui/new-product/new-product";
import { v4 } from "uuid";

import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "@firebase/firebase-config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export default function Editor() {
  const [items, setItems] = useState<Item[]>([]);
  const [loadedProductIds, setLoadedProductIds] = useState<Set<string>>(
    new Set()
  );

  const fetchProducts = async () => {
    try {
      const productsSnapshot = await getDocs(collection(db, "products"));
      const fetchedItems = productsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          stock: data.stock || 0,
          name: data.name || "",
          price: Number(data.price) || 0,
          productionCost: data.productionCost || 0,
          image: data.image || null,
          type: data.type || "product",
        } as Item;
      });
      setItems(fetchedItems);
      const productIds = new Set(fetchedItems.map((item) => item.id).filter((id): id is string => id !== undefined));
      setLoadedProductIds(productIds);
    } catch (error) {
      toast.error("Falha ao carregar produtos");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addItem = () => {
    const newItem: Item = {
      id: v4(),
      type: "",
      name: "",
      price: 0,
      productionCost: 0,
      stock: 0,
      image: "",
    };

    setItems((prev) => [...prev, newItem]);
  };

  const updateItem = (updatedItem: Item) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeProductFromDb = async (id: string) => {
    try {
      const productDocRef = doc(db, "products", id);

      const productImageRef = ref(storage, `images/${id}`);
      await deleteObject(productImageRef);

      await deleteDoc(productDocRef);
      fetchProducts();
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Erro ao remover um dos produtos");
    }
  };

  const handleProducts = async () => {
    if (items.length > 0) {
      const uploadPromises = items.map(async (item) => {
        try {
          const productDocRef = doc(collection(db, "products"), item.id);

          const { image, ...dataWithoutImage } = item;
          const productData = {
            ...dataWithoutImage,
            id: productDocRef.id,
          };

          const existingDoc = await getDoc(productDocRef);

          if (existingDoc.exists()) {
            await updateDoc(productDocRef, productData);
          } else {
            await setDoc(productDocRef, productData);
          }

          if (image && typeof image !== "string") {
            const imageRef = ref(storage, `images/${productDocRef.id}`);
            await uploadBytes(imageRef, image as Blob);
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(productDocRef, { image: downloadURL });
          }
        } catch (error) {
          console.error("Error uploading product:", error);
          toast.error("Erro ao salvar produtos.");
        }
      });

      const currentItemIds = new Set(items.map(item => item.id));
      const itemsToRemove = Array.from(loadedProductIds).filter(id => !currentItemIds.has(id));


      
      await Promise.all(uploadPromises);
      await Promise.all(itemsToRemove.map(removeProductFromDb));

      toast.success("Produtos salvos com sucesso!");
    } else {
      toast.error("Adicione pelo menos um produto!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-evenly h-screen bg-orange-seashell">
      <Header path="login"></Header>

      <ul className="flex flex-col items-center justify-start w-screen h-2/3 overflow-y-scroll [&::-webkit-scrollbar]:w-0 overflow-x-hidden">
        {items.map((item) => (
          <li key={item.id}>
            <NewProduct
              currentItem={item}
              updateItem={updateItem}
              removeItem={removeItem}
              key={item.id}
            />
          </li>
        ))}
      </ul>

      <div className="flex flex-row justify-evenly items center w-screen my-20">
        <button
          onClick={handleProducts}
          className="w-2/3 h-14 bg-orange-linear rounded-full text-white font-poppins font-bold text-lg"
        >
          Confirmar Alterações
        </button>
        <button onClick={addItem} className="">
          <Image
            src={add_icon.src}
            alt="add_icon"
            width={50}
            height={50}
          ></Image>
        </button>
      </div>
      <Toaster richColors closeButton />
    </div>
  );
}
