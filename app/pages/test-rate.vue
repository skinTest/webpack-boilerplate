<template>
  <div>
    <test-rate
      v-for="(property, index) in property_group"
      :key="index"
      :item-str="property">
    </test-rate>
  </div>
</template>

<script type="text/javascript">
import test_rate from 'Components/test-rate'

export default {
  components: {
    'test-rate': test_rate,
  },
  data: () => ({
    property_group: ['1,2,3', 'a,b,c'],
  }),
}
</script>
