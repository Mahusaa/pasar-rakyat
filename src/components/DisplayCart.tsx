import React from "react";
import { Dialog, DialogContent,  DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useCart } from "../cart/CartProvider";
import { Counter } from "../data/data";
import { ScrollArea } from "./ui/scroll-area";
import CartIcon from "../cart/CartsIcon";

interface DisplayCartProps {
    showCartAnimation: boolean;
    calculateTotalQuantity: () => number;
    cashiers: Counter[];
}

interface CartItem {
    cashierId: string;
    foodId: string;
    quantity: number;
}

const DisplayCart: React.FC<DisplayCartProps> = ({ showCartAnimation, calculateTotalQuantity, cashiers }) => {
    const { cartItems, addToCart, removeFromCart, totalAmount, clearCart } = useCart();
    const foodPrice = (cartItem: CartItem): number => {
        const { cashierId, foodId } = cartItem;
        const cashier = cashiers.find((cashier) => cashier.id === cashierId);
        if (cashier) {
            const food = cashier.foods.find((food) => food.id === foodId);
            if (food) {
                return food.price;
            }
        }
        return 0;
    }

    const groupItemsByCashier = () => {
        const groupedItems: Record<string, CartItem[]> = {};

        cartItems.forEach((item) => {
            if (!groupedItems[item.cashierId]) {
                groupedItems[item.cashierId] = [item];
            } else {
                groupedItems[item.cashierId].push(item);
            }
        });

        return groupedItems;
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button className={`ml-2 transition-transform duration-150 transform ${showCartAnimation ? 'scale-110' : 'scale-100'}`}><span className="w-4 h-4 mr-1 text-white"><CartIcon /></span> <div className="rounded-full bg-orange-600 ml-2 px-2">{calculateTotalQuantity()}</div></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Your Cart</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-64 border-b-2 border-black">
                <div className="bg-white p-4 rounded-md shadow-md">
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <ul>
                            {Object.keys(groupItemsByCashier()).map((cashierId) => (
                                <li key={cashierId} className="py-2">
                                    <div className="text-lg font-semibold text-black">{cashiers.find(cashier => cashier.id === cashierId)?.name}</div>
                                    <ul>
                                        {groupItemsByCashier()[cashierId].map((item, index) => {
                                            const food = cashiers.find((cashier) => cashier.id === item.cashierId)?.foods.find((food) => food.id === item.foodId);

                                            return (
                                                <li key={index} className="flex justify-between items-center border-b border-black py-1">
                                                    <div>
                                                        <h2 className="text-gray-700">{food?.name}</h2>
                                                        <div className="flex justify-between items-center w-40">
                                                            <span className="font-semibold text-orange-600">{foodPrice(item)}</span>
                                                            <span className="font-semibold bg-gray-200 border border-gray-300 rounded-md px-2 py-1 text-gray-700">x {item.quantity}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col md:flex-row">
                                                        <button onClick={() => addToCart(item.cashierId, item.foodId)} className="text-orange-600 font-semibold text-lg border border-orange-600 rounded-md px-3 py-1 mt-2 md:mt-0 md:ml-4 hover:bg-orange-600 hover:text-white">+</button>
                                                        <button onClick={() => removeFromCart(item.cashierId, item.foodId)} className="text-orange-600 font-semibold text-lg border border-orange-600 rounded-md px-4 py-1 mt-2 md:mt-0 md:ml-2 hover:bg-orange-600 hover:text-white">-</button>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                </ScrollArea>
                <div className="flex justify-between items-center font-bold text-lg mt-4">
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                <div className="text-right mt-4">
                    <Button variant="outline" className="mr-2 hover:bg-black hover:text-white border-2 border-black" onClick={clearCart}>
                        Clear
                    </Button>
                    <Button>
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default DisplayCart;
