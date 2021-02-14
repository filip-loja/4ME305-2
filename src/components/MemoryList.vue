<template>
	<ion-list>
		<memory-list-item
			v-for="item in memories"
			:key="item.id"
			:model="item"
		/>
	</ion-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MemoryListItem from '@/components/MemoryListItem.vue'
import { IonList } from '@ionic/vue'
export default defineComponent({
	name: 'MemoryList',
	components: {
    MemoryListItem,
    IonList
	},
  computed: {
    memories () {
      return this.$store.getters.memories
    }
  }
})
</script>

<style scoped>

</style>
