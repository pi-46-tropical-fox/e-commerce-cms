<template>
  <!-- <div class="table-auto">
    <div class="table-header">
      <div class="row">
        <div class="cell" v-for="(cell, i) in $props.headers" :key="i">{{ cell }}</div>
      </div>
    </div>
    <div class="table-body">
      <div class="row" v-for="row in $props.data" :key="row.id">
        <div class="cell" v-for="(cell, i) in row" :key="i">{{ cell }}</div>
        <div class="cell">Action</div>
      </div>
    </div>
  </div>-->

  <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
    <div
      class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg"
    >
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
            >ID</th>
            <th v-for="(cell, i) in $props.headers" :key="i"
              class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
            >{{ cell }}</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="row in $props.data" :key="row.id">
            <td v-for="(cell, i) in row" :key="i" class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="flex items-center" v-if="i === 'id'">
                <div>
                  <div class="text-sm leading-5 text-gray-800">#{{ cell }}</div>
                </div>
              </div>
              <div class="text-sm leading-5 text-blue-900" v-else>{{ cell }}</div>
            </td>

            <td
              class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"
            >
              <button
                class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
              >View Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// this will be used for tables
export default {
  name: "Table",

  props: ["data", "headers"],

  mounted() {
    console.log(this.$props.data);
  },
};
</script>

<style>
</style>
