const BASE_URL = process.env.REACT_APP_DB_URL;

export async function login(auth){
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(auth)
    }
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

