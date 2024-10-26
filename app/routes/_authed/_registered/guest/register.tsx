import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed/_registered/guest/register')({
	component: () => <div>Hello /_authed/_registered/guest/resister!</div>,
});
