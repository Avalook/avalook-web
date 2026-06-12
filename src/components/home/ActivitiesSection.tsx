import { useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { activities, ACTIVITIES_VISIBLE } from "@/data/content";

export function ActivitiesSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="section activities">
      <SectionHeading id="activities">Activities</SectionHeading>
      <div className={`activity-grid${showAll ? " show-all" : ""}`}>
        {activities.map((src, i) => (
          <img
            key={i}
            className={i >= ACTIVITIES_VISIBLE ? "extra-activity" : undefined}
            src={src}
            alt="Activity"
          />
        ))}
      </div>
      {!showAll && (
        <button className="load-more" type="button" onClick={() => setShowAll(true)}>
          Load More
        </button>
      )}
    </section>
  );
}
