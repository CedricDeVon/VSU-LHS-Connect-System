<script setup lang="ts">
import { EnvironmentConfigurationReader } from "../library/configurationReaders/environmentConfigurationReader";

import * as firestore from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { Chronos } from '~/library/utilities/chronos';
import { Logger } from '~/library/loggers/logger'

const database = firestore.getFirestore(getApp());
console.log(database)

// async function test() {
//   const results = await useFetch('/api/demo');
//   console.log('CLIENT:');
//   Logger.logDebug(results.data.value);
//   Logger.logDebug(`${results.data.value?.a}`);
//   Logger.logInfo(`${results.data.value?.b}`);
//   Logger.logWarning(`${results.data.value?.c}`);
//   Logger.logError(`${results.data.value?.d}`);
// }

// const router = useRouter();
// router.push('/login');

</script>

<template>
  <div>
    <!-- <button @click=test>Test Me</button> -->
  </div>
</template>
