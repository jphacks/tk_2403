import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/host/register')({
  component: () => <div>Hello /_authed/host/register!</div>,
})
