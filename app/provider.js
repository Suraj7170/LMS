'use client';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect } from 'react';

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      CheckIsNewUser();
    }
  }, [user]);

  const CheckIsNewUser = async () => {
    try {
      const cleanedUser = {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress,
        name: user.fullName,
      };

      const resp = await axios.post('/api/create-user', {
        user: cleanedUser,
      });

      console.log("Inngest response:", resp.data);
    } catch (error) {
      console.error("Error sending user to Inngest:", error?.response?.data || error.message);
    }
  };

  return <div>{children}</div>;
}

export default Provider;
