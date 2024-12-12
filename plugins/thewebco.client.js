import { defineNuxtPlugin } from "#app";
import { TheWebCo } from "https://storage.googleapis.com/thewebco.cloud/TheWebCo.js";

export default defineNuxtPlugin(() => {
  const thewebcoClient = new TheWebCo("268c452f-b153-4a3c-bb9c-77fa71283d51");

  // Make sure that pageviews are captured with each route change
  const router = useRouter();
  router.afterEach(() => nextTick(() => thewebcoClient.logEvent()));
  return { provide: { thewebco: () => thewebcoClient } };
});
