import { render } from "../dist/server/entry-server.js";

const { html } = render("/");
const firstDivIdx = html.indexOf("<div");
console.log("First 1000 chars of HTML:");
console.log(html.slice(0, 1000));
console.log("---");
console.log("Position of first div:", firstDivIdx);
console.log("Position of <title:", html.indexOf("<title"));
console.log("Position of meta description:", html.indexOf('name="description"'));
console.log("Total HTML length:", html.length);
