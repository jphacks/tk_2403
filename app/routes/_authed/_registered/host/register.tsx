import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed/_registered/host/register')({
	component: () => <div>Hello /_authed/_registered/host/register!</div>,
});
