import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="container">
      <section className="card stack" style={{ gap: 16 }}>
        <h1 style={{ margin: 0 }}>AI Learning Product Demo</h1>
        <p className="muted" style={{ margin: 0 }}>
          Practice quick AI writing quests, compare improvements, and learn prompt habits.
        </p>
        <div>
          <Link href="/demo" className="button">
            Open Demo
          </Link>
        </div>
      </section>
    </main>
  );
}
