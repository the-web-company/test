<script setup lang="ts">
import PDLJS from "peopledatalabs";
const { $thewebco } = useNuxtApp();

const email = ref();
const loading = ref(false);
const canEnter = ref(null as null | Boolean);
const visitorId = ref("");
const visitorData = ref([] as Array<Record<string, any>>);
let thewebcoClient: any = null;
const PDLClient = new PDLJS({ apiKey: "1d97fc9523f88349ba530383c187c5066bfd8e3787fde9c3a600497bcd0e5a81" });

onMounted(async () => {
  thewebcoClient = await $thewebco();
  if (thewebcoClient) {
    visitorId.value = thewebcoClient.visitorId;
  }
});

const emails = [
  "shay@ynet.co.il",
  "gil-b@ynet.co.il",
  "dror-c@ynet.co.il",
  "asaf@ynet.co.il",
  "avi@yit.co.il",
  "iris-k@ynet.co.il",
  "sivan-f@ynet.co.il",
  "dolev-e@ynet.co.il",
  "marina-b@ynet.co.il",
];
const check = async () => {
  loading.value = true;
  if (emails.includes(email.value.toLowerCase())) {
    if (thewebcoClient) {
      const response = await PDLClient.person.search.sql({
        dataset: "email",
        searchQuery: `SELECT * FROM person WHERE (emails.address = '${email.value.toLowerCase()}')`,
        size: 1,
        pretty: true,
      });
      console.log("response", response);
      if (response && response.data.length && response.data[0].profiles?.length) {
        visitorData.value = response.data[0].profiles;
      }

      canEnter.value = true;
    }
  } else {
    canEnter.value = false;
  }

  loading.value = false;
};
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <UCard>
      <p class="my-2">Your visitor id is: {{ visitorId }}</p>

      <div v-if="canEnter == null || canEnter == false">
        <h2 class="text-xl mb-4">This is a test environment for some people, put in your email to check if your're worthy</h2>

        <form class="flex gap-4 justify-center" @submit.prevent="check">
          <UInput id="email" type="email" label="email" placeholder="email" v-model="email" class="w-1/2" />
          <UButton label="Check" type="submit" :loading="loading" />
        </form>

        <p v-if="canEnter == false">You can't enter, sorry..</p>
      </div>
      <div v-else-if="canEnter == true">
        <p>Congratulations! You're worthy ;)</p>
        <p class="mt-2">Your visitor id is: {{ visitorId }}</p>
        <div v-if="Object.keys(visitorData).length" class="flex flex-col space-y-2 mt-2">
          <div v-for="(item, index) of visitorData" :key="index">
            <a v-if="item.url" :href="`https://${item.url}`" target="_blank">profile: https://{{ item.url }}</a>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
