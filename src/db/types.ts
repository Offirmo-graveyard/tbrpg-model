
import * as LokiJS from 'lokijs'

type LokiDb = Loki

interface ITbrpgDb {
	static: LokiDb
	dynamic: LokiDb
}

export {
	LokiDb,
	ITbrpgDb,
}
