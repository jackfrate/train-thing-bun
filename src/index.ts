import { Hono } from "hono";

import { cors } from "hono/cors";
import { ArrivalsResponse } from "./types/CTA.types";
import { makeTrainTimesTypeNotSuck } from "./types/remap-arrivals-response";
import { DBConnector } from "./util/stations-controller";

const app = new Hono();

// This is not as complete as I'd like, but I'm trying to learn a new
// framework in bun and make a server from scratch.
// It'll be expanded and properly organized as I move along
app.use("*", cors());

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

app.get("/stations", async (c) => {
	const connector = new DBConnector();
	const res = await connector.getStations();
	return c.json(res);
});

export default app;
