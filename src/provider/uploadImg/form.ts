// export interface RegistrationFormData {
//     name: string;
//     description: string;
//     images: string[];
//     }

export interface UploadResponse {
    url: string;
    name: string;
    }

export interface ImageFile {
    file: File;
    preview: string;
    }