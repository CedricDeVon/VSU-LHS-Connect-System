import { defineStore } from 'pinia';
import axios from 'axios';

export const useAcademicYearStore = defineStore('academicYear', {
  state: () => ({
    academicYear: null, // No default value
  }),
  actions: {
    async fetchAcademicYear() {
      try {
        const response = await axios.get('/api/academic-year');
        this.academicYear = response.data.academicYear;
      } catch (error) {
        console.error('Failed to fetch academic year:', error);
      }
    },
    async setAcademicYear(year: string) {
      try {
        const response = await axios.post('/api/academic-year', { year });
        this.academicYear = response.data.academicYear;
      } catch (error) {
        console.error('Failed to set academic year:', error);
      }
    },
  },
  getters: {
    getAcademicYear: (state) => state.academicYear,
  },
});