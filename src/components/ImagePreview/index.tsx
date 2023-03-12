import { useImagePreview } from 'hooks';


export default function ImagePreview({ file, className }) {
  const { preview } = useImagePreview(file);
  console.log(preview, 'PREVIEW')
  if (!preview) return null;
  if(file.type.includes('video')) {
    return (
      <video className={className} controls autoPlay>
        <source src={preview} type={file.type}/>
        </video>
    )
  }
  return <img className={className} src={preview} />;
}
