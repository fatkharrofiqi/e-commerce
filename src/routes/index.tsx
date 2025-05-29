/// <reference types="vite-plugin-svgr/client" />

import Cart from "@/components/icon/icon-cart.svg?react";
import Minus from "@/components/icon/icon-minus.svg?react";
import Plus from "@/components/icon/icon-plus.svg?react";
import { useCartStore } from "@/hooks/cart";
import type { Shoe } from "@/model/shoe";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import img1 from "/images/image-product-1.jpg";
import img2 from "/images/image-product-2.jpg";
import img3 from "/images/image-product-3.jpg";
import img4 from "/images/image-product-4.jpg";

export const Route = createFileRoute("/")({
  component: App,
});

const shoe: Shoe = {
  id: 1,
  name: "Fall Limited Edition Sneakers",
  price: 250,
  discount: 50,
  images: [img1, img2, img3, img4],
  company: "Sneaker Company",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
};

function App() {
  const { addItem } = useCartStore();
  const [currentImage, setCurrentImage] = useState(shoe.images[0]);
  const [unit, setUnit] = useState(0);

  const handlePlus = () => {
    setUnit((unit) => unit + 1);
  };

  const handleMinus = () => {
    setUnit((unit) => (unit > 0 ? unit - 1 : 0));
  };

  // Function to handle next image click
  const handleNextImage = () => {
    const currentIndex = shoe.images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % shoe.images.length;
    setCurrentImage(shoe.images[nextIndex]);
  };

  // Function to handle previous image click
  const handlePreviousImage = () => {
    const currentIndex = shoe.images.indexOf(currentImage);
    const previousIndex =
      (currentIndex - 1 + shoe.images.length) % shoe.images.length;
    setCurrentImage(shoe.images[previousIndex]);
  };

  const handleAddToCart = () => {
    if (unit > 0) {
      addItem(shoe, unit);
    }
  };

  return (
    <div className="flex-1 bg-white">
      <div className="relative">
        <img src={currentImage} alt="product-item" loading="lazy" />
        <div
          onClick={handlePreviousImage}
          className="transition-all duration-100 active:-translate-y-0.5 hover:cursor-pointer bg-white active:bg-gray-300 size-10 rounded-full bg-[url('/images/icon-previous.svg')] bg-no-repeat bg-center absolute inset-0 my-auto mr-auto ml-4"
        />
        <div
          onClick={handleNextImage}
          className="transition-all duration-100 active:-translate-y-0.5 hover:cursor-pointer bg-white active:bg-gray-300 size-10 rounded-full bg-[url('/images/icon-next.svg')] bg-no-repeat bg-center absolute inset-0 ml-auto my-auto pr-4 mr-4"
        />
      </div>
      <div className="flex flex-col m-6">
        <p className="uppercase font-bold text-gray-500 text-xs tracking-[0.15em] pb-5">
          {shoe.company}
        </p>
        <h1 className="font-extrabold text-shadow-sm text-[1.75rem] leading-8 pb-6">
          {shoe.name}
        </h1>
        <p className="text-gray-500 text-[0.8675rem] tracking-[0.03em] leading-6 pb-8 font-semibold">
          {shoe.description}
        </p>
        <div className="grid grid-cols-2 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">
              ${(shoe.price * (shoe.discount / 100)).toFixed(2)}
            </span>
            <span className="text-xs text-white font-semibold bg-black rounded-md px-2.5 py-0.5">
              {shoe.discount}%
            </span>
          </div>
          <p className="text-gray-500 line-through tracking-tight font-semibold ml-auto">
            ${shoe.price.toFixed(2)}
          </p>
        </div>
        <div className="relative select-none bg-light-grayish-blue rounded-2xl flex justify-center py-5 mb-6">
          <Plus
            className="transition-all duration-100 active:-translate-y-0.5 absolute inset-0 my-auto ml-auto mr-5 cursor-pointer"
            onClick={handlePlus}
          />
          <Minus
            className="transition-all duration-100 active:-translate-y-0.5 absolute inset-0 my-auto mr-auto ml-5 cursor-pointer"
            onClick={handleMinus}
          />
          <input
            type="number"
            readOnly
            className="text-center focus:outline-none select-none font-bold"
            value={unit}
          />
        </div>
        <button
          onClick={handleAddToCart}
          className="transition-all font-bold duration-100 active:-translate-y-0.5 active:bg-orange/80 cursor-pointer select-none bg-orange rounded-2xl flex justify-center items-center gap-4 py-5 shadow-orange-400 shadow-md"
        >
          <Cart />
          Add to cart
        </button>
      </div>
    </div>
  );
}
