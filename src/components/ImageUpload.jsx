export default async function ImageUpload(e) {
    const file = e.target.files[0];
    console.log(file);
    const data = new FormData();
    data.append("file",file)
    data.append("upload_preset","linktree")
    data.append("cloud_name",process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
    if (!file) {
      return;
    }
  const response=await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,{
    method:"POST",
    body:data
  })
    const uploadResult = await response.json()
    console.log(uploadResult , 123);
  return uploadResult.url
  }
  