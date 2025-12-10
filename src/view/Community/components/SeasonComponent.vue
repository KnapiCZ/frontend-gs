<template>
    <div class="box">
        <div class="games-season">
            <div class="overlap-group">
                <img class="view-gym-pass" alt="View gym pass" :src="viewGymPass" />
                <img class="element-sezona" alt="Element sezona" :src="sezona" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Sezona from "../../../assets/images/sezona.png"
import viewGymPass from "../../../assets/images/BG.png"

export default defineComponent({
    name: "Box",
    data() {
        return {
            sezona: Sezona,
            viewGymPass: viewGymPass,
        }
    },
})
</script>

<style scoped>
.box {
    position: relative;
    height: 350px;
    width: 414px;
}

.box .games-season {
    height: 350px;
    width: 414px;
}

.box .overlap-group {
    height: 367px;
    left: -20px;
    position: relative;
    top: -17px;
    width: 434px;
}

.box .view-gym-pass {
    height: 308px;
    width: 260px;
}

.box .element-sezona {
    background-color: aquamarine;
    height: 325px;
    width: 418px;
}
</style>