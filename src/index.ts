import { Hono } from "hono";
import { cors } from "hono/cors";

import { ArrivalsResponse } from "./types/CTA.types";
import { makeTrainTimesTypeNotSuck } from "./types/remap-arrivals-response";

const app = new Hono();

app.use(
	"*",
	cors({
		origin: "http://localhost:3000",
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	})
);
app.options("*", (c) => {
	return c.text("", 204);
});

// app.use(
// 	"/*",
// 	cors({
// 		// TODO: make env var
// 		// origin: "http://localhost:8080",
// 		origin: "*",
// 		allowHeaders: [
// 			"X-Custom-Header",
// 			"Upgrade-Insecure-Requests",
// 			"Access-Control-Allow-Origin",
// 		],
// 		allowMethods: [
// 			"POST",
// 			"GET",
// 			"OPTIONS",
// 			"HEAD",
// 			"PUT",
// 			"DELETE",
// 			"PATCH",
// 		],
// 		exposeHeaders: ["Access-Control-Allow-Origin"],
// 		maxAge: 600,
// 	})
// );

// This is not as complete as I'd like, but I'm trying to learn a new
// framework in bun

app.get("/", (c) =>
	c.json({ message: "you'll find nothing at this endpoint lol" })
);

app.get("/timesAtStop/:id", async (c) => {
	// TODO: error handling lol
	const stopId = c.req.param("id");
	const CTA_API_KEY = Bun.env.CTA_API_KEY;
	const url = `https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${CTA_API_KEY}&mapid=${stopId}&outputType=JSON`;
	const response = await fetch(url);

	const convertedType = makeTrainTimesTypeNotSuck(
		(await response.json<ArrivalsResponse>()).ctatt
	);

	return c.json(convertedType);
});

export default app;
