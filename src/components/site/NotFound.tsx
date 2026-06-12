export function NotFound({ kind }: { kind: string }) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>{kind} not found</h1>
        <a href="/">Back home</a>
      </div>
    </div>
  );
}
