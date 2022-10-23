import Dexie from 'dexie'
import { FetchListOfLogsQuery, Log, LogSettings } from '../types'

const logSettingsId = 1

type LogTable = Dexie.Table<Log & { id?: number }, number>
type LogCollection = ReturnType<LogTable['toCollection']>
class LogDB extends Dexie {
  logs!: LogTable
  logSettings!: Dexie.Table<LogSettings & { id: number }, number>
  constructor () {
    super('HoarderStore-db')
    this.version(1).stores({
      logs: '++id, event, source, timestamp',
      logSettings: 'id'
    })
  }
}

type Builder = (logs: LogCollection, query: FetchListOfLogsQuery) => LogCollection
const queryBuilder = (logs: LogTable, query: FetchListOfLogsQuery) => {
  const getCollection = () => {
    if (query !== undefined) {
      if (query.orderBy !== undefined) {
        logs.orderBy(query.orderBy)
      }
    }
    return logs.toCollection()
  }
  const builders: Builder[] = [
    (col, query) => {
      if (query !== undefined) {
        if (query.orderDirection === 'desc') {
          return col.reverse()
        }
      }
      return col
    }
  ]
  const col = getCollection()
  return builders.reduce((col, builder) => builder(col, query), col)
}

const initialSettings: LogSettings = {
  enabled: true,
  db: {
    limitRecord: 5000,
    allowSavedOrigin: '.*'
  },
  console: {
    targets: ['log', 'info', 'warn', 'assert', 'error']
  },
  window: {
    targets: ['error']
  },
  network: {
    enabled: false
  }
}
const initRepository = () => {
  const db = new LogDB()
  let cacheSettings: LogSettings | undefined
  const getLogSettings = async (): Promise<LogSettings> => {
    const result = await db.logSettings.get(1)
    if (result == null) {
      return initialSettings
    }
    return {
      ...initialSettings,
      ...result,
      db: {
        ...initialSettings.db,
        ...result.db
      }
    }
  }

  getLogSettings()
    .then((settings) => {
      console.log('fetch log settings', settings)
      cacheSettings = settings
    })
    .catch((e) => {
      console.error('failed get log settings', e)
    })

  return {
    // log operation
    insertLog: async (ev: Log) => {
      await db.logs.add({
        ...ev
      })
      const count = await db.logs.count()
      if (cacheSettings !== undefined && count > cacheSettings.db.limitRecord) {
        const list = await db.logs.reverse().sortBy('timestamp')
        const id = list[0].id
        if (id !== undefined) {
          await db.logs.delete(id)
        }
      }
    },
    fetchLogs: async (query: FetchListOfLogsQuery) => {
      const logs = await queryBuilder(db.logs, query).toArray()
      return logs
    },
    clearLogs: async () => {
      return await db.logs.clear()
    },
    // settings
    getLogSettings,
    putLogSettings: async (settings: LogSettings) => {
      await db.logSettings.put({
        id: logSettingsId,
        ...settings
      })
      cacheSettings = settings
      return settings
    }
  }
}
const repository = initRepository()
export default repository
