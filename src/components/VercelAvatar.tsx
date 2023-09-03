export function VercelAvatar({
  id,
  size = 40,
}: {
  id: string;
  size: number | string;
}) {
  if (!id) return null;
  return (
    <img
      className="rounded-full"
      width={size}
      height={size}
      src={`https://vercel.com/api/www/avatar/${id}`}
      alt=""
    />
  );
}
