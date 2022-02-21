<template>
  <div class="relative text-transparent rounded-t-md my-5">
    <div class="absolute -top-5 text-sm pl-9 pt-2">{{ label }}</div>
    <div class="absolute px-3 py-3">
      <font-awesome-icon :icon="leadingIconName" class="text-gray-500" />
    </div>
    <input
      :type="type"
      class="
        w-full
        font-medium
        bg-gray-100
        text-indigo-900
        pl-9
        pr-3
        py-3
        border-b-2
        rounded-t-md
        outline-none
        focus:placeholder-transparent
        transition
        duration-60
        ease-in-out
      "
      :class="inputStyles"
      :value="value"
      @input="onInput"
      :placeholder="placeholder"
      name="email"
      required
      :disabled="isChecking"
    />
  </div>
</template>

<script>
export default {
  name: "appInput",
  props: {
    type: {
      type: String,
      required: true,
      default: "",
    },
    label: {
      type: String,
      required: true,
      default: "",
    },
    value: {
      type: String,
      required: true,
      default: "",
    },
    leadingIconName: {
      type: String,
      required: true,
      default: "",
    },
    placeholder: {
      type: String,
      required: true,
      default: "",
    },
    isChecking: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDoneChecking: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    inputStyles() {
      return { "text-opacity-70 bg-gray-200": this.isChecking };
    },
  },
  methods: {
    onInput(event) {
      this.$emit("update:value", {
        type: this.type,
        value: event.target.value,
      });
    },
  },
};
</script>

<style>
</style>
