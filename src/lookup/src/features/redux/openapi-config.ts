import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
    schemaFile: '../../services/swagger.json',
    apiFile: 'emptyApi.ts',
    apiImport: 'emptySplitApi',
    outputFile: 'webApi.ts',
    exportName: 'webApi',
    hooks: true,
}

export default config