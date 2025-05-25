import React, { useState, useEffect } from 'react';
import { subscribe, unsubscribe } from './resources/API';

export function Effects(props: { sourceId: string }) {
    const [message, setMessage] = useState<string | null>(null);
    const [name, setName] = useState<string>('');

    useEffect(() => {
        setName(props.sourceId);
        setMessage(null);
    }, [props.sourceId]);

    useEffect(() => {
        const handleMessage = (newMessage: string) => {
            setMessage(newMessage);
        };

        subscribe(props.sourceId, handleMessage);

        return () => {
            unsubscribe(props.sourceId, handleMessage);
        };
    }, [props.sourceId]);

    return (
        <div>
            {name}: {message ?? '-1'}
        </div>
    );
}
