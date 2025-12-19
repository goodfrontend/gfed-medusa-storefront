export const getBaseURL = () => {
  return (
    process.env.RENDER_EXTERNAL_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://localhost:8000'
  );
};
