<template>
  <section>
    <PLN v-if="option == 'pln'" />
    <Genset v-if="option == 'genset'" />
    <BBM v-if="option == 'bbm'" />
    <ATS v-if="option == 'ats'" />
    <Rectifier v-if="option == 'rectifier'" />
    <Baterai v-if="option == 'baterai'" />
    <PIC v-if="option == 'pic'" />
    <Suhu v-if="option == 'suhu'" />
    <MDP v-if="option == 'mdp'" />
    <AMF v-if="option == 'amf'" />
  </section>
</template>

<script>
import AMF from './AMF.vue';
import MDP from './MDP.vue';
import PLN from './PLN.vue';
import BBM from './BBM.vue';
import ATS from './ATS.vue';
import PIC from './PIC.vue';
import Suhu from './Suhu.vue';
import Rectifier from './Rectifier.vue';
import Genset from './Genset.vue';
import Baterai from './Baterai.vue';

export default {
  props: ['option'],
  components: {
    AMF,
    PLN,
    ATS,
    PIC,
    MDP,
    BBM,
    Suhu,
    Rectifier,
    Genset,
    Baterai,
  },
};
</script>
