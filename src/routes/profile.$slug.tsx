import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { RichText } from "@/components/site/RichText";
import { NotFound } from "@/components/site/NotFound";
import { profilesBySlug } from "@/data/profiles";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/profile/$slug")({
  loader: ({ params }) => {
    const profile = profilesBySlug[params.slug];
    if (!profile) throw notFound();
    return { profile };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.profile;
    if (!p) return { meta: [{ title: "Profile not found" }] };
    return {
      meta: [
        { title: p.name },
        { name: "description", content: p.role },
        { property: "og:title", content: p.name },
        { property: "og:description", content: p.role },
        { property: "og:image", content: SITE.ogImage },
        { property: "og:type", content: "profile" },
      ],
    };
  },
  notFoundComponent: () => <NotFound kind="Profile" />,
  component: ProfilePage,
});

function ProfilePage() {
  const { profile } = Route.useLoaderData();
  return (
    <PageShell bodyClass="profile-detail-page">
      <section className="profile-detail">
        <div className="profile-detail-grid">
          <img src={profile.image} alt={profile.name} />
          <div>
            <span>{profile.role}</span>
            <h1>{profile.name}</h1>
            <RichText paragraphs={profile.bio} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
