<script setup>
import { ref } from "vue"

const videoPath = ref(null)

const recordVideo = async () => {
    if (!navigator.device || !navigator.device.capture) {
        console.error("📛 Capture API není podporováno!")
        return
    }

    navigator.device.capture.captureVideo(
        (mediaFiles) => {
            if (mediaFiles.length > 0) {
                videoPath.value = mediaFiles[0].fullPath // Uložená cesta k videu
            }
        },
        (error) => {
            console.error("❌ Chyba při nahrávání videa:", error)
        },
        { limit: 1, duration: 15 }, // Například omezení na 15 sekund
    )
}
</script>

<template>
  <div>
    <button @click="recordVideo">
      📹 Nahrát video
    </button>
    <video
      v-if="videoPath"
      :src="videoPath"
      controls
    />
  </div>
</template>
