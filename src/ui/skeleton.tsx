const Skeleton = <div className="m-1 h-6 w-32 rounded bg-gray-100" />;

export function TableSkeleton({
  columns = 5,
  rows = 3,
}: {
  columns?: number;
  rows?: number;
}) {
  const columnsSkeleton = new Array(columns).fill(Skeleton);
  const rowsSkeleton = new Array(rows).fill(Skeleton);

  return (
    <table className="m-auto table-auto">
      <thead className="m-1">
        <tr>
          {columnsSkeleton.map((skeleton, i) => (
            <th key={i}>{skeleton}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowsSkeleton.map((_, i) => (
          <tr key={i}>
            {columnsSkeleton.map((skeleton, j) => (
              <td key={j}>{skeleton}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
