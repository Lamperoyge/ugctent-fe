import { useImagePreview } from 'hooks';

export default function ImagePreview({ file }) {
  const { preview } = useImagePreview(file);
  console.log(preview);
  if (!preview) return null;
  return <img src={preview} />;
}
