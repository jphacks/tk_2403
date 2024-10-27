import type { QueryClient } from '@tanstack/react-query';
import { Outlet, ScrollRestoration, createRootRouteWithContext } from '@tanstack/react-router';
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start';
import type * as React from 'react';
import appCss from '../app.css?url';

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	meta: () => [
		{
			charSet: 'utf-8',
		},
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1',
		},
		{
			title: '二次退避くん',
		},
	],
	links: () => [{ rel: 'stylesheet', href: appCss }],
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<Html>
			<Head>
				<Meta />
			</Head>
			<Body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</Body>
		</Html>
	);
}
