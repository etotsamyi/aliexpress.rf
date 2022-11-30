import path from 'path'
import getConfig from 'next/config'

console.log(path, 'path')
const serverPath = (staticFilePath: string) => {
	// console.log(path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath), "CHTO")
	return path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath)
}

export default serverPath
