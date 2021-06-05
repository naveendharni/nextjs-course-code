import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";

function HomePage(props) {
  const { featuredEvents } = props;
  // console.log({ props, featuredEvents });
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const data = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: data,
    },
    revalidate: 1800,
  };
}

export default HomePage;
