export const getBaseURL = () => {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    'https://localhost:8000'
  );
};
