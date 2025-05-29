/// <reference types="vite-plugin-svgr/client" />

import Cart from "@/components/icon/icon-cart.svg?react";
import Delete from "@/components/icon/icon-delete.svg?react";
import Logo from "@/components/icon/logo.svg?react";
import { useCartStore } from "@/hooks/cart";
import { useState } from "react";

export default function Navbar() {
  const { items, removeItem } = useCartStore();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const menu = ["Collections", "Men", "Women", "About", "Contact"];
  const [showCart, setShowCart] = useState(false);

  return (
    <nav className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 p-6 bg-white group">
      <input
        id="menu-toggle"
        type="checkbox"
        className="peer/menu appearance-none z-20 bg-[url('/images/icon-menu.svg')] bg-no-repeat bg-center size-6 cursor-pointer checked:bg-[url('/images/icon-close.svg')] focus:outline-none"
      />

      {/* Side Menu */}
      <div className="bg-white absolute inset-0 shadow-md z-10 w-2/3 transition-transform duration-300 transform peer-checked/menu:translate-x-0 -translate-x-full">
        <ul className="flex flex-col gap-4 p-8 mt-16 font-bold tracking-wider text-black">
          {menu.map((item) => (
            <li key={item} className="hover:text-orange-500 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      <label
        htmlFor="menu-toggle"
        className="opacity-0 -z-10 peer-checked/menu:opacity-100 peer-checked/menu:z-[1] bg-black/50 absolute inset-0 transition-opacity duration-300 cursor-pointer"
      />

      <Logo />
      <div
        className="relative cursor-pointer select-none"
        onClick={() => setShowCart(!showCart)}
      >
        <Cart />
        <span className="absolute shadow-sm -top-2 -right-2 text-xs text-white -z-0  bg-red-400 rounded-2xl px-1.5 text-center">
          {totalItems}
        </span>
      </div>

      {/* Cart summary */}
      <div
        className={`${showCart && "z-10 translate-y-0"} transform -translate-y-2 transition-transform duration-200 absolute inset-x-0 top-0 mx-1.5 rounded-lg mt-20 -z-10 bg-white divide-y-2 divide-gray-200 shadow-lg`}
      >
        <div className="p-5">Cart</div>
        <div
          className={`${totalItems > 0 ? "p-5" : "min-h-60 flex items-center justify-center"} text-gray-500`}
        >
          {totalItems > 0 ? (
            <ul className="flex flex-col">
              {items.map((item, index) => (
                <li key={`item-${index + 1}`}>
                  <div className="flex items-center gap-2">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                    <div className="m-auto">
                      <p className="font-normal">{item.name}</p>
                      <p>
                        ${(item.price * (item.discount / 100)).toFixed(2)} x{" "}
                        {item.quantity}{" "}
                        <span className="font-extrabold text-black">
                          $
                          {(
                            item.price *
                            (item.discount / 100) *
                            item.quantity
                          ).toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <Delete
                      onClick={() => removeItem(item.id)}
                      className="m-auto cursor-pointer active:-translate-y-0.5"
                    />
                  </div>
                </li>
              ))}
              <li>
                <button className="w-full select-none bg-orange cursor-pointer active:bg-orange/80 active:-translate-y-0.5 font-bold py-3.5 text-black rounded-lg mt-4">
                  Checkout
                </button>
              </li>
            </ul>
          ) : (
            "Your cart is empty."
          )}
        </div>
      </div>

      <div className="select-none">
        <img
          src="/images/image-avatar.png"
          alt="icon-avatar"
          width={"24px"}
          height={"24px"}
        />
      </div>
    </nav>
  );
}
