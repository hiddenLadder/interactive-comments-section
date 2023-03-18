<script lang="ts">
  export let src: string;
  export let classes: string = "";
</script>

<div class="w-8 h-8 flex-shrink-0 {classes}">
  <img class="w-full h-auto rounded-full" {src} alt="" />
</div>
