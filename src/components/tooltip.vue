<template>
<span :class="`relative text-sm p-2 bg-${colour}${inverse ? '-lighter' : ''} rounded text-${colour}${inverse ? '' : '-lighter'} inline-block`">
  <slot></slot>
  <span :class="`rounded-sm bg-${colour}${inverse ? '-lighter' : ''} inline-block absolute tooltip-${position}`"></span>
</span>
</template>

<style>
.tooltip-top {
  bottom: 0;
  left: 50%;
  transform: translateY(50%) translateX(-50%) rotate(45deg);
  transform-origin: center;
  z-index: -1;
  width: 10px;
  height: 10px;
}
.tooltip-bottom {
  top: 0;
  left: 50%;
  transform: translateY(-50%) translateX(-50%) rotate(45deg);
  transform-origin: center;
  z-index: -1;
  width: 10px;
  height: 10px;
}
.tooltip-left {
  top: 50%;
  right: 0;
  transform: translateY(-50%) translateX(50%) rotate(45deg);
  transform-origin: center;
  z-index: -1;
  width: 10px;
  height: 10px;
}
.tooltip-right {
  top: 50%;
  left: 0;
  transform: translateY(-50%) translateX(-50%) rotate(45deg);
  transform-origin: center;
  z-index: -1;
  width: 10px;
  height: 10px;
}
</style>

<script>
export default {
  name: 'tooltip',
  props: {
    colour: String,
    inverse: Boolean,
    position: {
      type: String,
      default: 'top',
      validator (position) {
        // The asset must match one of these strings
        return ['top', 'right', 'bottom', 'left'].includes(position);
      }
    },
  }
}
</script>
