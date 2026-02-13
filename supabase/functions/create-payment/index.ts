import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const RequestSchema = z.object({
  level: z.number().int().min(1).max(9),
  email: z.string().email().max(255).toLowerCase().trim(),
});

// Price IDs para cada nivel (VERIFICADOS CON STRIPE API)
const PRICE_IDS: Record<number, string> = {
  1: "price_1So8TnB6GI8NmIPnJasBJsMH", // Sports Car - €100
  2: "price_1So8U7B6GI8NmIPn2gmK5gxh", // Yacht - €200
  3: "price_1So8UHB6GI8NmIPnbppQ0OGJ", // Helicopter - €300
  4: "price_1So8URB6GI8NmIPnJuZ6J291", // Private Jet - €400
  5: "price_1So8UeB6GI8NmIPnF8Y3K90q", // Mansion - €500
  6: "price_1So8PLB6GI8NmIPnka0jI0wz", // Luxury Island - €1000
  7: "price_1Su9iLB6GI8NmIPnewKubmDH", // Private Paradise Island - €5000
  8: "price_1Su9isB6GI8NmIPncg7ElWnp", // Orbital Space Station - €10000
  9: "price_1Su9jLB6GI8NmIPnjMLJS8fQ", // Own a Planet - €50000
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const body = await req.json();
    const parseResult = RequestSchema.safeParse(body);
    if (!parseResult.success) {
      const errors = parseResult.error.flatten().fieldErrors;
      logStep("Validation failed", { errors });
      return new Response(JSON.stringify({ error: "Invalid input", details: errors }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { level, email } = parseResult.data;
    logStep("Request validated", { level, emailDomain: email.split("@")[1] });

    const priceId = PRICE_IDS[level];
    logStep("Price ID found", { priceId });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    }

    const origin = req.headers.get("origin") || "https://luxurylife.app";
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/payment-success?level=${level}`,
      cancel_url: `${origin}/garage`,
      metadata: {
        level: level.toString(),
        email,
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
