export function Debug(data: any) {
  return (
    <pre className="p-2 border overflow-scroll">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
