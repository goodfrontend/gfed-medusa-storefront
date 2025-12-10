const ErrorMessage = ({
  error,
  'data-testid': dataTestid,
}: {
  error?: string | null;
  'data-testid'?: string;
}) => {
  if (!error) {
    return null;
  }

  return (
    <div
      className="text-small-regular pt-2 text-rose-600"
      data-testid={dataTestid}
    >
      <span>{error}</span>
    </div>
  );
};

export { ErrorMessage };
