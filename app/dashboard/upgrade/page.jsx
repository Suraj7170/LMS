'use client';
import { db } from '@/configs/db';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Upgrade() {

    const {user}=useUser();
    const [userDetail, setUserDetail] = useState();

    useEffect(() => {
        if (user) {
            GetUserDetail();
        }
    }, [user]);
    const GetUserDetail=async()=>{
        const result=await db.select().from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        setUserDetail(result[0]);
    }

    const OnCheckoutClick = async () => {
        const result=await axios.post('/api/payment/checkout',{
            priceId:process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
        });
        console.log(result.data);
        window.open(result.data.checkoutUrl);
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Upgrade Your Plan
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Unlock premium features and elevate your learning experience.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Pro Plan</h3>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>✅ Unlimited course creation</li>
            <li>✅ AI-generated flashcards & quizzes</li>
            <li>✅ Downloadable PDFs</li>
            <li>✅ Priority support</li>
          </ul>
          <div className="mt-4 text-blue-700 font-bold text-lg">$9.99 / month</div>
        </div>

        <button
          onClick={OnCheckoutClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-300"
        >
          Upgrade Now
        </button>

        <p className="text-xs text-center text-gray-400 mt-4">
          Cancel anytime. No hidden fees.
        </p>
      </div>
    </div>
  );
}

export default Upgrade;
