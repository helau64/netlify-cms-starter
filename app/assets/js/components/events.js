const { DateTime } = require("luxon");

export default function() {
    const now = DateTime.now();
    const upcomingEvents = document.querySelectorAll('.events-list__item--upcoming');
    const previousEvents = document.querySelectorAll('.events-list__item--previous');

    upcomingEvents.forEach(function(el) {
        let eventDate = DateTime.fromMillis(Date.parse(el.dataset.date));
        if (eventDate.ts < now.ts) {
            el.remove();
        }
    });

    previousEvents.forEach(function(el) {
        let eventDate = DateTime.fromMillis(Date.parse(el.dataset.date));
        if (eventDate.ts > now.ts) {
            el.remove();
        }
    });
}