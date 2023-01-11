export const uploadPhoto = async (file) => {
  const filename = encodeURIComponent(file.name);
  const res = await fetch(`/api/upload-media?file=${filename}`);
  const { resp, newFileName } = await res.json();
  const formData = new FormData();

  const { url, fields } = resp;
  Object.entries({ ...fields, file }).forEach(([key, value]:any) => {
    formData.append(key, value);
  });

  const upload = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const src = upload.url + newFileName;
  return {src, originalFilename: file.name};
};
