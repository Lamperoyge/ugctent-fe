import { useImagePreview } from 'hooks';

export default function ImagePreview({ file, className }) {
  const { preview } = useImagePreview(file);
  if (!preview) return null;
  return <img className={className} src={preview} />;
}
