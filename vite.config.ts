import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	const isTest = mode === "test" || process.env.VITEST !== undefined;
	return {
		plugins: [
			tailwindcss(),
			...(isTest ? [] : [reactRouter()]),
			tsconfigPaths(),
		],
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: ["./vitest.setup.ts"],
			css: true,
		},
	};
});
