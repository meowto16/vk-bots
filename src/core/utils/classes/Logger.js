import chalk from 'chalk'

class Logger {
  static reply(message) {
    console.log(chalk.magentaBright('[REPLY]: ') + chalk.magenta(message))
  }

  static info(message) {
    console.log(chalk.blueBright('[INFO]: ') + chalk.blue(message))
  }

  static success(message) {
    console.log(chalk.greenBright('[SUCCESS]: ') + chalk.green(message))
  }

  static error(message, err) {
    console.error(chalk.redBright('[ERROR]: ') + chalk.red(message))

    if (err) {
      console.error(err)
    }
  }

  static debug(debugInfo) {
    console.log(chalk.bgBlue(chalk.whiteBright('\n=== DEBUG ===')))
    console.dir(debugInfo, { depth: 10 })
    console.log(chalk.bgBlue(chalk.whiteBright('=== DEBUG END ===\n')))
  }
}

export default Logger