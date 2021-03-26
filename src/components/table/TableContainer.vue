<template>
  <table
    v-bind="$attrs"
    class="bg-white w-full"
  >
    <thead>
      <tr>
        <TableHeader
          v-for="header in headers"
          :key="header.key"
        >
          {{ header.text }}
        </TableHeader>
        <TableHeader
          v-if="$slots.actions"
        >
          Actions
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
        <TableCell v-if="$slots.actions">
          <slot
            name="actions"
            :item="item"
          />
        </TableCell>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TableCell from './TableCell.vue';
import TableHeader from './TableHeader.vue';

export interface ITableHeader {
  key: string;
  text: string;
}

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
