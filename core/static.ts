import fs from 'fs'
import path from 'path'

export const getFolderList = (staticPath: string, subPath = '/') => {
  const files = fs.readdirSync(staticPath)
  const folders = [{ subPath, staticPath }]

  for (let file of files) {
    const stats = fs.statSync(path.join(staticPath, file))
    if (!stats.isDirectory()) continue
    let collectedDatas = getFolderList(
      staticPath + '/' + file,
      subPath + file + '/'
    )

    for (let collectedData of collectedDatas) folders.push(collectedData)
  }

  return folders
}

export const getFileList = (staticPath: string) => {
  const folders = getFolderList(staticPath)
  const files = [] as string[]
  for (let folder of folders) {
    const fileNames = fs.readdirSync(folder.staticPath)
    for (const fileName of fileNames) {
      const filePath = path.join(folder.staticPath, fileName)
      const stats = fs.statSync(filePath)
      if (stats.isDirectory()) continue
      files.push(filePath)
    }
  }
  return files
}

export const requireDefaults = <T = unknown>(filePaths: string[]) => {
  const result = [] as T[]
  for (const filePath of filePaths) {
    const required = require(filePath)
    if (
      typeof required !== 'undefined' &&
      typeof required['default'] !== 'undefined'
    )
      result.push(required.default)
  }
  return result
}
