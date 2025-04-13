import { useState } from 'react';

export function useGetData() {
    const [jsonData, setJsonData] = useState(null);

    const uploadJSON = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    setJsonData(json);
                } catch (error) {
                    console.error('Ошибка при парсинге JSON:', error);
                }
            };
            reader.readAsText(file);
        }
    };

    return {
        uploadJSON,
        jsonData,
    };
}
