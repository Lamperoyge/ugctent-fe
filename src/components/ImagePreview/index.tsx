import { useImagePreview } from 'hooks';


export default function ImagePreview({ file, className }) {
  const { preview } = useImagePreview(file);
  console.log(file, 'file')
  if (!preview) return null;
  if(file.type.includes('video')) {
    return (
      <video className={className} controls autoPlay>
        <source src={preview} type={file.type}/>
        </video>
    )
  }
  if(file.type.includes('pdf')) {
    return (
      <iframe className={className} src={preview}/>
    )
  }
  return <img className={className} src={preview} />;
}
