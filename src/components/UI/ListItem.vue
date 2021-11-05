<template>
  <div class="list-pokemon">
    <p>{{ name }}</p>
    <span>
      <i
        @click="setFavorite(name)"
        class="icon favorite"
        :class="`icon-star-${favorite ? 'active' : 'disabled'}`"
      ></i>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'ListItem'
})
export default class ListItem extends Vue {
  @Prop({ type: String, required: true })
  private name!: string

  @Prop({ type: Boolean, required: true })
  private favorite!: boolean

  @Emit('set-favorite')
  private setFavorite (name: string): string {
    return name
  }
}
</script>

<style scoped>
  .list-pokemon {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .list-pokemon p {
    font-size: 22px;
    text-transform: capitalize;
  }

  .list-pokemon .favorite {
    cursor: pointer;
  }
</style>
