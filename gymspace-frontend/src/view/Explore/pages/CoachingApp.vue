<template>
    <!--
        <div class="box">
            <div class="text">
            <div class="overlap">
                <div class="BG">
                    <div class="overlap-group">
                        <div class="ellipse" />
                        <div class="div" />
                        <div class="ellipse-2" />
                        <div class="BG-2" />
                    </div>
                </div>
                <div class="reviews">
                    <div class="overlap-2">
                        <div class="card">
                            <div class="ratings">
                                <div class="text-2">
                                    <img class="star" alt="Star" src="../assets/star.svg" />
                                    <div class="text-wrapper">4.8</div>
                                </div>
                            </div>
                            <div class="profile">
                                <img class="image" alt="Image" src="../assets/image.svg" />
                                <div class="text-3">
                                    <div class="text-wrapper-2">Isabel Mercado</div>
                                    <div class="text-wrapper-3">30m ago</div>
                                </div>
                            </div>
                        </div>
                        <div class="rectangle" />
                        <div class="book-an-appointment">BOOK AN APPOINTMENT</div>
                    </div>
                    <div class="text-wrapper-4">View All</div>
                    <div class="text-wrapper-5">Reviews</div>
                </div>
                <div class="profile-2">
                    <div class="text-4">
                        <div class="text-wrapper-6">JAN FOBL</div>
                        <div class="text-wrapper-7">Professional Trainer</div>
                    </div>
                    <div class="video-call">
                        <div class="video-recorder-wrapper">
                            <img class="img" alt="Video recorder" src="../assets/video-recorder.svg" />
                        </div>
                    </div>
                    <div class="chat">
                        <div class="frame-wrapper">
                            <img class="img" alt="Frame" src="../assets/frame.svg" />
                        </div>
                    </div>
                    <div class="title">
                        <img class="line" alt="Line" src="../assets/line.svg" />
                        <div class="experience">
                            <div class="text-wrapper-8">8 Years</div>
                            <div class="text-wrapper-7">Experience</div>
                        </div>
                        <img class="line-2" alt="Line" src="../assets/line-2.svg" />
                        <img class="line-3" alt="Line" src="../assets/line-6.svg" />
                        <img class="line-4" alt="Line" src="../assets/line-5.svg" />
                        <div class="completed">
                            <div class="text-wrapper-8">46</div>
                            <div class="text-wrapper-7">Completed</div>
                        </div>
                        <div class="clients">
                            <div class="text-wrapper-8">24</div>
                            <div class="text-wrapper-7">Active Clients</div>
                        </div>
                        <img class="line-5" alt="Line" src="../assets/line-3.svg" />
                        <img class="line-6" alt="Line" src="../assets/line-4.svg" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    -->
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "Box",
})
</script>

<style>
.box {
    height: 529px;
    width: 344px;
}

.box .text {
    height: 529px;
    left: 0;
    position: fixed;
    top: 0;
    width: 344px;
}

.box .overlap {
    height: 529px;
    position: relative;
}

.box .BG {
    height: 529px;
    left: 0;
    position: absolute;
    top: 0;
    width: 344px;
}

.box .overlap-group {
    border-radius: 6px;
    height: 529px;
    position: relative;
}

.box .ellipse {
    background-color: #fff00036;
    border-radius: 33.48px / 35.22px;
    height: 70px;
    left: 155px;
    position: absolute;
    top: 256px;
    width: 67px;
}

.box .div {
    background-color: #fff00036;
    border-radius: 19px / 19.99px;
    height: 40px;
    left: 18px;
    position: absolute;
    top: 178px;
    width: 38px;
}

.box .ellipse-2 {
    background-color: #c4c4c436;
    border-radius: 19px / 19.99px;
    height: 40px;
    left: 245px;
    position: absolute;
    top: 198px;
    width: 38px;
}

.box .BG-2 {
    -webkit-backdrop-filter: blur(26.6px) brightness(100%);
    backdrop-filter: blur(26.6px) brightness(100%);
    background-color: #1a1a14cc;
    border: 1px solid;
    border-color: transparent;
    border-image: linear-gradient(
            to bottom,
            rgb(255, 255, 255) 4.06%,
            rgba(255, 255, 255, 0.46) 45.45%,
            rgba(255, 240, 0, 0.13) 100%
        )
        1;
    border-radius: 6px;
    box-shadow: -4px 4px 19.9px 1px #0000009e;
    height: 529px;
    left: 0;
    position: absolute;
    top: 0;
    width: 344px;
}

.box .reviews {
    height: 157px;
    left: 25px;
    position: absolute;
    top: 327px;
    width: 299px;
}

.box .overlap-2 {
    border-radius: 6px;
    height: 127px;
    left: 0;
    position: absolute;
    top: 31px;
    width: 293px;
}

.box .card {
    -webkit-backdrop-filter: blur(26.6px) brightness(100%);
    backdrop-filter: blur(26.6px) brightness(100%);
    background-color: #3e3d36bd;
    border-radius: 6px;
    box-shadow: -4px 4px 19.9px 1px #0000009e;
    height: 127px;
    left: 0;
    position: absolute;
    top: 0;
    width: 293px;
}

.box .ratings {
    align-items: flex-start;
    background-color: #454439;
    border-radius: 7px;
    display: inline-flex;
    flex-direction: column;
    gap: 10px;
    left: 206px;
    padding: 10px;
    position: absolute;
    top: 19px;
}

.box .text-2 {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    gap: 4px;
    justify-content: center;
    position: relative;
}

.box .star {
    height: 116.92px;
    margin-bottom: -50.96px;
    margin-left: -51.75px;
    margin-right: -27.75px;
    margin-top: -50.96px;
    position: relative;
    width: 117.51px;
}

