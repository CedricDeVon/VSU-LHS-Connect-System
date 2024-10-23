<script setup lang="ts">

import * as firestore from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { Chronos } from '~/library/utilities/chronos';
import { Logger } from '~/library/loggers/logger'

const database = firestore.getFirestore(getApp());
console.log(database)

</script>

<template>
  <div>
    <h1>Back-end</h1>
  </div>
</template>
