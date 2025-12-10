<script setup>
import { ref } from "vue"
import { IonPage, IonHeader, IonContent, IonList, IonItem } from "@ionic/vue"

const leaderboards = {
    world: [
        {
            rank: 1,
            name: "Martin Johnson",
            points: 2535,
            avatar: "gs_logo.png",
            badges: ["badge1.png", "badge2.png"],
        },
        {
            rank: 2,
            name: "David Hoffmann",
            points: 2145,
            avatar: "avatar1.png",
            badges: ["badge1.png", "badge3.png"],
        },
        {
            rank: 3,
            name: "Peter Farley",
            points: 2120,
            avatar: "avatar2.png",
            badges: ["badge2.png"],
        },
    ],
    division: [
        {
            rank: 1,
            name: "John Doe",
            points: 1890,
            avatar: "J",
            badges: ["badge2.png", "badge3.png"],
        },
        {
            rank: 2,
            name: "Jane Smith",
            points: 1725,
            avatar: "avatar3.png",
            badges: ["badge1.png"],
        },
        {
            rank: 3,
            name: "Michael Brown",
            points: 1600,
            avatar: "avatar4.png",
            badges: ["badge2.png"],
        },
    ],
}

const activeTab = ref("world")
</script>

<template>
    <IonPage>
        <IonHeader>
            <div>
                <button @click="router.back()" class="menu-button">
                    <img src="../../../assets/icons/HamburgerMenu.svg" />
                </button>
            </div>

            <div class="custom-tabs">
                <button @click="activeTab = 'world'" :class="{ active: activeTab === 'world' }">
                    <img src="@/assets/icons/Globe.svg" />
                </button>
                <button @click="activeTab = 'division'" :class="{ active: activeTab === 'division' }">
                    <img src="@/assets/icons/Division.svg" />
                </button>
                <div class="tab-slider" :style="{ left: activeTab === 'world' ? '0%' : '50%' }"></div>
            </div>

            <div class="leaderboard-container">
                <h2 class="leaderboard-title">
                    {{ activeTab === "world" ? "WORLD LEADERBOARD" : "DIVISION LEADERBOARD" }}
                </h2>
                <span class="leaderboard-label">LEADERBOARD</span>
            </div>
        </IonHeader>

        <IonContent>
            <IonList>
                <IonItem v-for="user in leaderboards[activeTab]" :key="user.rank">
                    <div class="leaderboard-item">
                        <span class="rank">{{ user.rank }}</span>
                        <div class="avatar">
                            <img src="../../../assets/images/gs_logo.png" :alt="user.name" />
                        </div>
                        <span class="name">{{ user.name }}</span>
                        <div class="points">
                            {{ user.points }}
                            <img src="../../../assets/icons/Points.svg" alt="Points" />
                        </div>
                        <div class="badges">
                            <img v-for="badge in user.badges" :key="badge" :src="'/assets/badges/' + badge" />
                        </div>
                    </div>
                </IonItem>
            </IonList>
        </IonContent>
    </IonPage>
</template>

<style scoped>
.custom-tabs {
    display: flex;
    width: 100%;
    position: relative;
    background: black;
}

.custom-tabs button {
    width: 50%;
    background: none;
    border: none;
    padding: 15px;
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.3s;
}

.custom-tabs button img {
    width: 30px;
    height: 30px;
}

.custom-tabs .active {
    opacity: 1;
    filter: brightness(0) saturate(100%) invert(83%) sepia(99%) saturate(354%) hue-rotate(357deg) brightness(102%)
        contrast(103%);
}

.tab-slider {
    position: absolute;
    bottom: 0;
    width: 50%;
    height: 3px;
    background: #e8e20a;
    transition: left 0.3s ease-in-out;
}

.menu-button {
    margin: 20px;
    border: 0;
    padding: 0;
    background: transparent;
}

.leaderboard-container {
    padding: 20px;
    background: black;
    color: white;
}

.leaderboard-title {
    text-align: center;
    font-size: 15px;
    font-weight: 900;
}

.leaderboard-label {
    display: block;
    text-align: center;
    color: #a4a4a4;
    font-weight: 900;
    width: 180px;
    margin: 10px auto;
    font-size: 14px;
}

.leaderboard-item {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    width: 100%;
}

.rank {
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
}

.avatar {
    width: 40px;
    height: 40px;
    color: black;
    font-weight: bold;
    font-size: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    border-radius: 50%;
    border: 2px solid white !important;
    object-fit: contain;
}

.avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.name {
    flex-grow: 1;
    font-size: 16px;
    font-weight: bold;
}

.points {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: yellow;
}

.points img {
    width: 20px;
    height: 20px;
    margin-left: 5px;
}

.badges img {
    width: 25px;
    height: 25px;
    margin-left: 5px;
}
</style>