.box .text-wrapper {
    color: #ffffff;
    font-family: "Montserrat-SemiBold", Helvetica;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: normal;
    margin-top: -1px;
    position: relative;
    width: fit-content;
}

.box .profile {
    align-items: center;
    display: inline-flex;
    gap: 12px;
    left: 10px;
    position: absolute;
    top: 12px;
}

.box .image {
    height: 50px;
    position: relative;
    width: 50px;
}

.box .text-3 {
    align-items: flex-start;
    display: inline-flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 4px;
    position: relative;
}

.box .text-wrapper-2 {
    color: #ffffff;
    font-family: "Montserrat-SemiBold", Helvetica;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: normal;
    margin-top: -1px;
    position: relative;
    width: fit-content;
}

.box .text-wrapper-3 {
    color: #9c9c9c;
    font-family: "Montserrat-Light", Helvetica;
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0;
    line-height: normal;
    position: relative;
    width: fit-content;
}

.box .rectangle {
    background-color: #fff000;
    border-radius: 5px;
    box-shadow:
        0px 0px 1.03px #ffff0080,
        0px 0px 2.07px #ffff0080,
        0px 0px 7.23px #ffff0080,
        0px 0px 14.46px #ffff0080,
        0px 0px 24.79px #ffff0080,
        0px 0px 43.38px #ffff0080;
    height: 52px;
    left: 0;
    position: absolute;
    top: 75px;
    width: 293px;
}

.box .book-an-appointment {
    color: #0e0e0e;
    font-family: "Montserrat-Black", Helvetica;
    font-size: 14px;
    font-weight: 900;
    left: 27px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    text-align: center;
    top: 93px;
    white-space: nowrap;
    width: 238px;
}

.box .text-wrapper-4 {
    color: #9c9c9c;
    font-family: "Montserrat-Regular", Helvetica;
    font-size: 12px;
    font-weight: 400;
    left: 206px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    text-align: right;
    top: 4px;
    white-space: nowrap;
    width: 70px;
}

.box .text-wrapper-5 {
    color: #ffffff;
    font-family: "Montserrat-Bold", Helvetica;
    font-size: 18px;
    font-weight: 700;
    left: 0;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 0;
    white-space: nowrap;
    width: 81px;
}

.box .profile-2 {
    height: 281px;
    left: 26px;
    position: absolute;
    top: 24px;
    width: 292px;
}

.box .text-4 {
    align-items: flex-start;
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
    left: 0;
    position: absolute;
    top: 6px;
}

.box .text-wrapper-6 {
    color: #ffffff;
    font-family: "Montserrat-Black", Helvetica;
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 0;
    line-height: normal;
    margin-top: -1px;
    position: relative;
    width: fit-content;
}

.box .text-wrapper-7 {
    color: #9c9c9c;
    font-family: var(--text-font-family);
    font-size: var(--text-font-size);
    font-style: var(--text-font-style);
    font-weight: var(--text-font-weight);
    letter-spacing: var(--text-letter-spacing);
    line-height: var(--text-line-height);
    position: relative;
    white-space: nowrap;
    width: fit-content;
}

.box .video-call {
    height: 48px;
    left: 244px;
    position: absolute;
    top: 0;
    width: 48px;
}

.box .video-recorder-wrapper {
    background-image: url(./ellipse-8.svg);
    background-size: 100% 100%;
    height: 90px;
    left: -25px;
    position: relative;
    top: -17px;
    width: 90px;
}

.box .img {
    height: 19px;
    left: 39px;
    position: absolute;
    top: 31px;
    width: 19px;
}

.box .chat {
    height: 48px;
    left: 181px;
    position: absolute;
    top: 0;
    width: 48px;
}

.box .frame-wrapper {
    background-image: url(./ellipse-9.svg);
    background-size: 100% 100%;
    height: 90px;
    left: -25px;
    position: relative;
    top: -17px;
    width: 90px;
}

.box .title {
    height: 214px;
    left: 0;
    position: absolute;
    top: 67px;
    width: 292px;
}

.box .line {
    height: 1px;
    left: 0;
    position: absolute;
    top: 77px;
    width: 292px;
}

.box .experience {
    align-items: flex-start;
    display: inline-flex;
    flex-direction: column;
    gap: 2px;
    left: 0;
    position: absolute;
    top: 24px;
}

.box .text-wrapper-8 {
    color: #ffffff;
    font-family: "Montserrat-Bold", Helvetica;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: normal;
    margin-top: -1px;
    position: relative;
    width: fit-content;
}

.box .line-2 {
    height: 52px;
    left: 197px;
    position: absolute;
    top: 13px;
    width: 1px;
}

.box .line-3 {
    height: 52px;
    left: 89px;
    position: absolute;
    top: 12px;
    width: 1px;
}

.box .line-4 {
    height: 105px;
    left: 142px;
    position: absolute;
    top: 95px;
    width: 1px;
}

.box .completed {
    align-items: flex-start;
    display: inline-flex;
    flex-direction: column;
    gap: 2px;
    left: 115px;
    position: absolute;
    top: 24px;
}

.box .clients {
    align-items: flex-start;
    display: inline-flex;
    flex-direction: column;
    gap: 2px;
    left: 219px;
    position: absolute;
    top: 24px;
}

.box .line-5 {
    height: 1px;
    left: 0;
    position: absolute;
    top: 0;
    width: 292px;
}

.box .line-6 {
    height: 1px;
    left: 0;
    position: absolute;
    top: 213px;
    width: 292px;
}
</style>
