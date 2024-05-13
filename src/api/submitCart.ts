import { FormData } from "../interface/FormData";

export const submitCart = async (formData: FormData) => {
    try {
        const response = await fetch('http://localhost:8080/api/update-stock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        const responseData = await response.json();
        console.log(responseData)

        return responseData;
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};
