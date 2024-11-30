import { UploadResponse } from "./form";
import { API } from '../api/api';

// export async function uploadImage(file: File): Promise<UploadResponse> {
//     const formData = new FormData();
//     formData.append('files', file);

//     const response = await fetch(`${API}/images/upload-multiple`, {
//       method: 'POST',
//       body: formData,
//     });
  
//     if (!response.ok) {
//       throw new Error('Failed to upload image');
//     }
  
//     return response.json();
//   }

  export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('files', file); // Este nombre debe coincidir con 'files' del `FilesInterceptor`
  
    const response = await fetch(`${API}/images/upload-multiple`, {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al subir la imagen');
    }
    
    const { data } = await response.json();
    console.log(data)
    return data;
  }
  