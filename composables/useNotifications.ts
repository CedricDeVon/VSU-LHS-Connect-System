import { caseConference } from "~/data/caseconference";
import { incidentReport } from "~/data/incident";
import { computed, ref } from "vue";

export const useNotifications = () => {
  const unreadCount = ref(0);

  const getUpcomingConferences = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return caseConference.filter((conf) => {
      const confDate = new Date(conf.conferenceDate);
      confDate.setHours(0, 0, 0, 0);

      // Get conferences scheduled for today or in the future
      return confDate >= today && conf.status === "Pending";
    });
  };

  const getUnresolvedIncidents = () => {
    return incidentReport
      .filter((inc) => inc.status !== "Resolved")
      .map((inc) => inc.incidentDocID);
  };

  const notifications = computed(() => {
    const conferences = getUpcomingConferences();
    const unresolvedIds = getUnresolvedIncidents();

    // Only include conferences for unresolved incidents
    return conferences.filter((conf) => unresolvedIds.includes(conf.incidentID));
  });

  return {
    unreadCount,
    notifications,
    getUnresolvedIncidents,
  };
};
