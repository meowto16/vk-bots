class MigrationError extends Error {
    constructor({ message, code }, error) {
        super({
            ...error,
            message,
        });
        this.code = code
    }
}

export default MigrationError