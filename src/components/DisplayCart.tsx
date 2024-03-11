import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useCart } from "../cart/CartProvider";
import { Cashier } from "../data/data";

interface DisplayCartProps {
    showCartAnimation: boolean;
    calculateTotalQuantity: () => number;
    cashiers: Cashier[]; // Add cashiers as a prop
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

    return (
        <Dialog>
            <DialogTrigger>
                <Button className={`ml-2 transition-transform duration-150 transform ${showCartAnimation ? 'scale-110' : 'scale-100'}`}>Cart ({calculateTotalQuantity()})</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Apa kamu yakin
                    </DialogTitle>
                </DialogHeader>
                <div className="bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {cartItems.map((item, index) => {
                                const subtotal = calculateSubtotal(item);
                                const cashier = cashiers.find((cashier) => cashier.id === item.cashierId);
                                const food = cashier?.foods.find((food) => food.id === item.foodId);

                                return (
                                    <li key={index} className="py-2">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="font-semibold">{cashier?.name}</span>
                                                <span className="text-gray-500"> - {food?.name}</span>
                                            </div>
                                            <div>
                                                <span className="font-semibold">Quantity: {item.quantity}</span>
                                                <span className="text-gray-500">Subtotal: Rp. {subtotal}</span>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default DisplayCart;
