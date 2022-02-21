<template>
  <Layout>
    <div class="text-4xl font-thin md:mb-8">Flatiron Cyber</div>
    <form
      @submit.prevent="onSubmit"
      class="container md:w-96 md:bg-white p-4 md:rounded-md md:shadow-md"
    >
      <!-- Email -->
      <app-input
        type="email"
        label="Email Address"
        leadingIconName="envelope"
        placeholder="Email Address"
        :value="email"
        :isChecking="isChecking"
        :isDoneChecking="isDoneChecking"
        @update:value="onUpdateValue"
      />

      <!-- Password -->
      <app-input
        type="password"
        label="Password"
        leadingIconName="lock"
        placeholder="Password"
        :value="password"
        :isChecking="isChecking"
        :isDoneChecking="isDoneChecking"
        @update:value="onUpdateValue"
      />

      <!-- Submit Button -->
      <div class="flex flex-row justify-end mb-4">
        <button
          type="submit"
          class="bg-indigo-800 text-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-1 shadow mb-3"
          :class="buttonStyles"
          :disabled="isChecking"
        >
          <font-awesome-icon
            v-show="isChecking"
            icon="circle-notch"
            class="text-sm mr-2 fa-spin"
          />
          <font-awesome-icon
            v-show="!isChecking"
            icon="check-circle"
            class="text-sm mr-2"
          />
          <span>{{ buttonText }}</span>
        </button>
      </div>

      <!-- Results -->
      <div
        v-show="isDoneChecking"
        class="text-gray-800 bg-gray-50 md:bg-gray-50 md:bg-opacity-60 p-4 rounded-md transform transition-transform"
      >
        <div class="font-medium text-xs text-gray-400">RESULTS</div>

        <hr class="my-3 border-1 border-gray-200" />

        <!-- Email -->
        <div class="mb-3">
          <span class="mr-2">Is my email compromised?</span>
          <span
            class="font-medium text-sm px-2 rounded"
            :class="[
              isEmailCompromised
                ? 'bg-red-50 text-red-800'
                : 'bg-green-50 text-green-800',
            ]"
          >
            {{ isEmailCompromisedText }}
          </span>
        </div>

        <!-- Password -->
        <div class="mb-3">
          <span class="mr-2">Is my password compromised?</span>
          <span
            class="font-medium text-sm px-2 rounded"
            :class="[
              isPasswordCompromised
                ? 'bg-red-50 text-red-800'
                : 'bg-green-50 text-green-800',
            ]"
          >
            {{ isPasswordCompromisedText }}
          </span>
        </div>

        <!-- Score -->
        <div class="mb-3">
          <span class="mr-2">Risk of using these credentials is</span>
          <span
            class="font-medium text-sm px-2 rounded"
            :class="[
              compromisedConfidenceScore > 0
                ? 'bg-red-50 text-red-800'
                : 'bg-green-50 text-green-800',
            ]"
          >
            {{ compromisedConfidenceScore }}%
          </span>
        </div>
      </div>
    </form>
  </Layout>
</template>

<script>
import AppInput from "~/components/AppInput.vue";
import FlatIronCyber from "~/modules/flat-iron-cyber";

export default {
  components: {
    AppInput,
  },
  data() {
    return {
      email: "",
      password: "",
      isChecking: false,
      isDoneChecking: false,
      flatIronCyberInstance: null,
      isEmailCompromised: false,
      isPasswordCompromised: false,
      compromisedConfidenceScore: 0,
    };
  },
  created() {
    this.flatIronCyberInstance = new FlatIronCyber();
    this.flatIronCyberInstance.setApiKey(
      //"8590347d-734b-427a-8eda-53019c487565-d34824e205036a301b26198d4261628f"
        "f02f2224-d114-4a3e-af78-2bdc5d757a97-c52cb97f8fa0453eb6c7d30e9dbb4a1d"
    );
  },
  computed: {
    buttonText() {
      return this.isChecking ? "Checking..." : "Check";
    },
    buttonStyles() {
      return {
        "hover:bg-indigo-700 hover:text-gray-100": !this.isChecking,
        "bg-opacity-70 shadow-none cursor-not-allowed": this.isChecking,
      };
    },
    inputStyles() {
      return { "text-opacity-70 bg-gray-200": this.isChecking };
    },
    isEmailCompromisedText() {
      return this.isEmailCompromised ? "Yes" : "No";
    },
    isPasswordCompromisedText() {
      return this.isPasswordCompromised ? "Yes" : "No";
    },
  },
  methods: {
    onUpdateValue(payload) {
      if (payload.type === "email") {
        this.email = payload.value;
        if (this.email.isCompromised) {
          this.email.isCompromised = false;
        }
      }
      if (payload.type === "password") {
        this.password = payload.value;
        if (this.password.isCompromised) {
          this.password.isCompromised = false;
        }
      }
    },
    async onSubmit() {
      this.isChecking = true;
      this.isDoneChecking = false;
      try {
        const response = await this.flatIronCyberInstance.check(
          this.email,
          this.password
        );

        if (response.success) {
          const {
            isEmailCompromised,
            isPasswordCompromised,
            compromisedConfidenceScore,
          } = response.data;
          this.isEmailCompromised = !!isEmailCompromised;
          this.isPasswordCompromised = !!isPasswordCompromised;
          this.compromisedConfidenceScore = compromisedConfidenceScore;

          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isChecking = false;
        this.isDoneChecking = true;
      }
    },
  },
};
</script>

<style></style>
