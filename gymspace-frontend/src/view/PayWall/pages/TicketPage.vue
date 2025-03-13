<template>
    <div class="payment-form">
        <h1>Platba</h1>
        <div class="form-group">
            <label for="category">Vyberte kategorii</label>
            <select v-model="selectedCategory" @change="updateCategoryDetails" class="form-control">
                <option v-for="category in categories" :key="category.id" :value="category">
                    {{ category.name }}
                </option>
            </select>
        </div>

        <div v-if="selectedCategory" class="category-details">
            <h2>Detaily kategorie</h2>
            <p><strong>Název:</strong> {{ selectedCategory.name }}</p>
            <p><strong>Popis:</strong> {{ selectedCategory.description }}</p>
            <p><strong>Částka:</strong> {{ selectedCategory.amount }} Kč</p>
            <p><strong>Množství:</strong> {{ selectedCategory.quantity }}</p>
        </div>

        <button @click="submitPayment" class="btn btn-primary" :disabled="!selectedCategory">Zaplatit</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

// Definice typu pro kategorii
interface Category {
    id: number
    name: string
    description: string
    amount: number
    quantity: number
}

// Mock data pro kategorie
const categories = ref<Category[]>([
    {
        id: 1,
        name: "Členství",
        description: "Měsíční členství v gymu.",
        amount: 500,
        quantity: 1,
    },
    {
        id: 2,
        name: "Jednorázový vstup",
        description: "Platba za jeden vstup do gymu.",
        amount: 100,
        quantity: 1,
    },
    {
        id: 3,
        name: "VIP balíček",
        description: "VIP přístup na speciální akce.",
        amount: 2000,
        quantity: 1,
    },
])

// Vybraná kategorie
const selectedCategory = ref<Category | null>(null)

// Aktualizace detailů vybrané kategorie
const updateCategoryDetails = () => {
    console.log("Vybraná kategorie:", selectedCategory.value)
}

// Mock odeslání platby
const submitPayment = () => {
    if (!selectedCategory.value) return

    const paymentData = {
        categoryId: selectedCategory.value.id,
        amount: selectedCategory.value.amount,
    }

    console.log("Odesílám platbu:", paymentData)
    alert(`Platba byla odeslána pro kategorii: ${selectedCategory.value.name}`)
}
</script>

<style scoped>
.payment-form {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1rem;
}

.category-details {
    margin-top: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>
