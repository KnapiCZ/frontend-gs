<script setup lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, useIonRouter } from "@ionic/vue"
import { ref, onMounted } from "vue"

const router = useIonRouter()

const time = ref({
    days: 0,
    hours: 0,
    minutes: 0,
})

const logOut = () => {
    localStorage.removeItem("Token")
    router.navigate("/login", "back", "push")
}

const deleteAccount = () => {
    router.navigate("/user/delete-account", "forward", "push")
}

const targetDate = new Date("2025-05-18T00:00:00").getTime()

const updateCountdown = () => {
    const now = new Date().getTime()
    const timeLeft = targetDate - now

    if (timeLeft > 0) {
        time.value.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
        time.value.hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        time.value.minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    } else {
        time.value = { days: 0, hours: 0, minutes: 0 }
    }
}

onMounted(() => {
    updateCountdown()
    setInterval(updateCountdown, 1000)
})
</script>

<template>
    <IonPage>
        <IonContent class="top-padding-notch welcome-page" :scroll-y="false">
            <img class="background-img" src="../../../assets/images/waiting-screen-bg.gif" alt="Background" />

            <div id="first-gradient" class="welcome-header border-gradient">
                <p class="thank-you-text">Thank you!</p>
                <p class="welcome-text">AND WELCOME TO</p>
                <p class="gymspace-text">GYMSPACE</p>
                <p class="launch-text">APP IS LAUNCHING IN:</p>

                <div class="countdown box">
                    <div class="countdown-item">
                        <h2>{{ time.days }}</h2>
                        <p>DAYS</p>
                    </div>
                    <div class="countdown-divider"></div>
                    <div class="countdown-item">
                        <h2>{{ time.hours }}</h2>
                        <p>HOURS</p>
                    </div>
                    <div class="countdown-divider"></div>
                    <div class="countdown-item">
                        <h2>{{ time.minutes }}</h2>
                        <p>MIN</p>
                    </div>
                </div>
            </div>

            <div class="section-divider"></div>

            <IonGrid>
                <IonRow>
                    <IonCol size="6">
                        <img class="info-card-images" src="../../../assets/images/web.png" alt="Globe Icon" />
                        <a
                            href="https://pcaczechia.com/product/tickets-championship-2025"
                            target="_blank"
                            class="info-card-link"
                        >
                            <div class="info-card border-gradient">
                                <p class="card-title">Get Your Ticket</p>
                                <p class="card-text">News, promotions & competitions!</p>
                            </div>
                        </a>
                    </IonCol>
                    <IonCol size="6">
                        <img
                            class="info-card-images"
                            src="../../../assets/images/kickstarter.png"
                            alt="Kickstarter Icon"
                        />
                        <a href="https://startovac.cz/projekty/gymspace.app" target="_blank" class="info-card-link">
                            <div class="info-card border-gradient">
                                <p class="card-title">Crowdfunding</p>
                                <p class="card-text">Support us and our GymSpace journey!</p>
                            </div>
                        </a>
                    </IonCol>
                </IonRow>
            </IonGrid>

            <a
                class="link-button"
                target="_blank"
                href="https://pcaczechia.com/product/registrations-championship-2025"
            >
                <div class="athlete-section border-gradient">
                    <p class="athlete-text">Are you an Athlete?</p>
                    <p class="championship-text">PARTICIPATE IN</p>
                    <p class="highlight-text">
                        <img src="../../../assets/images/PCACZECHIACHAMPIONSHIP2025.svg" />
                    </p>
                    <p>Mam slevovy kod: <span class="slevovy-kod">gsapp15</span></p>
                </div>
            </a>

            <div class="social-icons box">
                <a
                    href="https://www.instagram.com/gymspace_official"
                    target="_blank"
                    class="social-icon-btn border-gradient box"
                >
                    <img class="social-icon-images" src="../../../assets/icons/instagram.svg" />
                </a>
                <a
                    href="https://www.facebook.com/gymspace.official"
                    target="_blank"
                    class="social-icon-btn border-gradient box"
                >
                    <img class="social-icon-images" src="../../../assets/icons/facebook.svg" />
                </a>
                <a
                    href="https://www.youtube.com/@gymspaceofficial"
                    target="_blank"
                    class="social-icon-btn border-gradient box"
                >
                    <img class="social-icon-images" src="../../../assets/icons/youtube.svg" />
                </a>
                <a
                    href="https://www.tiktok.com/@gymspace.app"
                    target="_blank"
                    class="social-icon-btn border-gradient box"
                >
                    <img class="social-icon-images" src="../../../assets/icons/tiktok.svg" />
                </a>
            </div>
            <IonCol>
                <IonButton class="log-out-button" @click="logOut">Log Out</IonButton>
                <IonButton class="log-out-button" @click="deleteAccount">Delete Account</IonButton>
            </IonCol>
        </IonContent>
    </IonPage>
