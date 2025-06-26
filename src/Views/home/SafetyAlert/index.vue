<!-- \code\src\Views\home\HomePage\index.vue -->
<template>
    <Left_box>
    <weatherCard/>

    <Box direction="left" height="1150" width="512">
    <template #title>
      <Lease_title>單次飛行衝突詳情</Lease_title>
    </template>
    <SingleFlightConflictDetails/>

  </Box>
    </Left_box>
</template>
      
<script lang="ts" setup>
import Left_box from "@/components/left_box.vue";
import Lease_title from "@/components/Lease_title/index.vue";
import Right_box from "@/components/right_box.vue";
import Box from "@/components/Box/index.vue";
import weatherCard from "../HomePage/components/weatherCard.vue";
import SingleFlightConflictDetails from "../SafetyAlert/components/SingleFlightConflictDetails.vue"
</script>
<style lang="scss" scoped>
</style>