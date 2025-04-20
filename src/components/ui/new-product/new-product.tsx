import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Item } from "@/lib/utils";
import uploadIcon from "@assets/image_upload_icon.png";
import editorIcon from "@assets/editor_icon.png";
import removeIcon from "@assets/remove_icon.png";
import addIcon from "@assets/add-icon.png";
import { Trash } from "lucide-react";

interface NewProductProps {
  currentItem: Item;
  updateItem: (items: Item) => void;
  removeItem: (id: string) => void;
}

export const NewProduct: React.FC<NewProductProps> = ({
  currentItem,
  updateItem,
  removeItem,
}) => {
  const [localItem, setLocalItem] = useState<Item>(currentItem);

  const imagePreview = useMemo(() => {
    if (typeof localItem.image === "string" && localItem.image) return localItem.image;
    if (localItem.image instanceof File) {
      return URL.createObjectURL(localItem.image);
    }
    return uploadIcon.src;
  }, [localItem.image]);

  const handleInputChange = (
    field: keyof Item,
    value: string | number | File | null
  ) => {
    const updatedItem = { ...localItem, [field]: value };
    setLocalItem(updatedItem);
    updateItem(updatedItem);
  };

  const handleFileUpload = (file: File | null) => {
    if (file) {
      handleInputChange("image", file);
    }
  };

  const formatCurrency = (value: string): string => {
    const numericValue = parseFloat(value.replace(/\D/g, "")) || 0;
    return (numericValue / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="flex flex-col items-center h-44 w-screen">
      <div className="flex flex-row border-2 border-orange-tangelo h-40 w-96 rounded-3xl">
        <div className="w-1/3 flex items-center justify-center relative">
          <input
            type="file"
            className="absolute opacity-0 w-full h-full"
            onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
          />
          <Image src={imagePreview} alt="Upload" width={80} height={80} />
        </div>
        <div className="flex flex-col justify-evenly w-2/3 h-full">
          <input
            type="text"
            placeholder="Inserir nome"
            value={localItem.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Inserir preço"
            value={localItem.price.toString()}
            onChange={(e) =>
              handleInputChange(
                "price",
                parseFloat(e.target.value.replace(/\D/g, "")) || 0
              )
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Inserir custo"
            value={localItem.productionCost.toString()}
            onChange={(e) =>
              handleInputChange(
                "productionCost",
                parseFloat(e.target.value.replace(/\D/g, "")) || 0
              )
            }
            className="input-field"
          />
          <div className="flex flex-row items-center">
            <button
              onClick={() =>
                handleInputChange("stock", Math.max(0, localItem.stock - 1))
              }
            >
              <Image src={removeIcon} alt="Remove" width={24} height={24} />
            </button>
            <input
              type="number"
              value={localItem.stock}
              onChange={(e) =>
                handleInputChange("stock", parseInt(e.target.value) || 0)
              }
              className="text-center w-12"
            />
            <button
              onClick={() => handleInputChange("stock", localItem.stock + 1)}
            >
              <Image src={addIcon} alt="Add" width={24} height={24} />
            </button>
            <button
              onClick={() => removeItem(localItem.id || "")}
              className="mx-4"
            >
              <Trash className="text-orange-strong" size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
