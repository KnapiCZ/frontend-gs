<script setup lang="ts">
import "swiper/swiper-bundle.css"

import { IonButton, IonContent, IonPage, useIonRouter } from "@ionic/vue"
import Swiper from "swiper"
import { FreeMode, Pagination } from "swiper/modules"
import { SwiperOptions } from "swiper/types"
import { onMounted,ref } from "vue"

import { userDataStore } from "@/stores/UserDataStore"

const modules = [FreeMode, Pagination]
const userStore = userDataStore()
const router = useIonRouter()
const isChecked = ref(false) // Checkbox state
const isOldEnough = ref(true)
const days = Array.from({ length: 31 }, (_, i) => i + 1) // [1, 2, ..., 31]
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]
const years = Array.from({ length: 101 }, (_, i) => (new Date().getFullYear() - i).toString())

// Get today's date for initial selection
const today = new Date()

// Selected date state
const selectedDay = ref(1)
const selectedMonth = ref(months[0])
const selectedYear = ref(today.getFullYear().toString())

// Swiper instances for each column
const daySwiper = ref<Swiper | null>(null)
const monthSwiper = ref<Swiper | null>(null)
const yearSwiper = ref<Swiper | null>(null)

const customSwiperOptions = (customEvents: SwiperOptions["on"] = {}): SwiperOptions => ({
    direction: "vertical",
    slidesPerView: 3,
    centeredSlides: true,
    freeMode: false,
    pagination: {
        clickable: true,
    },
    touchReleaseOnEdges: false,
    modules: modules,
    on: {
        ...customEvents, // Add dynamic event listeners
    },
})

// Initialize Swiper for each column
const initializeSwiper = () => {
    daySwiper.value = new Swiper(
        ".day-swiper",
        customSwiperOptions({
            slideChangeTransitionEnd: updateDayValue,
        }),
    )

    monthSwiper.value = new Swiper(
        ".month-swiper",
        customSwiperOptions({
            slideChangeTransitionEnd: updateMonthValue,
        }),
    )

    yearSwiper.value = new Swiper(
        ".year-swiper",
        customSwiperOptions({
            slideChangeTransitionEnd: updateYearValue,
        }),
    )
}

const updateDayValue = () => {
    const activeDay = getCenterDay()
    selectedDay.value = activeDay
}

const updateMonthValue = () => {
    const activeMonth = getCenterMonth()
    selectedMonth.value = activeMonth
}

const updateYearValue = () => {
    const activeYear = getCenterYear()
    selectedYear.value = activeYear
}

const getCenterDay = () => {
    const activeIndex = daySwiper.value?.realIndex || 0
    return days[activeIndex]
}

const getCenterMonth = () => {
    const activeIndex = monthSwiper.value?.realIndex || 0
    return months[activeIndex]
}

const getCenterYear = () => {
    const activeIndex = yearSwiper.value?.realIndex || 0
    return years[activeIndex]
}

const checkAge = () => {
    const selectedDate = new Date(parseInt(selectedYear.value), months.indexOf(selectedMonth.value), selectedDay.value)

    // Calculate the age by comparing the selected date with the current date
    const ageInMilliseconds = today.getTime() - selectedDate.getTime()
    const ageDate = new Date(ageInMilliseconds)

    // Calculate the age in years
    const age = Math.abs(ageDate.getUTCFullYear() - 1970) // Adjusting for the years difference

    if (age >= 13 && isChecked.value) {
        const formattedMonth = (months.indexOf(selectedMonth.value) + 1).toString().padStart(2, "0")
        const formattedDay = selectedDay.value.toString().padStart(2, "0")
        const formattedBirthDate = selectedYear.value + "-" + formattedMonth + "-" + formattedDay

        userStore.addToDict("registerData", "birthDate", formattedBirthDate)
        router.push("/step-2")
    } else {
        isOldEnough.value = false
    }
}

// Initialize Swipers when component is mounted
onMounted(() => {
    initializeSwiper()
})
</script>

