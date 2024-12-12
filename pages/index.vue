<script setup lang="ts">
const { $thewebco } = useNuxtApp();

const email = ref();
const canEnter = ref(false);
const visitorId = ref("");
let thewebcoClient: any = null;

onMounted(() => (thewebcoClient = $thewebco()));

const emails = ["shay@ynet.co.il", "gil-b@ynet.co.il", "dror-c@ynet.co.il"];
const check = () => {
  if (emails.includes(email.value)) {
    canEnter.value = true;
    if (thewebcoClient) {
      visitorId.value = thewebcoClient.visitorId;
    }
  } else {
    canEnter.value = false;
  }
};
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <UCard v-if="!canEnter">
      <h2 class="text-xl mb-4">This is a test environment for some people, put in your email to check if your're worthy</h2>

      <form class="flex gap-4 justify-center">
        <UInput type="email" label="email" v-model="email" class="w-1/2" />
        <UButton label="Check" type="submit" @click="check" />
      </form>
    </UCard>

    <UCard v-else>
      <p>Congratulations! You're worthy ;)</p>
      <p>Your visitor id is: {{ visitorId }}</p>
    </UCard>
  </div>
</template>
