<template>
<component :is="protocol_id"></component>
</template>

<script type="text/javascript">
import standard from './standard'
import register from './register'

export default {
   components: {
      standard,
      register,
   },
   data: () => ({
    protocol_id: '',
   }),
   mounted: function () {
      this.protocol_id = this.$route.params.protocol_id
   },
}
</script>
