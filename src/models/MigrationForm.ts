export type MigrationForm = {
    form: {
        firstName: string;
        lastName: string;
        company: string;
        email: string;
        phone?: string;
        textPayload?: string;
        storageSize: {
            id: number;
            name: string;
        };
    }
    onSuccess: () => void;
};