<template>
  <IonPage>
    <IonContent
      class="sign-up-content top-padding-notch"
      :scroll-y="false"
    >
      <img
        src="../../../assets/images/Cake.png"
        class="sign-up-background-image"
        alt="Cake"
      >
      <h1 class="sign-up">
        Set your birth date...
      </h1>
      <div class="date-slider box border-gradient wrapper-div">
        <div class="swiper-container day-swiper">
          <div class="swiper-wrapper">
            <div
              v-for="day in days"
              :key="day"
              class="swiper-slide"
            >
              <div
                class="item"
                :class="{ active: day === selectedDay }"
              >
                {{ day }}
              </div>
            </div>
          </div>
        </div>

        <div class="swiper-container month-swiper">
          <div class="swiper-wrapper">
            <div
              v-for="month in months"
              :key="month"
              class="swiper-slide"
            >
              <div
                class="item"
                :class="{ active: month === selectedMonth }"
              >
                {{ month }}
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-container year-swiper">
          <div class="swiper-wrapper">
            <div
              v-for="year in years"
              :key="year"
              class="swiper-slide"
            >
              <div
                class="item"
                :class="{ active: year === selectedYear }"
              >
                {{ year }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p
        v-show="!isOldEnough"
        id="warning-age"
      >
        You must be at least 13 years old to use this app
      </p>
      <label class="pretty-checkbox box">
        <input
          v-model="isChecked"
          type="checkbox"
        >
        <span class="checkbox" />
        <span class="label-text">I confirm that I have familiarized myself with the
          <a
            href="https://liborzabloudil.notion.site/Privacy-center-GymSpace-App-181a27c10d4180c28b3fd6973ffdf5d7?pvs=4"
          >
            Privacy Policy
          </a>
          and the
          <a
            href="https://liborzabloudil.notion.site/Gymspace-Safety-Policy-0bd2b02002c845c9a14bbca1b52420ff?pvs=4"
          >Terms
            and Conditions
          </a></span>
      </label>
      <IonButton
        fill="solid"
        class="sign-up-button"
        @click="checkAge()"
      >
        NEXT
      </IonButton>
    </IonContent>
  </IonPage>
</template>

<style scoped>
ion-content {
    padding-top: 36px;
}

.sign-up-background-image {
    top: -10vh;
}

#warning-age {
    color: #f2634a;
    font-weight: 800;
    width: 90%;
    text-align: center;
    margin: 3vh auto;
}

.date-slider {
    margin: 60px auto;
    width: 90%;
}

.border-gradient::before {
    background: linear-gradient(135deg,
            rgb(255, 255, 255, 0.35) 14%,
            rgba(255, 255, 255, 0.59) 64%,
            rgb(247, 205, 182, 0.94) 87%) #fff00021;
}

.swiper-container {
    width: 80px;
    height: 12vh;
    overflow: hidden;
}

.swiper-wrapper {
    display: flex;
    flex-direction: column;
}

.swiper-slide {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item {
    font-size: 16px;
    display: flex;
    transition:
        transform 0.3s ease,
        color 0.3s ease;
    scale: 0.8;
    opacity: 0.25;
}

.item.active {
    font-size: 20px;
    font-weight: 400;
    scale: 1;
    opacity: 1;
}

.month-swiper {
    width: 50%;
}

.month-swiper::before,
.month-swiper::after {
    content: "";
    position: absolute;
    top: 20%;
    height: 60%;
    border-left: 1px solid #fff;
}

.month-swiper::before {
    left: 25%;
}

.month-swiper::after {
    right: 25%;
}

.day-swiper,
.year-swiper {
    width: 25%;
}

.pretty-checkbox {
    width: 90%;
    margin: auto;
}

.pretty-checkbox input[type="checkbox"] {
    display: none;
}

.pretty-checkbox .checkbox {
    height: 24px;
    aspect-ratio: 1;
    border: 2px solid #fff000;
    border-radius: 4px;
    position: relative;
    background-color: rgb(0, 0, 0);
    margin-right: 8px;
    transition: background-color 0.3s ease;
}

.pretty-checkbox input[type="checkbox"]:checked+.checkbox {
    background-color: #fff000;
}

.pretty-checkbox .label-text {
    font-size: 11px;
    text-shadow: 0 0 10px black;
}
</style>
