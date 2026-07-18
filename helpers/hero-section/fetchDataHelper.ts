export const fetchData = async (
  url: string,
  onSuccess: (data: any[]) => void,
  onError?: () => void
) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    onSuccess(Array.isArray(data) ? data : []);
  } catch {
    if (onError) onError();
  }
};