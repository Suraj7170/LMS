import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { priceId } = await req.json();

  if (!priceId) {
    return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.HOST_URL}payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: process.env.HOST_URL,
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
