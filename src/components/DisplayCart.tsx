import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useCart } from "../cart/CartProvider";
import { Counter } from "../data/data";

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
    const { cartItems } = useCart();

    const calculateSubtotal = (cartItem: CartItem): number => {
        const { cashierId, foodId, quantity } = cartItem;
        const cashier = cashiers.find((cashier) => cashier.id === cashierId);
        if (cashier) {
            const food = cashier.foods.find((food) => food.id === foodId);
            if (food) {
                return quantity * food.price;
            }
        }
        return 0;
    };

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
                <Button className={`ml-2 transition-transform duration-150 transform ${showCartAnimation ? 'scale-110' : 'scale-100'}`}>Cart ({calculateTotalQuantity()})</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apa kamu yakin</DialogTitle>
                </DialogHeader>
                <div className="bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {Object.keys(groupItemsByCashier()).map((cashierId) => (
                                <li key={cashierId} className="py-2">
                                    <div className="font-semibold">{cashiers.find(cashier => cashier.id === cashierId)?.name}</div>
                                    <ul>
                                        {groupItemsByCashier()[cashierId].map((item, index) => {
                                            const subtotal = calculateSubtotal(item);
                                            const food = cashiers.find((cashier) => cashier.id === item.cashierId)?.foods.find((food) => food.id === item.foodId);

                                            return (
                                                <li key={index} className="flex justify-between items-center">
                                                    <div>
                                                        <span>{food?.name}</span>
                                                    </div>
                                                    <div>
                                                        <span>Quantity: {item.quantity}</span>
                                                        <span>Subtotal: Rp. {subtotal}</span>
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
            </DialogContent>
        </Dialog>
    );
}

export default DisplayCart;
