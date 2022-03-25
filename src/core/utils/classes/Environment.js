import Configuration from "./Configuration.js";

class Environment {
    static PRODUCTION_ENVIRONMENT = 'production'
    static DEVELOP_ENVIRONMENT = 'development'

    static isDevelop = () => Configuration.nodeEnv === Environment.DEVELOP_ENVIRONMENT
    static isProduction = () => Configuration.nodeEnv === Environment.PRODUCTION_ENVIRONMENT

    /**
     * Get variable based on current environment (NODE_ENV variable)
     * @param variablesMap
     * @return {*|null}
     */
    static getVariable = (variablesMap) => {
        const variable = variablesMap[Configuration.nodeEnv]

        return (variable !== undefined) ? variable : null
    }
}

export default Environment