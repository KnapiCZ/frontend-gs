<script setup>
    import ProfileFollowing from './ProfileFollowing.vue'

    let props = defineProps({
        renderedUserId: Number,
        description: String,
        email: String,
    })

</script>

<template>
    <div class="profile_info">
        <p>{{ props.description }}
            <br>{{ props.email }}</p> <!--API user bio-->
        <ProfileFollowing :rendered-user-id="props.renderedUserId"/>
    </div>
</template>

<style scoped>

.profile_info{
    color: white;
    width: auto;
    text-align: left;
    margin-top: 50px;
    margin-left: calc(25% /2);
    margin-bottom: 0;
    display: grid;
    grid-template-columns: 60% 40%;
    font-size: 12px;
}

</style>
