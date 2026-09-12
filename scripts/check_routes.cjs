const http = require("http");

const routes = [
  "/",
  "/shop",
  "/about",
  "/contact",
  "/collections/wedding-wear",
  "/collections/party-wear",
  "/collections/office-formal",
  "/collections/safari-blazers",
  "/collections/bespoke-fabrics",
  "/collections/wedding-sherwanis",
  "/collections/velvet-blazers",
  "/login",
  "/signup",
  "/account",
  "/checkout",
  "/track-order",
  "/admin",
  "/admin/login"
];

async function check() {
  console.log("Checking routes on http://localhost:3000 ...");
  for (const r of routes) {
    await new Promise((res) => {
      http.get("http://localhost:3000" + r, (resp) => {
        console.log(`[${resp.statusCode}] ${r}`);
        resp.resume();
        res();
      }).on("error", (err) => {
        console.error(`[ERR] ${r} -> ${err.message}`);
        res();
      });
    });
  }
}

check();
