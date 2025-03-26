import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
	const handlePing = () => alert(window.api.ping());
  
	return (
		<button onClick={handlePing}>
			Ping Electron IPC
		</button>
	);
}
  
declare global {
	interface Window {
		api: {
			ping: () => string;
		};
	}
}