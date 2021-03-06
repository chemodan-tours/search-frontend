<template>
  <div
    class="search__item"
    :class="{
      search__item_active: isActive,
      'search__item_title-visible': isTitleVisible,
    }"
  >
    <label class="field" :for="inputId">
      <div class="field__title">{{ title }}</div>
      <input
        ref="input"
        :id="inputId"
        class="field__block"
        :placeholder="placeholder"
        :value="modelValue"
        :readonly="readonly"
        @input="emitModelValue"
        @focus="activateCurrentField"
      />
      <button
        class="field__btn-default"
        @click.prevent="emitClearModelValue"
      ></button>
    </label>
    <slot></slot>
  </div>
</template>

<script>
import { ref, computed, getCurrentInstance, inject, provide, watch } from 'vue';

export default {
  name: 'ChField',
  emits: ['update:modelValue', 'delete'],
  props: {
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(_, { emit }) {
    const inputId = `input-${getCurrentInstance().uid}`;
    const input = ref(null);

    const activeField = inject('activeField');
    const activeForm = inject('activeForm');
    const fieldGroup = inject('fieldGroup', null);

    const isActive = computed(() => {
      return activeField.value === inputId;
    });

    const isTitleVisible = computed(() => {
      return activeForm.value;
    });

    watch(activeForm, (value) => !value && input.value.blur());

    const activateCurrentField = () => {
      activeField.value = inputId;
    };

    const emitModelValue = (evt) => emit('update:modelValue', evt.target.value);
    const emitClearModelValue = () => emit('delete');

    provide('activeParentField', isActive);

    // Field group
    if (fieldGroup) {
      fieldGroup.push(inputId);
    }

    return {
      inputId,
      input,
      isTitleVisible,
      isActive,
      activateCurrentField,
      emitModelValue,
      emitClearModelValue,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables';

.search__item {
  position: relative;
  z-index: 1;

  &_active {
    z-index: 3;

    .field {
      background-color: white;
      box-shadow: $shadow;

      &__btn-default {
        visibility: visible;
      }

      &:hover {
        background-color: white;
      }
    }
  }

  &_title-visible {
    .field {
      &__title {
        visibility: visible;
      }

      &__block {
        margin-top: 1.8rem;
      }
    }
  }
}

.field {
  @include vertical_container(0.4);
  padding: $padding-search;
  border-radius: $border-search;
  margin: -0.1rem;
  transition: height 0.15s;

  &:hover {
    background-color: $main60;
  }

  &__title {
    position: absolute;
    font-size: 1.2rem;
    font-weight: 600;
    visibility: hidden;
  }

  &__block {
    transition: margin 0.15s;
    margin-right: 1.2rem;
  }

  &__value {
    padding: 0;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2rem;
    flex: 1;

    &_disabled {
      color: $main40;
      user-select: none;
    }
  }

  &__btn-default {
    visibility: hidden;
    position: absolute;
    transform: translate(-100%, -50%);
    top: 50%;
    right: 0;
    width: 2rem;
    height: 2rem;
    padding: 0;
    border-radius: 100%;
    background-color: $main60;
    background-image: url('@/assets/icons/close.svg');
    background-repeat: no-repeat;
    background-size: 1.2rem;
    background-position: center;
    transition: background-color 0.15s;

    &:focus {
      border: 0.1rem solid $main40;
    }

    &:active {
      background-color: $main40;
    }
  }
}
</style>
