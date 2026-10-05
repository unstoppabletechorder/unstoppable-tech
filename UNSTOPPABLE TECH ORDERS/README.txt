UNSTOPPABLE TECH - SETUP (about 20 minutes, all free)

1. TELEGRAM BOT
   - In Telegram, open @BotFather, send /newbot, follow the steps, copy the BOT TOKEN.
   - Open your new bot and send it any message (e.g. "hi").
   - Open @userinfobot to get your CHAT ID (a number).

2. PUT THE SITE ONLINE
   - Create a free account on netlify.com (or use your existing one).
   - Add new site > Import from Git (upload this folder to a GitHub repo first), or install the Netlify CLI and run: netlify deploy --prod
     (Plain drag-and-drop does not run the order function, so use GitHub or the CLI.)

3. ADD YOUR SECRETS
   - Netlify > Site settings > Environment variables
   - Add BOT_TOKEN = your bot token
   - Add CHAT_ID = your chat id
   - Redeploy the site.

4. ADD YOUR PRODUCTS
   - Open index.html, find PRODUCTS, and edit the list.
   - type "amazon" + your affiliate link in url, or type "meesho" for the order form.

5. TEST: place a test order on your live site. It should reach your Telegram.
