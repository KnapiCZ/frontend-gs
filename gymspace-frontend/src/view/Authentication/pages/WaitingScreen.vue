<script setup lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { ref, onMounted } from 'vue';

const time = ref({
    days: 0,
    hours: 0,
    minutes: 0
});

const targetDate = new Date('2025-05-18T00:00:00').getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft > 0) {
        time.value.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        time.value.hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        time.value.minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    } else {
        time.value = { days: 0, hours: 0, minutes: 0 };
    }
};




onMounted(() => {
    updateCountdown()
    setInterval(updateCountdown, 1000)
});

</script>

<template>
    <IonPage>
        <IonContent class="ion-padding welcome-page">
            <img class="background-img" src="../../../assets/images/waiting-screen-bg.gif" alt="Background" />

            <div class="welcome-header">
                <p class="thank-you-text">Thank you!</p>
                <p class="welcome-text">AND WELCOME TO</p>
                <p class="gymspace-text">GYMSPACE</p>
                <p class="launch-text">APP IS LAUNCHING IN:</p>


                <div class="countdown">
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
                        <a href="https://pcaczechia.com/product/tickets-championship-2025" target="_blank"
                            class="info-card-link">
                            <div class="info-card">
                                <p class="card-title">Get Your Ticket</p>
                                <p class="card-text">News, promotions & competitions!</p>
                            </div>
                        </a>
                    </IonCol>
                    <IonCol size="6">
                        <img class="info-card-images" src="../../../assets/images/kickstarter.png"
                            alt="Kickstarter Icon" />
                        <a href="https://startovac.cz/projekty/gymspace.app" target="_blank" class="info-card-link">
                            <div class="info-card">
                                <p class="card-title">Crowdfunding</p>
                                <p class="card-text">Support us and our GymSpace journey!</p>
                            </div>
                        </a>
                    </IonCol>
                </IonRow>
            </IonGrid>

            <a class="link-button" target="_blank"
                href="https://pcaczechia.com/product/registrations-championship-2025">
                <div class="athlete-section">
                    <p class="athlete-text">Are you an Athlete?</p>
                    <p class="championship-text">PARTICIPATE IN</p>
                    <p class="highlight-text"><img src="../../../assets/images/PCACZECHIACHAMPIONSHIP2025.svg"></p>
                    <p> Mam slevovy kod: <span class="slevovy-kod">MAMAPPKU15</span></p>
                </div>
            </a>

            <div class="social-icons">
                <a href="https://www.instagram.com/gymspace_official" target="_blank" class="social-icon-btn">
                    <img class="social-icon-images" src="../../../assets/icons/instagram.svg">
                </a>
                <a href="https://www.facebook.com/gymspace.official" target="_blank" class="social-icon-btn">
                    <img class="social-icon-images" src="../../../assets/icons/facebook.svg">
                </a>
                <a href="https://www.youtube.com/@gymspaceofficial" target="_blank" class="social-icon-btn">
                    <img class="social-icon-images" src="../../../assets/icons/youtube.svg">
                </a>
                <a href="https://www.tiktok.com/@gymspace.app" target="_blank" class="social-icon-btn">
                    <img class="social-icon-images" src="../../../assets/icons/tiktok.svg">
                </a>
            </div>
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
    z-index: -1;
}

.link-button {
    text-align: left;
    text-decoration: none;
}

.slevovy-kod {
    color: #fff000;
    font-weight: 700;

}

.welcome-page {
    text-align: center;
}

.welcome-header {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    color: #fff;
    margin: 10px 0;
    margin-left: 10px;
    margin-right: 10px;
    backdrop-filter: blur(26.600000381469727px);
    box-shadow: -4px 4px 19.9px 1px #0000009E;
}

.welcome-header .thank-you-text {
    font-size: 15px;
    font-weight: 400;
    line-height: 18.29px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin: 1.5vh auto;
}

.welcome-header .welcome-text {
    font-size: 2vh;
    font-weight: 500;
    line-height: 2.5vh;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin: 2vh auto;
}

.gymspace-text {
    font-size: 4vh;
    font-style: italic;
    font-weight: 900;
    line-height: 6vh;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #fff000;
    margin: 2vh auto;
    text-shadow:
        0 0 1.53px#FFFF0080,
        0 0 3.05px #FFFF0080,
        0 0 10.68px #FFFF0080,
        0 0 21.36px #FFFF0080,
        0 0 36.62px #FFFF0080,
}

.welcome-header .launch-text {
    font-family: Montserrat;
    font-size: 2.2vh;
    font-weight: 600;
    line-height: 2.2vh;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

}


.countdown {
    display: flex;
    justify-content: center;
    margin: 1vh 0;
    gap: 20px;
}

.countdown-item {
    margin: 0 10px;
}

.countdown-item h2 {
    font-size: 4vh;
    color: #fff;
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

.info-card-link {
    text-decoration: none;
}

.info-card-link:visited {
    text-decoration: none;
}

.info-card-link:active {
    text-decoration: none;
}


.info-card {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    color: #fff;
    margin-top: 80px;
    margin-left: 10px;
    margin-right: 10px;
    z-index: 0;
    backdrop-filter: blur(26.600000381469727px);
    box-shadow: -4px 4px 19.9px 1px #0000009E;
    aspect-ratio: 1.5/1;
}

.info-card-images {
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;

}

.card-title {
    margin-top: 10px;
    font-size: 1.5vh;
    font-weight: 900;
    line-height: 2.5vh;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

}

.card-text {
    color: #ccc;
    font-size: 1.5vh;
    font-weight: 400;
    line-height: 15.85px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

}


.athlete-section {
    margin: 20px 0;
    padding: 10px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    margin-left: 10px;
    margin-right: 10px;
    backdrop-filter: blur(26.600000381469727px);
    box-shadow: -4px 4px 19.9px 1px #0000009E;
}


.athlete-text {
    font-size: 16px;
    font-weight: 900;
    line-height: 19.5px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
}

.championship-text {
    font-size: 13px;
    font-weight: 300;
    line-height: 15.85px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

}

.highlight-text {
    font-size: 16px;
    font-weight: 450;
    line-height: 36px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    text-align: left;
    font-weight: 900;
    background: linear-gradient(97.42deg, #F52A18 2.43%, #0A39BD 94.29%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 5px;
}

.social-icons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 35px;
}

.social-icon-images {
    width: 23px;
    height: 23px;
}

.social-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.3s ease;
    backdrop-filter: blur(26.600000381469727px);
    box-shadow: -4px 4px 19.9px 1px #0000009E;
}


.social-icon-btn ion-icon {
    font-size: 24px;
    color: #ffe600;
    transition: color 0.3s ease;
}


.social-icon-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
}

.social-icon-btn:hover ion-icon {
    color: #ffffff;
}

ion-col {
    margin-top: -2vh;
}
</style>
