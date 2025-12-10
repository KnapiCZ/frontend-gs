import { useRouter, useRoute } from 'vue-router';

// Router instance
const router = useRouter();
const route = useRoute();

const steps = [
    { path: '/step-1', step: 1 },
    { path: '/step-2', step: 2 },
    { path: '/step-3', step: 3 },
    { path: '/step-4', step: 4 },
    { path: '/step-5', step: 5 },
    { path: '/step-6', step: 6 },
];

const goNext = () => {
    const currentIndex = steps.findIndex((step) => step.path === route.path);
    if (currentIndex > 0) {
        router.push(steps[currentIndex + 1].path); // Navigate to the previous step
    }
};