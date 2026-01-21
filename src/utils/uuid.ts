// Generates a short pseudo-random alphanumeric ID for client-side usage
export const generateId = (): string =>
    Math.random().toString(36).substring(2, 9);