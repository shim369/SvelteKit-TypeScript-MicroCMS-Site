import { error } from "@sveltejs/kit";
import { getDetail } from "../../lib/microcms";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  try {
    return await getDetail(params.slug);
  } catch (err) {
    // microcms-js-sdk は "fetch API response status: 404" のような Error を投げる
    if (err instanceof Error && /status: 404/.test(err.message)) {
      error(404, "Not Found");
    }
    throw err;
  }
};

export const prerender = true;
