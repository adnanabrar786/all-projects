import { regenerate } from "@/controller/prompt.controller";
import { withHandler } from "@/handler/withHandler";

export const POST = withHandler(regenerate);
