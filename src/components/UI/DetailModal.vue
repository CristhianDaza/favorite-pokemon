<template>
  <div class="modal container-fluid">
    <div class="card">
      <span
        class="close"
        @click="closeModal"
      >
        <i class="icon icon-close"></i>
      </span>
      <div
        class="card-img"
        :style="{'background-image': 'url(' + require('@/assets/img/pokemon/background.png') + ')'}"
      >
        <img :src="`${imageUrl}/${pokemon[0].imageId}.png`" :alt="pokemon[0].name">
      </div>
      <div class="card-content">
        <div class="card-text">
          <p><strong>Name:</strong> {{ pokemon[0].name }}</p>
          <p><strong>Weight:</strong> {{ pokemon[0].weight }}</p>
          <p><strong>Heigth:</strong> {{ pokemon[0].height }}</p>
          <p><strong>Types:</strong> <span
            v-for="types in pokemon[0].types"
            :key="types.slot"
          > {{ types.type.name }}
          </span></p>
        </div>
        <div class="card-button">
          <action-button
            :active="true"
            @set-action="copyClipboard(pokemon[0])"
          >
            Share to my friends
          </action-button>
          <span
            @click="setFavorite(pokemon)"
          >
            <i
              class="icon"
              :class="`icon-star-${pokemon[0].favorite ? 'active' : 'disabled'}`"
            ></i>
          </span>
        </div>
      </div>
    </div>
    <widget-alert
      v-if="showAlert"
      :message="messageAlert"
    />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { ActionButton } from '@/components/UI'
import { pokemonInfo, pokemonResult } from '@/typings'
import { copyClipboard } from '@/utils/copyClipboard'
import { Pokemon } from '@/store/module'

@Component({
  name: 'DetailModal',
  components: {
    ActionButton,
    WidgetAlert: () => import('@/components/UI/WidgetAlert.vue')
  }
})
export default class DetailModal extends Vue {
  private imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

  private messageAlert = ''

  private showAlert = false

  @Prop({ type: Array, required: true })
  private pokemon!: pokemonInfo[]

  @Emit('close-modal')
  private closeModal ():boolean {
    return true
  }

  public get types ():string {
    return this.pokemon[0].types.map((type) => type.type.name).join(', ')
  }

  private async copyClipboard (pokemon: pokemonInfo) {
    await copyClipboard(
      [
        `Name: ${pokemon.name}`,
        `Weight: ${pokemon.weight}`,
        `Height: ${pokemon.height}`,
        `Types: ${this.types}`
      ].join(', ')
    )
    this.messageAlert = 'Copied to clipboard'
    this.showAlert = true

    setTimeout(() => {
      this.showAlert = false
      this.messageAlert = ''
    }, 2000)
  }

  private setFavorite (pokemon: pokemonResult[]) {
    this.showAlert = true
    Pokemon.getFavorite(pokemon[0].name)
    if (pokemon[0].favorite) {
      this.messageAlert = `${pokemon[0].name} remove to favorite`
      pokemon[0].favorite = false
    } else {
      this.messageAlert = `${pokemon[0].name} add to favorite`
      pokemon[0].favorite = true
    }
    setTimeout(() => {
      this.showAlert = false
      this.messageAlert = ''
    }, 2000)
  }
}
</script>

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    min-width: 100%;
    min-height: 100%;
    background: rgba(0, 0, 0, .8);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card {
    height: 500px;
    width: 650px;
    background: white;
    position: relative;
  }

  .card-content {
    width: 80%;
    margin: 20px auto;
  }

  .card .card-img {
    background-repeat: no-repeat;
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card .card-img img{
    width: 200px;
  }

  .card .card-text {
    position: relative;
  }

  .card-text p span:first-child {
    font-weight: 700;
  }

  .card-text p {
    font-size: 18px;
    margin-bottom: 20px;
    text-transform: capitalize;
  }

  .card .card-text p::after{
    content: '';
    background-color: #E8E8E8;
    height: 1px;
    width: 100%;
    position: absolute;
    left: 0;
    transform: translateY(30px);
  }

  .card-button {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-button span i {
    cursor: pointer;
  }

  .close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }

  @media (max-width: 427px) {
    .card {
      width: 350px;
    }
  }
</style>
