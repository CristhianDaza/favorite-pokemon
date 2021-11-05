<template>
  <div class="modal container-fluid">
    <div class="card">
      <span class="close">
        <i class="icon icon-close"></i>
      </span>
      <div
        class="card-img"
        :style="{'background-image': 'url(' + require('@/assets/img/pokemon/background.png') + ')'}"
      >
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png" alt="Squirtle">
      </div>
      <div class="card-content">
        <div class="card-text">
          <p><span>Name:</span> Squirtle</p>
          <p><span>Weight:</span> 20</p>
          <p><span>Heigth:</span> 18</p>
          <p><span>Types:</span> Normal, Water</p>
        </div>
        <div class="card-button">
          <action-button
            :active="true"
          >
            Share to my friends
          </action-button>
          <span>
            <i class="icon icon-star-active"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ActionButton } from '@/components/UI'

@Component({
  name: 'DetailModal',
  components: {
    ActionButton
  }
})
export default class DetailModal extends Vue {}
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

  .card-text span {
    font-weight: 700;
  }

  .card-text p {
    font-size: 18px;
    margin-bottom: 20px;
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

  .close {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  @media (max-width: 427px) {
    .card {
      width: 350px;
    }
  }
</style>
