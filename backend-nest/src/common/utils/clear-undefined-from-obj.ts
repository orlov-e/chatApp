export default function clearUndefinedFromObject(obj: object) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => typeof v !== 'undefined'),
  );
}
