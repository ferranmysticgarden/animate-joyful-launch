import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Price IDs for each level
const PRICE_IDS: Record<number, string> = {
  1: "price_1So8MMB6GI8NmIPnDs13dRTN", // Sports Car - 5€
  2: "price_1So8NDB6GI8NmIPngwqVCzjh", // Yacht - 10€
  3: "price_1So8NWB6GI8NmIPnpKcBztRu", // Helicopter - 25€
  4: "price_1So8OYB6GI8NmIPnaRQuznPt", // Private Jet - 50€
  5: "price_1So8P4B6GI8NmIPnKWr1FhVK", // Mansion - 100€
  6: "price_1So8PLB6GI8NmIPnka0jI0wz", // Luxury Island - 1000€
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { level, email } = await req.json();
    logStep("Request body", { level, email });

    if (!level || !email) {
      throw new Error("Level and email are required");
    }

    const priceId = PRICE_IDS[level];
    if (!priceId) {
      throw new Error(`Invalid level: ${level}`);
    }
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
