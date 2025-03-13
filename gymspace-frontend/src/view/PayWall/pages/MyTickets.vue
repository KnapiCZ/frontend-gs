<template>
    <div class="tickets-page">
        <h1>Moje lístky</h1>
        <div v-if="tickets.length > 0" class="tickets-list">
            <div v-for="ticket in tickets" :key="ticket.id" class="ticket-card">
                <h2>{{ ticket.title }}</h2>
                <p><strong>Kategorie:</strong> {{ ticket.category }}</p>
                <p><strong>Částka:</strong> {{ ticket.amount }} Kč</p>
                <p><strong>Datum:</strong> {{ formatDate(ticket.date) }}</p>
                <button @click="viewTicket(ticket.id)" class="btn btn-primary">Zobrazit</button>
            </div>
        </div>
        <div v-else>
            <p>Nemáte žádné lístky.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

// Mock data pro lístky
interface Ticket {
    id: number
    title: string
    category: string
    amount: number
    date: string // ISO datum
}

const tickets = ref<Ticket[]>([
    {
        id: 1,
        title: "Lístek na Členství",
        category: "Členství",
        amount: 500,
        date: "2025-01-01T10:00:00Z",
    },
    {
        id: 2,
        title: "VIP Akce",
        category: "VIP balíček",
        amount: 2000,
        date: "2025-01-05T14:00:00Z",
    },
])

// Formátování data
const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString("cs-CZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

// Zobrazení detailů lístku
const viewTicket = (ticketId: number) => {
    const ticket = tickets.value.find((t) => t.id === ticketId)
    if (ticket) {
        alert(`Zobrazuji detaily lístku:\n\n${ticket.title}\nČástka: ${ticket.amount} Kč`)
    } else {
        alert("Lístek nebyl nalezen.")
    }
}
</script>

<style scoped>
.tickets-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
}

.tickets-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.ticket-card {
    flex: 1 1 calc(50% - 1rem);
    background: #f9f9f9;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.ticket-card h2 {
    margin-top: 0;
}

.btn {
    margin-top: 1rem;
    display: inline-block;
    background-color: #007bff;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn:hover {
    background-color: #0056b3;
}
</style>
