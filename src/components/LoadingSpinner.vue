<template>
  <div class="loadingspinner" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

});
</script>

<style>
.loadingspinner {
	pointer-events: none;
	width: 2.5em;
	height: 2.5em;
	border: 0.4em solid transparent;
	border-color: #eee;
	border-top-color: #3E67EC;
	border-radius: 50%;
	animation: loadingspin .5s linear infinite;
}

@keyframes loadingspin {
	100% {
			transform: rotate(360deg)
	}
}
</style>
