<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
    id: number
    logo?: string
    background_image: string
    name?: string
    postCount?: number | 0
    spotters?: number | 0
    members?: number | 0
}>()

const description =
    "We have been here for you since 2014. That's when we opened the largest We have been here for you since 2014. That's when we opened the largest We have been here for you since 2014. That's when we opened the largest..."
const expanded = ref(false)
const truncatedText = description.slice(0, 80) + "..."

const toggleExpand = () => {
    expanded.value = !expanded.value
}
</script>

<template>
    <div class="header-image-container">
        <img :src="background_image" alt="Header Background" class="header-cover-image" />
    </div>

    <div class="header-container border-gradient margin-inline-default">
        <div class="header-top">
            <div class="header-stats row">
                <img :src="logo" alt="Header Logo" class="header-image" />

                <div class="default-flex">
                    <h5>{{ postCount }}</h5>
                    <p>posts</p>
                </div>
                <div class="default-flex">
                    <h5>{{ members }}</h5>
                    <p>joined</p>
                </div>
                <div class="default-flex">
                    <h5>{{ spotters }}</h5>
                    <p>spotting</p>
                </div>
            </div>

            <div class="header-bottom">
                <h4 class="header-title">{{ name }}</h4>
                <p class="header-description smallest-text">
                    <span v-if="!expanded">{{ truncatedText }}</span>
                    <span v-else>{{ description }}</span>
                    <button @click="toggleExpand" class="more-button">
                        {{ expanded ? "less" : "more" }}
                    </button>
                </p>
                <a href="https://www.newpark.cz" target="_blank" class="header-link row">
                    <img src="/src/assets/icons/link.svg" alt="link" class="header-link-icon" />
                    www.newpark.cz
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header-image-container {
    position: absolute;
}

.header-cover-image {
    width: 100vw;
    aspect-ratio: 391/180;
    object-fit: cover;
}

.header-container {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    padding: 16px;
    margin-top: 15vh;
    backdrop-filter: blur(20px);
    box-shadow: -4px 4px 19.9px 1px #0000009e;
}

.header-container .border-gradient {
    background: linear-gradient(to bottom,
            rgb(173, 173, 173) 4.06%,
            rgba(170, 170, 170, 0.46) 45.45%,
            rgba(22, 22, 22, 0.13) 100%);
}

.header-image {
    width: 14vw;
    aspect-ratio: 1;
    object-fit: contain;
}

h5 {
    margin-bottom: 4px;
}

.header-stats>div:nth-child(3) {
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.header-stats {
    text-align: center;
    padding: 8px 0;
}

.header-description {
    margin-top: 8px;
}

.more-button {
    color: white;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
}

.header-link {
    justify-content: start;
    gap: 8px;
}
</style>
