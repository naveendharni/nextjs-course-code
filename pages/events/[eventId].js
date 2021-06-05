import { Fragment } from "react";

import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage({ event }) {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const id = context.params.eventId;
  const data = await getEventById(id);
  return {
    props: {
      event: data,
    },
  };
}

export async function getStaticPaths() {
  const featuredEvents = await getFeaturedEvents();
  const allParams = featuredEvents.map((item) => ({
    params: { eventId: item.id },
  }));
  return {
    paths: allParams,
    fallback: "blocking",
  };
}

export default EventDetailPage;
