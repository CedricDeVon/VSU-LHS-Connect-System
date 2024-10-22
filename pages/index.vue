<script setup lang="ts">

import * as firestore from 'firebase/firestore';
import { getApp } from 'firebase/app';

const database = firestore.getFirestore(getApp());
console.log(database)

</script>

<template>
  <div>
    <h1>Back-end Testing</h1>
  </div>
</template>
