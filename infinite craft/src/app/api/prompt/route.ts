import { generate, get } from "@/controller/prompt.controller";
import { withHandler } from "@/handler/withHandler";

export const POST = withHandler(generate);

export const GET = withHandler(get);
