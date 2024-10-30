import { setUser } from "@sentry/nextjs";

export function setSentryUser({ id, email }: { id: string; email: string }) {
  setUser({ id, email: email });
}

export function clearSentryUser() {
  setUser(null);
}
