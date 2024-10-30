export async function register() {
  if (process.env.NEXT_PUBLIC_NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_PUBLIC_NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
