<script setup lang="ts">
import { IonContent, IonPage, IonButton, useIonRouter } from "@ionic/vue"
import { ref, onMounted } from "vue"
import { userDataStore } from "@/stores/UserDataStore"
import Swiper from "swiper"
import "swiper/swiper-bundle.css"

const userStore = userDataStore()
const router = useIonRouter()
const isChecked = ref(false) // Checkbox state
const isOldEnough = ref(true)
const days = Array.from({ length: 31 }, (_, i) => i + 1) // [1, 2, ..., 31]
const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
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

// Initialize Swiper for each column
const initializeSwiper = () => {
    daySwiper.value = new Swiper('.day-swiper', {
        direction: 'vertical',
        slidesPerView: 3,
        centeredSlides: true,
        on: {
            slideChangeTransitionEnd: updateDayValue,
        }
    })

    monthSwiper.value = new Swiper('.month-swiper', {
        direction: 'vertical',
        slidesPerView: 3,
        centeredSlides: true,
        on: {
            slideChangeTransitionEnd: updateMonthValue,
        },
    })

    yearSwiper.value = new Swiper('.year-swiper', {
        direction: 'vertical',
        slidesPerView: 3,
        centeredSlides: true,
        on: {
            slideChangeTransitionEnd: updateYearValue,
        },
    })
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
        const formattedMonth = (months.indexOf(selectedMonth.value) + 1).toString().padStart(2, '0')
        const formattedDay = selectedDay.value.toString().padStart(2, '0')
        userStore.birthday = selectedYear.value + "-" + formattedMonth + "-" + formattedDay
        router.push('/step-2')
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
        <IonContent class="sign-up-content">
            <img src="../../../assets/images/Cake.png" class="sign-up-background-image" alt="Cake" />
            <h1 class="sign-up">Set your birth date...</h1>
            <div class="date-slider">
                <div class="swiper-container day-swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(day) in days" :key="day">
                            <div class="item" :class="{ active: day === selectedDay }">{{ day }}</div>
                        </div>
                    </div>
                </div>

                <div class="swiper-container month-swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(month) in months" :key="month">
                            <div class="item" :class="{ active: month === selectedMonth }">{{ month }}</div>
                        </div>
                    </div>
                </div>
                <div class="swiper-container year-swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(year) in years" :key="year">
                            <div class="item" :class="{ active: year === selectedYear }">{{ year }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!isOldEnough" id="warning-age">
                You must be at least 13 years old to use this app
            </div>
            <label class="pretty-checkbox">
                <input type="checkbox" v-model="isChecked" />
                <span class="checkbox"></span>
                <span class="label-text">I confirm that I have familiarized myself with the Personal Data Processing
                    Policy and the Terms and Conditions</span>
            </label>
            <IonButton fill="solid" class="signup-btn" @click="checkAge()">SIGN UP</IonButton>
        </IonContent>
    </IonPage>
</template>

<style scoped>
.sign-up-background-image {
    top: -60px;
}

#warning-age {
    color: #F2634A;
    font-size: 12px;
    font-weight: 800;
    width: 90%;
    text-align: center;
    margin: 2vh auto;
}

.date-slider {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 60px auto;
    width: 90%;
    background-color: #242424b3;
    border-radius: 6px;
    border: #ffffffcc solid 1px;
    backdrop-filter: blur(10px);
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
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease, color 0.3s ease;
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
    content: '';
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
    display: flex;
    align-items: center;
    text-align: center;
    margin: auto;
}

.pretty-checkbox input[type="checkbox"] {
    display: none;
}

.pretty-checkbox .checkbox {
    height: 24px;
    aspect-ratio: 1;
    border: 2px solid #ffffff;
    border-radius: 4px;
    position: relative;
    background-color: rgb(0, 0, 0);
    margin-right: 8px;
    transition: background-color 0.3s ease;
}

.pretty-checkbox input[type="checkbox"]:checked+.checkbox {
    background-color: #ffffff;
}

.pretty-checkbox .label-text {
    font-size: 10px;
    color: #ffffff;
}
</style>
