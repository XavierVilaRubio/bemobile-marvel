import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	layout("routes/layout.tsx", [
		index("routes/home.tsx"),
		route("character/:characterId", "routes/character.tsx"),
	]),
] satisfies RouteConfig;
