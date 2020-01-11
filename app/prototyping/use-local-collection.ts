import { useState } from "react";

interface MockDoc {
    id: string;
}

export function useLocalCollection<T>(documentType: string) {
    const getItems = () => {
        return (JSON.parse(localStorage.getItem(documentType)) || []) as (T & MockDoc)[];
    }

    const [ collection, setCollection ] = useState(getItems());

    const setItems = (items: T[]) => {
        localStorage.setItem(documentType, JSON.stringify(items));
        setCollection(getItems());
    }

    return {
        async add(doc: T) {
            const docs = getItems();
            const idDoc = doc as T & MockDoc;
            idDoc.id = Math.random().toString(36).substr(2);
            docs.push(idDoc);
            setItems(docs);
        },
        async update(doc: T & MockDoc) {
            this.delete(doc);
            this.add(doc);
        },
        async remove(doc: T & MockDoc) {
            const docs = getItems();
            
            setItems(docs.filter(d => d.id !== doc.id));
        },
        async getById(id: string) {
            const docs = getItems();
            
            return docs.filter(d => d.id === id)[0];
        },
        collection
    }
}
