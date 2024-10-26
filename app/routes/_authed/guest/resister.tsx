import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/guest/resister')({
  component: () => <div>Hello /_authed/guest/resister!</div>,
})