</template>

<style scoped>
.background-img {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.link-button {
    text-align: left;
    text-decoration: none;
}

.slevovy-kod {
    color: #fff000;
    font-weight: 700;
}

.info-card,
.welcome-header,
.athlete-section {
    background: rgba(0, 0, 0, 0.3);
    padding: 10px;
    border-radius: 6px;
    box-shadow: -4px 4px 19.9px 1px #0000009e;
    backdrop-filter: blur(20px);
}

.welcome-header.border-gradient::before {
    background: linear-gradient(
        80deg,
        rgba(255, 255, 255, 0.86) 0%,
        rgba(255, 255, 255, 0.35) 10%,
        rgba(255, 240, 0, 0.35) 72%,
        rgba(255, 255, 255, 0.2) 100%
    );
}

.info-card.border-gradient::before {
    background: linear-gradient(
        35deg,
        rgba(255, 255, 255, 0.5) 0%,
        rgba(255, 240, 0, 0.65) 28%,
        rgba(255, 255, 255, 0.86) 51%,
        rgba(255, 255, 255, 0.35) 80%
    );
}

.athlete-section.border-gradient::before {
    background: linear-gradient(
        200deg,
        rgba(255, 255, 255, 0.5) 0,
        rgba(255, 0, 0, 1) 28%,
        rgba(255, 255, 255, 0.86) 51%,
        rgba(255, 255, 255, 0.35) 80%,
        rgba(0, 141, 223, 0.56) 100%
    );
}

.social-icon-btn.border-gradient::before {
    border-radius: 50%;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.53) 8%,
        rgba(255, 255, 255, 0.46) 31%,
        rgba(255, 240, 0, 0.2) 100%
    );
}

.info-card,
.welcome-header {
    margin-top: 80px;
    margin-inline: 10px;
    z-index: 0;
}

.card-title,
.card-text,
.athlete-text,
.championship-text,
.highlight-text,
.thank-you-text,
.welcome-text,
.launch-text {
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
}

.thank-you-text,
.welcome-text,
.launch-text {
    font-size: 1rem;
    line-height: 1rem;
}

.thank-you-text {
    margin: 1.5vh auto;
}

.welcome-text {
    font-weight: 500;
    margin: 2vh auto;
}

.gymspace-text {
    font-size: 2rem;
    font-style: italic;
    font-weight: 900;
    line-height: 3rem;
    color: #fff000;
    margin: 2vh auto;
    text-shadow:
        0 0 1.53px #ffff0080,
        0 0 3.05px #ffff0080,
        0 0 10.68px #ffff0080,
        0 0 21.36px #ffff0080,
        0 0 36.62px #ffff0080;
}

.launch-text {
    font-weight: 600;
}

.countdown {
    margin: 1vh 0;
    gap: 20px;
}

.countdown-item {
    margin: 0 10px;
}

.countdown-item h2 {
    font-size: 2rem;
}

.countdown-item p {
    font-size: 12px;
    color: #aaa;
}

.countdown-divider {
    width: 1px;
    height: 55px;
    background-color: gray;
    opacity: 0.5;
    margin-top: 10px;
}

.section-divider {
    width: 60%;
    height: 1px;
    background-color: gray;
    opacity: 0.5;
    margin: 2vh auto;
}

.info-card-link,
.info-card-link:visited,
.info-card-link:active,
.social-icon-btn {
    text-decoration: none;
}

.welcome-header {
    margin: 10px;
}

img.info-card-images {
    position: absolute;
    top: -10px;
    left: 10px;
    right: 10px;
    width: 80%;
    z-index: 0;
}

.card-title,
.card-text,
.athlete-section,
.highlight-text,
.championship-text {
    font-size: 0.75rem;
    line-height: 1rem;
}

.card-title {
    font-weight: 900;
}

.athlete-section {
    margin: 20px 10px;
    text-align: left;
}

.athlete-text,
.highlight-text {
    font-weight: 900;
}

.championship-text {
    font-weight: 300;
}

.social-icons {
    margin-top: 20px;
    gap: 35px;
}

.social-icon-images {
    height: 50%;
    aspect-ratio: 1;
}

.social-icon-btn {
    width: 12vw;
    aspect-ratio: 1;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transition: all 0.3s ease;
    backdrop-filter: blur(20px);
    box-shadow: -4px 4px 19.9px 1px #0000009e;
}

ion-button {
    margin-top: 20px;
    --background: transparent;
}
</style>
