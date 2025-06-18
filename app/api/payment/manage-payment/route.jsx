import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
    const stripe= new Stripe(process.env.STRIPE_SECRET_KEY);

    // This is the url to which the customer will be redirected when they're done
// managing their billing with the portal.
const returnUrl = process.env.HOST_URL || 'http://localhost:3000';
const customerId = await req.json();

const portalSession = await stripe.billingPortal.sessions.create({
  customer: customerId,
  return_url: returnUrl,
});

    return NextResponse.json(portalSession);
}