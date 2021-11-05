<template>
  <div class="container-fluid container-footer">
    <div class="container footer">
      <action-button
        :active="buttonAllActive"
        iconName="all"
        @set-action="setAllPokemons"
        :isFullWith="true"
      >
        All
      </action-button>
      <action-button
        :active="buttonFavoriteActive"
        iconName="star"
        :isFullWith="true"
        @set-action="setFavoritePokemons"
      >
        Favorites
      </action-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ActionButton } from '@/components/UI'
import { Pokemon } from '@/store/module'

@Component({
  name: 'FooterButtons',
  components: {
    ActionButton
  }
})

export default class FotterButtons extends Vue {
  private get buttonAllActive (): boolean {
    return Pokemon.ButtonAllActive
  }

  private get buttonFavoriteActive (): boolean {
    return Pokemon.ButtonFavoriteActive
  }

  private setAllPokemons () {
    Pokemon.getAllPokemons()
  }

  private setFavoritePokemons () {
    Pokemon.getFavoritePokemon()
  }
}
</script>

<style scoped>
  .footer {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .container-footer {
    box-shadow: 0px -5px 10px -5px rgba(0,0,0,0.4);
    background: white;
    position: sticky;
    bottom: 0;
  }

  .container-footer button:first-child {
    margin-right: 10px;
  }

  .container-footer button:last-child {
    margin-left: 10px;
  }
</style>
