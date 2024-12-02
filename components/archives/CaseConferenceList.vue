
<template>
    <div class="space-y-3">
        <div v-for="conference in caseConferences" :key="conference.caseConID" 
            class="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-medium text-gray-900">{{ conference.title || 'Case Conference' }}</h4>
                    <p class="text-sm text-gray-500">{{ formatDate(conference.dateScheduled) }}</p>
                </div>
                <span :class="getStatusBadgeClass(conference.status)"
                    class="px-2 py-1 text-xs rounded-full">
                    {{ conference.status }}
                </span>
            </div>
            <p class="mt-2 text-sm text-gray-600 line-clamp-2">
                {{ conference.minutes }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { caseConference } from '~/data/caseConference';

const props = defineProps({
    caseConferenceIds: {
        type: Array,
        required: true
    }
});

const caseConferences = computed(() => {
    return caseConference.filter(conf => 
        props.caseConferenceIds.includes(conf.caseConID)
    ).sort((a, b) => new Date(b.dateScheduled) - new Date(a.dateScheduled));
});

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
};

const getStatusBadgeClass = (status) => {
    return {
        'bg-green-100 text-green-700': status === 'Completed',
        'bg-amber-100 text-amber-700': status === 'Scheduled',
        'bg-red-100 text-red-700': status === 'Cancelled'
    };
};
</script>