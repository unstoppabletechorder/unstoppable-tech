// Receives an order from the website and sends it to your Telegram.
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    const t = process.env.BOT_TOKEN || "";
    const c = process.env.CHAT_ID || "";
    return {
      statusCode: 200,
      body: `BOT_TOKEN: ${t ? "set, length " + t.length : "MISSING"}\nCHAT_ID: ${c ? "set, value " + c : "MISSING"}`,
    };
  }
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };
  let o;
  try { o = JSON.parse(event.body); } catch { return { statusCode: 400, body: "Bad request" }; }
  if (o.website) return { statusCode: 200, body: "ok" };
  const clean = (s, n = 300) => String(s || "").replace(/[<>]/g, "").trim().slice(0, n);
  const phone = clean(o.phone, 15).replace(/\D/g, "");
  if (!clean(o.name) || phone.length < 10 || !clean(o.address) || !/^\d{6}$/.test(clean(o.pincode, 6)))
    return { statusCode: 400, body: "Missing or invalid details" };
  const text =
    "🛒 New order - Unstoppable Tech\n\n" +
    `Product: ${clean(o.product)}\nQty: ${clean(o.qty, 3)}\nPrice: ₹${clean(o.price, 10)}\n\n` +
    `Name: ${clean(o.name)}\nPhone: ${phone}\nAddress: ${clean(o.address)}\nPincode: ${clean(o.pincode, 6)}\n` +
    `Payment: ${clean(o.payment, 20)}`;
  try {
    const r = await fetch(`https://api.telegram.org/bot${(process.env.BOT_TOKEN || "").trim()}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: (process.env.CHAT_ID || "").trim(), text }),
    });
    if (!r.ok) console.error("Telegram error:", r.status, await r.text());
    return { statusCode: r.ok ? 200 : 502, body: r.ok ? "ok" : "Telegram error" };
  } catch (e) {
    console.error("Fetch failed:", e.message);
    return { statusCode: 502, body: "Send failed" };
  }
};
