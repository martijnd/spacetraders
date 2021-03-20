<template>
  <table
    v-bind="$attrs"
    class="bg-white"
  >
    <thead>
      <tr>
        <TableHeader
          v-for="header in headers"
          :key="header.key"
        >
          {{ header.text }}
        </TableHeader>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in items"
        :key="item.id"
      >
        <TableCell
          v-for="header in headers"
          :key="header"
        >
          {{ item[header.key] }}
        </TableCell>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TableCell from './TableCell.vue';
import TableHeader from './TableHeader.vue';

export default defineComponent({
  components: { TableCell, TableHeader },
  props: {
    items: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
  },
});
</script>
