"use client"
import React, { useState } from "react";
import {FiCheck } from "react-icons/fi";
import { useRouter } from 'next/navigation';
const PriceHandlingPage = () => {
  const router = useRouter()
  const [prices, setPrices] = useState([
    { id: 1, productName: "Basic Plan", price: 29.99, features: ["10GB Storage", "Basic Support", "2 Users"] },
    { id: 2, productName: "Pro Plan", price: 59.99, features: ["50GB Storage", "Priority Support", "10 Users"] },
  ]);

  const [selectedPlan, setSelectedPlan] = useState(null);
  
  const paymentRoute = (price) => {
    console.log(price);
    router.push('/payment')
  }

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan.id);
  };

  return (
    <div className="h-full w-full mx-auto px-4 py-8">
      <div className="mb-8 w-full h-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Price Management</h1>
  
        <div className=" flex h-full items-center justify-center w-full gap-6 pt-3 ">
          {prices.map((price) => (
            <div
              key={price.id}
              onClick={() => handlePlanSelection(price)}
              className={`bg-white w-[40%] rounded-lg shadow-lg  p-6 transition-all ${selectedPlan === price.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{price.productName}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">
                  ${price.price}<span className="text-sm text-gray-500">/month</span>
                </p>
                <ul className="space-y-3 mb-6">
                  {price.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <FiCheck className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => paymentRoute(price)}
                  className={`w-full py-2 rounded-lg transition-colors ${selectedPlan === price.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  {selectedPlan === price.id ? "Pay Now" : "Select Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default PriceHandlingPage;