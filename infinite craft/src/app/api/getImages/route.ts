import {
  BG_IMAGE,
  LOGO,
  LOGO_LIGHT,
  LOGO_TEXT,
  USER_STORIES,
} from "@/config/environments";
import { getImageKey } from "@/services/storage.service";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: Request) {
  let logo;
  let userStories;
  let logoText;
  let logoLight;
  let bgImage;

  try {
    logo = await getImageKey(LOGO);
    logoText = await getImageKey(LOGO_TEXT);
    userStories = await getImageKey(USER_STORIES);
    logoLight = await getImageKey(LOGO_LIGHT);
    bgImage = await getImageKey(BG_IMAGE);

    return NextResponse.json({
      status: true,
      data: { logo, logoText, userStories, logoLight, bgImage },
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
    });
  }
}
